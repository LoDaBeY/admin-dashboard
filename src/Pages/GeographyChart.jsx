import { Box } from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";
import Geography from "../Components/Geography";
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

function GeographyChart() {
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
        <Lottie options={defaultOptionsForDark} height={800} width={800} />
      </Box>
    );
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>Geography Chart</title>
        </Helmet>
        <BreadCrumbs
          Title={"Geography Chart"}
          Subtitle={"Manage your Geography Chart as you want"}
        />
        <Box sx={{ mt: 2 }}>
          <Geography />
        </Box>
      </div>
    );
  }
}

export default GeographyChart;
