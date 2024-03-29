import logoTitleTradeSharpener from "assets/svg/TSLogoTitle.svg";
import Message from "common/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import HelpIcon from "@mui/icons-material/Help";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useLogoutMutation } from "../features/auth/authApiSlice";
import { logOut } from "../features/auth/authSlice";
import DocumentBar from "../features/documents/DocumentBar";
import { setError, setMessage } from "../features/messages/messagesSlice";
import { selectMessage } from "../features/messages/messagesSlice";
import Upload from "../pages/upload";
import SupportEngine from "./SupportEngine";

const drawerWidth = 240;

const UploadButton = styled(Button)({
    color: "#252C32",
    backgroundColor: "#fff",
    border: "1px solid #DDE2E4",
    padding: "4px 12px",
    margin: 18,
    textTransform: "none",
    borderRadius: "6px",
});

const DrawerItemButton = styled(ListItemButton)({
    margin: "5px 18px",
    borderRadius: "6px",
    padding: "4px 12px 4px 8px",
});

const RootToolbar = styled("div")(({ theme }) => theme.mixins.toolbar);

const features = [
    {
        id: "files",
        name: "All Accounts",
        url: "/files",
        icon: <Inventory2RoundedIcon />,
    },
    {
        id: "setups",
        name: "All Versions",
        url: "/setups",
        icon: <LibraryBooksIcon />,
    },
];

const assistance = [
    {
        id: "help",
        name: "Help",
        url: "/help",
        icon: <HelpIcon />,
        target: "_self",
    },
    {
        id: "contact",
        name: "Contact",
        url: "https://t.me/TradeSharpener_Support",
        icon: <PermPhoneMsgIcon />,
        target: "_blank",
    },
    {
        id: "settings",
        name: "Settings",
        url: "/settings",
        icon: <SettingsIcon />,
        target: "_self",
    },
];

export default function Layout() {
    const dispatch = useDispatch();
    const location = useLocation();
    const message = useSelector(selectMessage);

    const [logout] = useLogoutMutation();
    const [openUpload, setOpenUpload] = useState(false);

    const handleUploadOpen = () => {
        setOpenUpload(true);
    };

    const handleUploadClose = () => {
        setOpenUpload(false);
    };

    const signOut = async () => {
        await logout().unwrap();
        dispatch(setMessage({ msg: "Successfully logged out!" }));
        dispatch(setError({ error: false }));
        dispatch(logOut());
    };

    const setUserMessage = (newMessage) => {
        dispatch(setMessage({ msg: newMessage }));
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
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "inline-flex",
                            textDecoration: "none",
                        }}
                        component={Link}
                        to="/"
                    >
                        <img
                            alt="Trade Sharpener Logo"
                            src={logoTitleTradeSharpener}
                            className="logo-icon-regular"
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Side Bar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    height: "100vh",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <UploadButton
                    color="secondary"
                    variant="contained"
                    sx={{ my: 3 }}
                    startIcon={<FileUploadIcon sx={{ color: "#84919A" }} />}
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
                            <ListItemIcon
                                sx={{
                                    minWidth: "0",
                                    mr: 1,
                                    color: "#84919A",
                                }}
                            >
                                {feat.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={feat.name}
                                sx={{ color: "#252C32" }}
                            />
                        </DrawerItemButton>
                    ))}
                </List>
                <Divider sx={{ m: 1 }} />
                {/* Files */}
                <List className="documentsBar">
                    <Typography sx={{ px: 3 }} variant="subtitle1">
                        Accounts
                    </Typography>
                    <DocumentBar />
                </List>

                <List sx={{ mt: "auto" }}>
                    <Divider sx={{ mx: 1, mb: 1 }} />
                    {assistance.map((feat) => (
                        <DrawerItemButton
                            key={feat.name}
                            component={Link}
                            to={feat.url}
                            target={feat.target}
                            selected={location.pathname === feat.url}
                            disableRipple
                        >
                            <ListItemIcon
                                sx={{ minWidth: "0", mr: 1, color: "#84919A" }}
                            >
                                {feat.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={feat.name}
                                sx={{ color: "#252C32" }}
                            />
                        </DrawerItemButton>
                    ))}
                    <DrawerItemButton disableRipple onClick={signOut}>
                        <ListItemIcon
                            sx={{ minWidth: "0", mr: 1, color: "#84919A" }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Logout"
                            sx={{ color: "#252C32" }}
                        />
                    </DrawerItemButton>
                </List>
            </Drawer>

            {/* main content */}
            <Box sx={{ my: 3, width: `calc(100% - ${drawerWidth}px)` }}>
                <RootToolbar />
                <Box sx={{ mx: 4 }}>
                    <Outlet />
                </Box>
                <Upload open={openUpload} onClose={handleUploadClose} />
                <SupportEngine />
            </Box>
            {message?.message && (
                <Message
                    message={message.message}
                    setMessage={setUserMessage}
                    isError={message.isError}
                    sx={{ mb: 3 }}
                />
            )}
        </Box>
    );
}
