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
} from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../Data/Data";
import {
  Add,
  AdminPanelSettings,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import ModaltoAdd from "../Shared/ModaltoAdd";
import ReactLoading from "react-loading";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

const RegEmails = ``;

function Customers() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");
  const [ShowLoading, setShowLoading] = useState(false);
  const [SnackBar, setSnackBar] = useState(false);

  const handleClick = () => {
    setSnackBar(true);
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

  const onSubmit = () => {
    console.log("done");
    setShowLoading(true);
    setphone("");
    setEmail("");
    setage("");
    setName("");
    setShowLoading(false);
    handleClose();
    handleClick();
  };

  const InputName = (eo) => {
    const inputValue = eo.target.value;
    setName(inputValue);
  };

  const InputEmail = (eo) => {
    const inputValue = eo.target.value;
    setEmail(inputValue);
  };

  const Inputphone = (eo) => {
    const inputValue = eo.target.value;
    setphone(inputValue);
  };

  const Inputage = (eo) => {
    const inputValue = eo.target.value;
    setage(inputValue);
  };

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
          rows={mockDataTeam}
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
            variant="h6"
            component="h2"
          >
            Add a new Customer for your Dashboard
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "400px",
              mt: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              onChange={(eo) => {
                InputName(eo);
              }}
              placeholder="Name"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              defaultValue={Name}
              error={Boolean(errors.FulltName)}
              {...register("FulltName", { required: true, minLength: 3 })}
              helperText={
                Boolean(errors.FulltName)
                  ? "Are you kidding me? Write Full Name please :)"
                  : null
              }
            />
            <TextField
              onChange={(eo) => {
                InputEmail(eo);
              }}
              placeholder="Email Address"
              label="Email Address"
              variant="outlined"
              defaultValue={Email}
              error={Boolean(errors.email)}
              {...register("email", { required: true, pattern: regEmail })}
              helperText={
                Boolean(errors.email) ? "Write Your actual email :)" : null
              }
            />

            <TextField
              onChange={(eo) => {
                Inputage(eo);
              }}
              placeholder="age"
              label="age"
              variant="outlined"
              defaultValue={age}
              error={Boolean(errors.age)}
              {...register("age", { required: true, maxLength: 2 })}
              helperText={Boolean(errors.age) ? "Are you this old :)" : null}
            />

            <TextField
              onChange={(eo) => {
                Inputphone(eo);
              }}
              placeholder="phone"
              label="phone"
              variant="outlined"
              defaultValue={phone}
              error={Boolean(errors.phone)}
              {...register("phone", { required: true, minLength: 2 })}
              helperText={
                Boolean(errors.phone)
                  ? "Are you forginer to write phone number like this :)"
                  : null
              }
            />

            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="user"
            >
              {SelectedAcess.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              sx={{ position: "absolute", bottom: "30px", left: "40%" }}
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

export default Customers;
