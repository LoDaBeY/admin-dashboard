import { Box, Paper, Stack } from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";
import DashboardPapers from "Components/DashboardPapers";
import { Light, Message, Phone, SignLanguageSharp } from "@mui/icons-material";
import {
  DahsboardCard1,
  DahsboardCard2,
  DahsboardCard3,
  DahsboardCard4,
} from "../Data/Data";
import Line from "../Components/Line";
import Bar from "../Components/Bar";
import Geography from "../Components/Geography";
import Pie from "../Components/Pie";

function Dashboard() {
  return (
    <Box>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <BreadCrumbs Title={"Dashboard"} Subtitle={"Welcome to your dashboard"} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mt: 3,
          flexWrap: "wrap",
        }}
      >
        <DashboardPapers
          Icon={<Message />}
          Numberoftest={"Email Sent"}
          NumberofSales={453.45}
          Yuzdeuz={15}
          data={DahsboardCard1}
          scheme={"purple_orange"}
        />
        <DashboardPapers
          Icon={<Phone />}
          Numberoftest={"Phone dialed"}
          NumberofSales={48.15}
          Yuzdeuz={36}
          data={DahsboardCard2}
          scheme={"set1"}
        />
        <DashboardPapers
          Icon={<SignLanguageSharp />}
          Numberoftest={"Face to Face"}
          NumberofSales={15.755}
          Yuzdeuz={20}
          data={DahsboardCard3}
          scheme={"dark2"}
        />
        <DashboardPapers
          Icon={<Light />}
          Numberoftest={"Went to Customers"}
          NumberofSales={12.5745}
          Yuzdeuz={40}
          data={DahsboardCard4}
          scheme={"paired"}
        />
      </Box>

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={3}
        sx={{
          width: "100%",
          mt: 3,
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Paper sx={{ maxWidth: 700, flexGrow: 1, borderRadius: "15px" }}>
          <Line LineHeigh={true} />
        </Paper>

        <Paper sx={{ maxWidth: 600, flexGrow: 1, borderRadius: "15px" }}>
          <Bar BarHeigh={true} />
        </Paper>
      </Stack>

      <Stack
        direction={"row"}
        gap={3}
        sx={{
          width: "100%",
          mt: 3,
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
        }}
        flexWrap={"wrap"}
      >
        <Paper sx={{ maxWidth: 700, flexGrow: 1, borderRadius: "15px" }}>
          <Geography GeographyBar={true} />
        </Paper>

        <Paper sx={{ maxWidth: 600, flexGrow: 1, borderRadius: "15px" }}>
          <Pie PieHeigh={true} />
        </Paper>
      </Stack>
    </Box>
  );
}

export default Dashboard;
