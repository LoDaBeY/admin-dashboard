import { Box, Stack, Typography, useTheme, Button } from "@mui/material";
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

  return (
    <div>
      <Helmet>
        <title>Customers</title>
      </Helmet>

      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
      <BreadCrumbs
        Title={"Customers"}
        Subtitle={"Manage your Customers as you want"}
      />
      <Button
        variant="contained"
        color="success"
        endIcon={<Add/>}
        sx={{textTransform: "capitalize",  }}
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
    </div>
  );
}

export default Customers;
