import { Box } from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import React from "react";
import { Helmet } from "react-helmet-async";
import Line from "../Components/Line";

function LineBar() {
  return (
    <div>
      <Helmet>
        <title>LineBar</title>
      </Helmet>
      <BreadCrumbs
        Title={"LineBar"}
        Subtitle={"Submit your Line as you want to sent it to the Manager"}
      />

<Box sx={{mt: 2}}>
        <Line />
      </Box>
    </div>
  );
}

export default LineBar;
