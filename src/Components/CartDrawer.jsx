import Divider from "@mui/material/Divider";
import {
  Box,
  styled,
  useTheme,
  IconButton,
  Typography,
  Stack,
  Container,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import {
  AddCircleOutline,
  Close,
  RemoveCircleOutline,
} from "@mui/icons-material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function CartDrawer({ DrawerSide, DrawerSideClose }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Drawer
        sx={{
          "& .MuiPaper-root": {
            width: { xs: "100%", md: "400px" },
            bgcolor: theme.palette.mode === "dark" ? " #20232A" : "whitesmoke",
          },
          "& .MuiDrawer-docked": { transition: "all 1s ease-in-out" },
        }}
        variant="persistent"
        anchor="right"
        open={DrawerSide}
      >
        <DrawerHeader>
          <Stack
            sx={{ width: "100%", m: 2 }}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6" color="inherit">
              Shopping Cart
            </Typography>
            <IconButton
              aria-label="Close Shopping Cart"
              onClick={DrawerSideClose}
            >
              <Close />
            </IconButton>
          </Stack>
        </DrawerHeader>
        <Divider />
        <Container sx={{ my: 5, display: "flex", alignItems: "center" }}>
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            src="https://www.polilingua.com/images/pages/2362-subtitling-services.jpg"
            alt="Selected Item Title"
          />
          <Box sx={{ ml: 3 }}>
            <Stack>
              <Typography
                variant="body1"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.warning.light
                      : theme.palette.info.light,
                }}
              >
                {" "}
                First Item Title
              </Typography>
              <Typography sx={{ my: 1 }} variant="caption" color="inherit">
                Catagory Item
              </Typography>
            </Stack>
            <Stack gap={3} direction={"row"}>
              <Typography variant="body2" color="inherit">
                $Item Price
              </Typography>
              <Stack
                sx={{ border: "1px dotted", p: "3px", borderRadius: "15px" }}
                direction={"row"}
              >
                <IconButton
                  sx={{ p: 0 }}
                  aria-label="Delete"
                  onClick={() => {}}
                >
                  <RemoveCircleOutline />
                </IconButton>
                <Typography sx={{ mx: 1 }} variant="body2" color="inherit">
                  1
                </Typography>
                <IconButton
                  sx={{ p: 0 }}
                  aria-label="Delete"
                  onClick={() => {}}
                >
                  <AddCircleOutline />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Container>
        <Divider />
      </Drawer>
    </Box>
  );
}

export default CartDrawer;
