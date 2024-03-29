import { Box, Stack, useTheme, Button } from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataInvoices } from "../Data/Data";
import { Approval } from "@mui/icons-material";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
    width: 180,
    editable: true,
    cellClassName: "EmailColumn",
  },
  {
    field: "cost",
    headerName: "Cost",
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
    width: 130,
    editable: false,
    headerAlign: "center",
    align: "center",
    cellClassName: "PhoneColumn",
  },
  {
    field: "date",
    headerName: "Date",
    type: "number",
    width: 100,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "access",
    headerName: "Button",
    width: 200,
    editable: false,
    headerAlign: "center",
    align: "center",
    renderCell: ({ row: { access } }) => {
      return (
        <Stack
          width={"60%"}
          m={"0 auto"}
          p={"2px"}
          justifyContent={"center"}
          bgcolor={access === "Approve" ? "#336600" : "#e60000"}
          borderRadius={"5px"}
          textAlign={"center"}
          direction={"row"}
        >
          <Button onClick={() => {
            
          }} sx={{ color: "ivory", width: "100%" }} variant="text">
            {access === "Approve" && (
              <Approval color="inherit" sx={{ mr: 1 }} />
            )}
            {access}
          </Button>
        </Stack>
      );
    },
  },
  {
    field: "Decline",
    headerName: "Button",
    width: 200,
    editable: false,
    headerAlign: "center",
    align: "center",
    renderCell: ({ row: { Decline } }) => {
      return (
        <Stack
          width={"60%"}
          m={"0 auto"}
          p={"2px"}
          justifyContent={"center"}
          bgcolor={Decline === "Approve" ? "#4d0099" : "#800000"}
          borderRadius={"5px"}
          textAlign={"center"}
          direction={"row"}
        >
          <Button sx={{ color: "ivory", width: "100%" }} variant="text">
            {Decline === "Decline" && (
              <ThumbDownAltIcon color="inherit" sx={{ mr: 1 }} />
            )}
            {Decline}
          </Button>
        </Stack>
      );
    },
  },
];

function Invoices() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/Login");
    }
  });
  const theme = useTheme();

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
      <Box>
        <Helmet>
          <title>Invoices</title>
        </Helmet>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <BreadCrumbs
            Title={"Invoices"}
            Subtitle={"HR System for managing list of invoices"}
          />
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
              color: theme.palette.info.main,
            },
            "& .EmailColumn": {
              color: theme.palette.warning.main,
            },
            "& .PhoneColumn": {
              color: theme.palette.secondary.main,
            },

            mt: 3,
          }}
        >
          <DataGrid
            rows={mockDataInvoices}
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
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    );
  }
}

export default Invoices;
