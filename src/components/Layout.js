import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from "react-router-dom";


import { logOut } from "../features/auth/authSlice";
import DocumentBar from "../features/documents/DocumentBar";
import { setLoginMsg } from '../features/messages/messagesSlice';
import { useLogoutMutation } from "../features/auth/authApiSlice";


import { createStyles, makeStyles } from "@mui/styles";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import HelpIcon from "@mui/icons-material/Help";
import PreviewIcon from "@mui/icons-material/Preview";
import FileUploadIcon from "@mui/icons-material/FileUpload";


const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    brand: {
      color: '#fff',
      textDecoration: 'none',
      flexGrow: 1,
      "&:hover": {
          color: 'inherit',
      }
    },
    toolbar: theme.mixins.toolbar,
  })
);

const features = [
  {
    id: "overview",
    name: "Overview",
    url: "/overview",
    icon: <PreviewIcon />,
  },
  {
    id: "upload",
    name: "Upload",
    url: "/upload",
    icon: <FileUploadIcon />,
  },
  {
    id: "help",
    name: "Help",
    url: "/help",
    icon: <HelpIcon />,
  },
];

export default function Layout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const [logout] = useLogoutMutation();

  const signOut = async () => {
    await logout().unwrap()
    dispatch(setLoginMsg({ msg: 'Successfully logged out!' }))
    dispatch(logOut())
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {/* Title  */}
          <Typography 
            variant="h6"
            component={Link}
            to='/'
            className={classes.brand}
          >
            Backtest Analyzer
          </Typography>
          {/* Sign out */}
          <Button
            sx={{ ml: 1 }}
            color="secondary"
            variant="contained"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Side Bar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {/* Features */}
          <List sx={{ py: 0 }}>
            {features.map((feat) => (
              <ListItemButton
                key={feat.name}
                component={Link}
                to={feat.url}
                selected={location.pathname === feat.url}
                disableRipple
              >
                <ListItemIcon>{feat.icon}</ListItemIcon>
                <ListItemText primary={feat.name} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          {/* Files */}
          <List>
            <Typography sx={{ px: 2, py: 1 }} variant="h5">
              Files
            </Typography>
            <DocumentBar />
          </List>
        </Box>
      </Drawer>

      {/* main content */}
      <Container sx={{ my: 3, maxWidth: "100%" }} maxWidth={false}>
        <div className={classes.toolbar}></div>
        <Box sx={{ mx: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
