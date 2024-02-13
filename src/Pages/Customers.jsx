import {
  Box,
  Stack,
  Typography,
  useTheme,
  Button,
  TextField,
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

function Customers() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");
  const [access, setaccess] = useState("");
  const [ShowLoading, setShowLoading] = useState(false);

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
    console.log(inputValue);
  };

  const Inputaccess = (eo) => {
    const inputValue = eo.target.value;
    setaccess(inputValue);
  };

  const Inputage = (eo) => {
    const inputValue = eo.target.value;
    setage(inputValue);
  };

  const SubmitTaskBtn = (eo) => {
    eo.preventDefault();
    setShowLoading(true);
    handleClose();
    setaccess("");
    setphone("");
    setEmail("");
    setage("");
    setName("");
    setShowLoading(false);
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
          >
            <TextField
              onChange={(eo) => {
                InputName(eo);
              }}
              placeholder="Name"
              required
              id="outlined-basic"
              label="Name"
              variant="outlined"
              defaultValue={Name}
            />
            <TextField
              onChange={(eo) => {
                InputEmail(eo);
              }}
              placeholder="Email Address"
              required
              label="Email Address"
              variant="outlined"
              defaultValue={Email}
            />

            <TextField
              onChange={(eo) => {
                Inputage(eo);
              }}
              placeholder="age"
              required
              label="age"
              variant="outlined"
              defaultValue={age}
            />

            <TextField
              onChange={(eo) => {
                Inputphone(eo);
              }}
              placeholder="phone"
              required
              label="phone"
              variant="outlined"
              defaultValue={phone}
            />

            <TextField
              onChange={(eo) => {
                Inputaccess(eo);
              }}
              placeholder="access"
              required
              label="access"
              variant="outlined"
              defaultValue={access}
            />

            <Button
              sx={{ position: "absolute", bottom: "30px", left: "40%" }}
              onClick={(eo) => {
                SubmitTaskBtn(eo);
              }}
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
    </div>
  );
}

export default Customers;
