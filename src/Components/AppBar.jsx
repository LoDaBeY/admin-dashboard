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
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, Tooltip, useMediaQuery } from "@mui/material";
import Drawer from "./Drawer";

const drawerWidth = 240;

const settings = [
  {
    Name: "Profile",
    link: "Profile",
  },
  { Name: "Logout", link: "Login" },
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
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  color: "inherit",
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* The AppBar */}
      <AppBar
        position="fixed"
        // @ts-ignore
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
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
              sx={{ cursor: "pointer" }}
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
                    color="inherit"
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
                    color="inherit"
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
                        setAnchorElUser(null);
                        navigate(item.link);
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
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppBarr;
