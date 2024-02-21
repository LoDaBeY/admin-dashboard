import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";

import Bar from "../Components/Bar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "react-lottie";
import animationDataDark from "../Assests/LoadingDark.json";
import { Box } from "@mui/material";

const defaultOptionsForDark = {
  loop: true,
  autoplay: true,
  animationData: animationDataDark,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function BarChart() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/Login");
    }
  });

  if (loading ) {
    return (
      <Box>
        <Lottie options={defaultOptionsForDark} height={"100%"} width={"100%"} />
      </Box>
    );
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>Bar Chart</title>
        </Helmet>
        <BreadCrumbs
          Title={"Bar Chart"}
          Subtitle={"Manage your Bar Chart as you want"}
        />

        <Bar />
      </div>
    );
  }
}

export default BarChart;
