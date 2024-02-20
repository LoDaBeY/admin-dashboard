import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Translator } from "../Data/Data";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";
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

function Projects() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/Login");
    }
  });
  const theme = useTheme();
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
          <title>Projects</title>
        </Helmet>
        <BreadCrumbs
          Title={"Projects"}
          Subtitle={"Manage your Projects as you want"}
        />

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {Translator.map((item) => {
            return (
              <Card
                sx={{
                  maxWidth: 345,
                  minWidth: 250,
                  borderRadius: "10%",
                  borderTopRightRadius: "30%",
                  m: 2,
                  minHeight: 500,
                }}
                key={item.title}
              >
                <CardActionArea
                  sx={{}}
                  onClick={() => {
                    navigate(`${item.title}`);
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.extendsImages[0]}
                    alt={item.title}
                  />
                  <CardHeader
                    sx={{
                      color: theme.palette.mode === "dark" ? "white" : "dark",
                    }}
                    title={item.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      </div>
    );
  }
}

export default Projects;
