import { Box, useTheme } from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";

function Dashboard() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#f2f2f2",
      }}
    >
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <BreadCrumbs Title={"Dashboard"} Subtitle={"Welcome to your dashboard"} />
    </Box>
  );
}

export default Dashboard;
