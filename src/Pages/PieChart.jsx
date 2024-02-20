import { Helmet } from "react-helmet-async";
import Pie from "../Components/Pie";
import BreadCrumbs from "Components/BreadCrumbs";
import { Box } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PieChart() {

  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/Login");
    }
  });
if (user) {
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
}

export default PieChart;
