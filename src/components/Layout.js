import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import { createStyles, makeStyles } from "@mui/styles";
import useDocuments from "../hooks/useDocuments";

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

import DocumentBar from "../features/documents/DocumentBar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    brand: {
      flexGrow: 1,
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

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const { documents, setDocuments } = useDocuments();

  const changeDocument = async (document) => {
    await setDocuments((prev) => {
      return {
        ...prev,
        currentId: document.id,
        currentName: document.name,
      };
    });
  };

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getDocuments = async () => {
      try {
        const response = await axiosPrivate.get("/documents", {
          signal: controller.signal,
        });
        isMounted &&
          setDocuments((prev) => {
            return {
              ...prev,
              all: response.data.documents,
            };
          });
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    // getDocuments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    // here was a div with className root
    <Box sx={{ display: "flex" }}>
      {/* app bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.brand}>
            Backtest Analyzer
          </Typography>
          {/* Delete this after the redesign is done */}
          <Button
            sx={{ ml: 1 }}
            color="secondary"
            variant="contained"
            onClick={signOut}
          >
            Sign Out
          </Button>
          {/* {!isAuth && <Button sx={{ ml: 1 }} color='secondary' variant='contained' href='/login'>Login</Button>} */}
          {/* {isAuth && <Button sx={{ ml: 1 }} color='secondary' variant='contained' onClick={() => logout()}>Logout</Button>} */}
        </Toolbar>
      </AppBar>

      {/* side bar */}
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
          <List sx={{ py: 0 }}>
            {features.map((feat, index) => (
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
          <List>
            <Typography sx={{ px: 2, py: 1 }} variant="h5">
              Files
            </Typography>
            <DocumentBar />
            {/* {documents && documents?.all.map((document, idx) => (
              <ListItemButton 
                key={document.id}
                component={Link}
                to='/analysis'
                sx={{ py: 0.5 }}
                selected={document.id === documents.currentId && location.pathname === '/analysis'}
                onClick={() => changeDocument(document)}
                disableRipple
              >
                <ListItemText
                  primary={document.name}
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                />
              </ListItemButton>
            ))} */}
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
