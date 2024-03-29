import { Box } from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Line from "../Components/Line";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";
import { useNavigate } from "react-router-dom";
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

function LineBar() {
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
          <title>LineBar</title>
        </Helmet>
        <BreadCrumbs
          Title={"LineBar"}
          Subtitle={"Submit your Line as you want to sent it to the Manager"}
        />

        <Box sx={{ mt: 2 }}>
          <Line />
        </Box>
      </div>
    );
  }
}

export default LineBar;
