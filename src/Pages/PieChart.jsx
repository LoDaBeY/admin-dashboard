import { Helmet } from "react-helmet-async";
import Pie from "../Components/Pie";
import BreadCrumbs from "Components/BreadCrumbs";
import { Box } from "@mui/material";

function PieChart() {
  return (
    <div>
      <Helmet>
        <title>Pie Chart</title>
      </Helmet>
      <BreadCrumbs
        Title={"Pie Chart"}
        Subtitle={"Manage your Pie Chart as you want"}
      />
      <Box sx={{ mt: 2 }}>
        <Pie />
      </Box>
    </div>
  );
}

export default PieChart;
