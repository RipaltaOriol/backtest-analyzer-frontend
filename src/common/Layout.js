import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from "react-router-dom";


import { logOut } from "../features/auth/authSlice";
import DocumentBar from "../features/documents/DocumentBar";
import { setLoginMsg } from '../features/messages/messagesSlice';
import { useLogoutMutation } from "../features/auth/authApiSlice";

import { styled } from '@mui/system';
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
import LogoutIcon from '@mui/icons-material/Logout';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

import LogoIcon from "../assets/svg/layers-triple.svg";

import LogoTitle from './LogoTitle';
import Upload from '../pages/upload';

const drawerWidth = 240;

const UploadButton = styled(Button)({
  color: '#252C32',
  backgroundColor: "#fff",
  border: '1px solid #DDE2E4',
  padding: '4px 12px',
  margin: 18,
  textTransform: 'none',
  borderRadius: '6px'
})

const DrawerItemButton = styled(ListItemButton)({
  margin: '5px 18px',
  borderRadius: '6px',
  padding: '4px 12px 4px 8px'
})

const useStyles = makeStyles((theme) =>
  createStyles({
    brand: {
      color: '#000',
      textDecoration: 'none',
      flexGrow: 1,
      "&:hover": {
          color: 'inherit',
      }
    },
    toolbar: theme.mixins.toolbar,
    logoLink: {
        textDecoration: 'none',
        "&:hover": {
            color: 'inherit',
        }
    },
    logoIcon: {
        maxWidth: '18px',
        marginRight: '5px'
    }
  })
);

const features = [
  {
    id: "files",
    name: "All Documents",
    url: "/files",
    icon: <LibraryBooksIcon />,
  },
  {
    id: "setups",
    name: "All Setups",
    url: "/setups",
    icon: <Inventory2RoundedIcon />,
  },
];

const assistance = [
  {
    id: "help",
    name: "Help",
    url: "/help",
    icon: <HelpIcon />,
  }
];

export default function Layout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const [logout] = useLogoutMutation();
  const [openUpload, setOpenUpload] = useState(false);

  const handleUploadOpen = () => {
    setOpenUpload(true);
  };

  const handleUploadClose = () => {
    setOpenUpload(false);
  };


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
          <Box sx={{ flexGrow: 1, display: 'inline-flex' }} component={Link} to="/" className={classes.logoLink}>
              <img alt="Backtest Analyser Logo" src={LogoIcon} className={classes.logoIcon} />
              <LogoTitle first="Backtest" second="Analyser" variant="h6" component="p" weight="700" color="#000" />
          </Box>
        </Toolbar>
      </AppBar>


      {/* Side Bar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <UploadButton
            color="secondary"
            variant="contained"
            sx={{ my: 3 }}
            startIcon={<FileUploadIcon
            sx={{ color: '#84919A' }} />}
            onClick={handleUploadOpen}
          >
              Upload File
        </UploadButton>
        {/* Features */}
        <List sx={{ py: 0 }}>
          {features.map((feat) => (
            <DrawerItemButton
              key={feat.name}
              component={Link}
              to={feat.url}
              selected={location.pathname === feat.url}
              disableRipple
            >
              <ListItemIcon sx={{ minWidth: '0', mr: 1, color: '#84919A' }}>{feat.icon}</ListItemIcon>
              <ListItemText primary={feat.name} sx={{ color: '#252C32' }} />
            </DrawerItemButton>
          ))}
        </List>
        <Divider sx={{ m: 1 }} />
        {/* Files */}
        <List>
          <Typography sx={{ px: 3 }} variant="subtitle1">
            Files
          </Typography>
          <DocumentBar />
        </List>
        <List sx={{ mt: 'auto', mb: 2 }}>
          <Divider sx={{ mx: 1 }}/>
          {assistance.map((feat) => (
            <DrawerItemButton
              key={feat.name}
              component={Link}
              to={feat.url}
              selected={location.pathname === feat.url}
              disableRipple
            >
              <ListItemIcon sx={{ minWidth: '0', mr: 1, color: '#84919A' }}>{feat.icon}</ListItemIcon>
              <ListItemText primary={feat.name} sx={{ color: '#252C32' }} />
            </DrawerItemButton>
          ))}
          <DrawerItemButton
            disableRipple
            onClick={signOut}
          >
            <ListItemIcon sx={{ minWidth: '0', mr: 1, color: '#84919A' }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#252C32' }} />
          </DrawerItemButton>
        </List>
      </Drawer>

      {/* main content */}
      <Container sx={{ my: 3, maxWidth: "100%" }} maxWidth={false}>
        <div className={classes.toolbar}></div>
        <Box sx={{ mx: 4 }}>
          <Outlet />
        </Box>
        <Upload
          open={openUpload}
          onClose={handleUploadClose}
        />
      </Container>
    </Box>
  );
}