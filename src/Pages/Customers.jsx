import {
  Box,
  Stack,
  Typography,
  useTheme,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";
import { DataGrid } from "@mui/x-data-grid";
import {
  Add,
  AdminPanelSettings,
  Close,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import ModaltoAdd from "../Shared/ModaltoAdd";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationDataDark from "../Assests/LoadingDark.json";

const defaultOptionsForDark = {
  loop: true,
  autoplay: true,
  animationData: animationDataDark,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const regEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
    cellClassName: "NameColumn",
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    editable: true,
    cellClassName: "EmailColumn",
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 160,
    editable: false,
    headerAlign: "center",
    align: "center",
    cellClassName: "PhoneColumn",
  },
  {
    field: "access",
    headerName: "Access",
    type: "number",
    editable: false,
    width: 300,
    headerAlign: "center",
    align: "center",
    renderCell: ({ row: { access } }) => {
      return (
        <Stack
          width={"60%"}
          m={"0 auto"}
          p={"2px"}
          justifyContent={"center"}
          bgcolor={
            access === "admin"
              ? "#4d0099"
              : access === "manager"
              ? "#cc0066"
              : "#267326"
          }
          borderRadius={"5px"}
          textAlign={"center"}
          direction={"row"}
        >
          <Button sx={{ color: "ivory", width: "100%" }} variant="text">
            {access === "admin" && (
              <AdminPanelSettings
                color="action"
                sx={{ mr: 1, color: "ivory" }}
              />
            )}
            {access === "manager" && (
              <SecurityOutlined sx={{ mr: 1, color: "ivory" }} />
            )}
            {access === "user" && (
              <LockOpenOutlined sx={{ mr: 1, color: "ivory" }} color="action" />
            )}
            {access}
          </Button>

          <Typography variant="body1"></Typography>
        </Stack>
      );
    },
  },
];

const SelectedAcess = [
  {
    value: "manager",
    label: "manager",
  },
  {
    value: "user",
    label: "user",
  },
  {
    value: "admin",
    label: "admin",
  },
];

function Customers() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ShowLoading, setShowLoading] = useState(false);
  const [SnackBar, setSnackBar] = useState(false);
  const [email, setemail] = useState("");
  const [FulltName, setFulltName] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");
  const [access, setaccess] = useState("");
  const [DataTeam, setDataTeam] = useState([]);
  const [DataTeamFromLocaStorge, setDataTeamFromLocaStorge] = useState([]);
  useEffect(() => {
    if (!user && !loading) {
      navigate("/Login");
    }
  }, [loading, navigate, user]);

  useEffect(() => {
    if (localStorage.NewCustomer !== null) {
      setDataTeamFromLocaStorge(
        JSON.parse(localStorage.getItem("NewCustomer"))
      );
    } else {
      setDataTeamFromLocaStorge([]);
    }
  }, []);

  useEffect(() => {
    if (DataTeamFromLocaStorge && DataTeamFromLocaStorge.length > 0) {
      setDataTeam(DataTeamFromLocaStorge);
    }
  }, [DataTeamFromLocaStorge]);

  useEffect(() => {
    if (DataTeam.length > 0) {
      localStorage.setItem("NewCustomer", JSON.stringify(DataTeam));
    }
  }, [DataTeam]);

  const handleClick = () => {
    setSnackBar(true);
  };

  const EmailValue = (eo) => {
    let EmailValueInput = eo.target.value;
    setemail(EmailValueInput);
  };

  const FulltNameValue = (eo) => {
    let FulltNameValueInput = eo.target.value;
    setFulltName(FulltNameValueInput);
  };

  const ageValue = (eo) => {
    let ageValueInput = eo.target.value;
    setage(ageValueInput);
  };

  const phoneValue = (eo) => {
    let phoneValueInput = eo.target.value;
    setphone(phoneValueInput);
  };

  const accessValue = (eo) => {
    let accessValueInput = eo.target.value;
    setaccess(accessValueInput);
  };

  const SnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let NewCustomer = {
      id: DataTeam.length + 1,
      name: data.FulltName,
      email: data.email,
      age: data.age,
      phone: data.phone,
      access: data.access,
    };
    setDataTeam([...DataTeam, NewCustomer]);
    setShowLoading(true);
    handleClose();
    setaccess("");
    setphone("");
    setage("");
    setFulltName("");
    setemail("");
    handleClick();
    setShowLoading(false);
  };

  if (loading) {
    return (
      <Box>
        <Lottie
          options={defaultOptionsForDark}
          height={"100%"}
          width={"100%"}
        />
      </Box>
    );
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>Customers</title>
        </Helmet>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <BreadCrumbs
            Title={"Customers"}
            Subtitle={"Manage your Customers as you want"}
          />
          <Button
            variant="contained"
            color="success"
            endIcon={<Add />}
            sx={{ textTransform: "capitalize" }}
            onClick={handleOpen}
          >
            Add
          </Button>
        </Stack>
        <Box
          sx={{
            height: "75vh",
            width: "100%",
            "& .MuiDataGrid-columnHeaders": {
              bgcolor:
                // @ts-ignore
                theme.palette.BGColor.main,
              borderBottom: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              // @ts-ignore
              bgcolor: theme.palette.BGColor.main,
            },
            "& .NameColumn": {
              color: theme.palette.primary.main,
            },
            "& .EmailColumn": {
              color: theme.palette.error.main,
            },
            "& .PhoneColumn": {
              color: theme.palette.success.main,
            },
            mt: 2,
          }}
        >
          <DataGrid
            rows={DataTeam}
            // @ts-ignore
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            disableRowSelectionOnClick
          />
        </Box>

        {open && (
          <ModaltoAdd handleClose={handleClose} open={open}>
            <Typography
              id="modal-modal-title"
              textAlign={"center"}
              variant="body1"
            >
              Add a new Customer for your Dashboard
            </Typography>

            <IconButton
              sx={{ position: "absolute", top: "8px", right: "8px" }}
              aria-label="Close the Form"
              onClick={handleClose}
            >
              <Close />
            </IconButton>

            <Box
              sx={{
                width: "100%",
                height: "auto",
                mt: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                position: "relative",
              }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                placeholder="Name"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                error={Boolean(errors.FulltName)}
                {...register("FulltName", { required: true, minLength: 3 })}
                helperText={
                  Boolean(errors.FulltName)
                    ? "Are you kidding me? Write Full Name please :)"
                    : null
                }
                defaultValue={FulltName}
                onChange={FulltNameValue}
              />
              <TextField
                placeholder="Email Address"
                label="Email Address"
                variant="outlined"
                error={Boolean(errors.email)}
                {...register("email", { required: true, pattern: regEmail })}
                helperText={
                  Boolean(errors.email) ? "Write Your actual email :)" : null
                }
                onChange={EmailValue}
                defaultValue={email}
              />

              <TextField
                placeholder="age"
                label="age"
                variant="outlined"
                error={Boolean(errors.age)}
                {...register("age", { required: true, maxLength: 2 })}
                helperText={Boolean(errors.age) ? "Are you this old :)" : null}
                onChange={ageValue}
                defaultValue={age}
              />

              <TextField
                placeholder="phone"
                label="phone"
                variant="outlined"
                error={Boolean(errors.phone)}
                {...register("phone", { required: true, minLength: 2 })}
                helperText={
                  Boolean(errors.phone)
                    ? "Are you forginer to write phone number like this :)"
                    : null
                }
                onChange={phoneValue}
                defaultValue={phone}
              />

              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                {...register("access", { required: true })}
                onClick={accessValue}
                defaultValue={access}
              >
                {SelectedAcess.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{ width: "95px", alignContent: "center" }}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  {ShowLoading ? (
                    <ReactLoading
                      type={"spinningBubbles"}
                      color={"Blue"}
                      height={20}
                      width={20}
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            </Box>
          </ModaltoAdd>
        )}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={SnackBar}
          autoHideDuration={3000}
          onClose={SnackBarClose}
        >
          <Alert
            onClose={SnackBarClose}
            variant="filled"
            sx={{
              width: "100%",
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.warning.light
                  : theme.palette.info.light,
            }}
          >
            Congratulations! A new Customer has been added!{" "}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default Customers;
