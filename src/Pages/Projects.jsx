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

function Projects() {
  const navigate = useNavigate();
  const theme = useTheme();

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
              key={item.image}
            >
              <CardActionArea
                sx={{            }}
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

export default Projects;
