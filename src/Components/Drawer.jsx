import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { Avatar, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TableViewIcon from "@mui/icons-material/TableView";
import PollIcon from "@mui/icons-material/Poll";
import TerrainIcon from "@mui/icons-material/Terrain";

const DrawerArray = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: "/",
  },
  {
    name: "Customers",
    icon: <PeopleIcon />,
    link: "customers",
  },
  {
    name: "Invoices",
    icon: <ReceiptLongIcon />,
    link: "invoices",
  },
  {
    name: "Chart",
    icon: <BarChartIcon />,
    link: "chart",
  },
];
const DrawerArray2 = [
  {
    name: "Projects",
    icon: <AccountTreeIcon />,
    link: "Projects",
  },
  {
    name: "Form",
    icon: <TableViewIcon />,
    link: "Form",
  },
  {
    name: "BarChart",
    icon: <PollIcon />,
    link: "BarChart",
  },
  {
    name: "Geography Chart",
    icon: <TerrainIcon />,
    link: "GeographyChart",
  },
];
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(
  // @ts-ignore
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  // @ts-ignore
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  // @ts-ignore
  ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

function DrawerSide({ open, setOpen }) {
  const handleDrawerClose = () => {
    setOpen(false);
  };

  let location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Avatar
          alt="Admin Dashboard KGLogo"
          src="/KGLogo.png"
          sx={{ width: 55, height: 55, mr: 6, my: 1, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        />
        {open ? (
          <IconButton sx={{ p: { sm: 0, md: 1 } }} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        ) : null}
      </DrawerHeader>
      {open ? <Divider /> : null}
      {/* The First map of the Drawer */}
      <List>
        {DrawerArray.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.link
                    ? theme.palette.mode === "dark"
                      ? theme.palette.grey[900]
                      : theme.palette.grey[300]
                    : null,
              }}
              onClick={() => {
                navigate(item.link);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* The Secound map of the Drawer */}

      <List>
        {DrawerArray2.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.link
                    ? theme.palette.mode === "dark"
                      ? theme.palette.grey[900]
                      : theme.palette.grey[300]
                    : null,
              }}
              onClick={() => {
                navigate(item.link);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default DrawerSide;
