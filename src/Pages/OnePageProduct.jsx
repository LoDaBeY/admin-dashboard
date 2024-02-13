import {
  Box,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { ShoppingCart } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { Translator } from "../Data/Data";

function OnePageProduct() {
  const [Quantity, setQuantity] = useState("");
  const [Revision, setRevision] = useState("");
  const theme = useTheme();
  let { userId } = useParams();

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleRevision = (event) => {
    setRevision(event.target.value);
  };

  const matchedObject = Translator.find((item) => item.title === userId);

  return (
    <Box>
      <Helmet>
        <title>Projects Cart</title>
        <link
          rel="shortcut icon"
          href="../../public/KGLogo.png"
          type="image/x-icon"
        />
      </Helmet>
      <BreadCrumbs
        Title={"Projects Cart"}
        Subtitle={"Add to your cart the services you want to have"}
      />

      <Box>
        <Paper
          elevation={3}
          sx={{ height: { sm: "100vh", md: "500px" }, my: 2 }}
        >
          <Stack
            alignItems={"center"}
            sx={{
              flexDirection: {
                sm: "column",
                md: "row",
                justifyContent: { sm: "center", md: "space-around" },
              },
            }}
          >
            {matchedObject && (
              <Box sx={{ m: 2, width: { sm: "550px", md: "1100px" } }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "15px",
                  }}
                  src={matchedObject.image}
                  alt=""
                />
              </Box>
            )}
            {matchedObject && (
              <Box sx={{ mr: { sm: 0, md: 3 }, width: "100%" }}>
                <Box
                  sx={{
                    my: 2,
                    display: "flex",
                    justifyContent: { sm: "center", md: "flex-start" },
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label={matchedObject.catagory}
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.warning.light
                          : theme.palette.info.light,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.mode === "dark" ? "white" : "dark",
                      ml: 2,
                    }}
                  >
                    {matchedObject.title}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { sm: "center", md: "inherit" } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === "dark" ? "white" : "dark",
                      my: 2,
                    }}
                  >
                    {matchedObject.description}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.mode === "dark" ? "white" : "dark",
                      mb: 3,
                    }}
                  >
                    $546.00
                  </Typography>
                </Box>

                <Divider />
                <Stack
                  sx={{
                    display: "flex",
                    width: "100%",
                    my: 3,
                    flexDirection: { sm: "column", md: "row" },
                  }}
                  gap={4}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Quantity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Quantity}
                      label="Quantity"
                      onChange={handleQuantity}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={3}>4</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Revision
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Revision}
                      label="Revision"
                      onChange={handleRevision}
                    >
                      <MenuItem value={"Yes"}>Yes</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Divider />

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    endIcon={<ShoppingCart />}
                    sx={{
                      my: 5,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? theme.palette.warning.light
                          : theme.palette.info.light,
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? theme.palette.warning.dark
                            : theme.palette.info.dark,
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

export default OnePageProduct;
