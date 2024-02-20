import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import {
  DarkModeOutlined,
  LightModeOutlined,
  ShoppingBagRounded,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, Tooltip, useMediaQuery } from "@mui/material";
import Drawer from "./Drawer";
import CartDrawer from "./CartDrawer";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";

const drawerWidth = 240;

const settings = [
  {
    Name: "Profile",
    link: "Profile",
    VisitProfile: true,
  },
  { Name: "Logout", link: "Login", LogOut: true },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function AppBarr({ setMode }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [DrawerSide, setDrawerSide] = useState(false);
  const DrawerSideOpenn = () => {
    setDrawerSide(true);
  };

  const DrawerSideClose = () => {
    setDrawerSide(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const IsScreenLarge = useMediaQuery("(min-width:500px)");

  const SignOutBtn = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const AvatarSettingsAction = (item) => {
    if (item.VisitProfile === true) {
      setAnchorElUser(null);
      navigate(item.link);
    } else if (item.LogOut) {
      SignOutBtn();
      setAnchorElUser(null);
      navigate(item.link);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* The AppBar */}

      <AppBar
        position="fixed"
        // @ts-ignore
        open={open}
        // @ts-ignore
        sx={{ backgroundColor: theme.palette.BGColor.main }}
      >
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* The logo of the  Header  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{ color: theme.palette.text.primary, cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
              variant={IsScreenLarge ? "h6" : "body1"}
              noWrap
              component="div"
            >
              Dashboard Admin
            </Typography>

            {/* Condition for the search bar to be not displayed on Small screens */}
            {IsScreenLarge ? (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            ) : null}

            {/* The Dark Mode and Light Mode buttons and Avatar icon with it settings */}
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                gap: IsScreenLarge ? 2 : 1,
                flexDirection: "row",
              }}
            >
              {/* The Cart Button */}
              <IconButton
                color="default"
                aria-label="open drawer"
                edge="end"
                onClick={DrawerSideOpenn}
                sx={{ ...(DrawerSide && { display: "none" }) }}
              >
                <ShoppingBagRounded />
              </IconButton>
              {/* The button for Dark And Light Mode. */}
              <div>
                {theme.palette.mode === "light" ? (
                  <IconButton
                    onClick={() => {
                      localStorage.setItem(
                        "currentTheme",
                        theme.palette.mode === "dark" ? "light" : "dark"
                      );
                      setMode((prevMode) =>
                        prevMode === "light" ? "dark" : "light"
                      );
                    }}
                    color="default"
                  >
                    <LightModeOutlined />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      localStorage.setItem(
                        "currentTheme",
                        theme.palette.mode === "dark" ? "light" : "dark"
                      );
                      setMode((prevMode) =>
                        prevMode === "light" ? "dark" : "light"
                      );
                    }}
                    color="default"
                  >
                    <DarkModeOutlined />
                  </IconButton>
                )}
              </div>
              {/* The Avatar Icons and Settings */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ width: 35, height: 35 }}
                      alt="User"
                      src="/KGLogo.png"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "40px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((item) => (
                    <MenuItem
                      key={item.link}
                      onClick={() => {
                        AvatarSettingsAction(item);
                      }}
                    >
                      <Typography textAlign="center">{item.Name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Box>
        </Toolbar>
        {DrawerSide && (
          <CartDrawer
            DrawerSide={DrawerSide}
            DrawerSideClose={DrawerSideClose}
          />
        )}
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: theme.palette.mode === "dark" ? " #20232A" : "whitesmoke",
        }}
      >
        <DrawerHeader />

        <Outlet />
      </Box>
    </Box>
  );
}

export default AppBarr;
