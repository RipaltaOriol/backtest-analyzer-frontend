import LogoIcon from "assets/svg/trade_sharpener_logo.svg";
import { LoginButtonMobile, NavButtonMobile } from "pages/Home/HomeComponents";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";

import LogoTitle from "./LogoTitle";

const LoginButton = styled(Button)({
    fontSize: "0.875rem",
    color: "#F6F8F9",
    backgroundColor: "#4094F7",
    borderRadius: "6px",
    padding: "4px 24px",
});

const NavButton = styled(Button)({
    fontSize: "0.875rem",
    fontWeight: "400",
    color: "#252C32",
    backgroundColor: "#FFFFFF",
    borderRadius: "6px",
    padding: "4px 24px",
    "&:hover": {
        backgroundColor: "#f5f5f5",
        color: "#252C32",
    },
});

const useStyles = makeStyles({
    logoLink: {
        textDecoration: "none",
        "&:hover": {
            color: "inherit",
        },
    },
    logoIcon: {
        maxWidth: "18px",
        marginRight: "5px",
    },
});

const HomeBar = () => {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setOpenDrawer(open);
    };

    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <Box>
            <AppBar
                elevation={0}
                sx={{
                    py: 1,
                    px: {
                        xs: 1,
                        md: 2,
                        lg: 5,
                    },
                }}
            >
                <Toolbar>
                    <Box
                        sx={{ flexGrow: 1, display: "inline-flex" }}
                        component={Link}
                        to="/"
                        className={classes.logoLink}
                    >
                        <img
                            alt="Trade Sharpener Logo"
                            src={LogoIcon}
                            className={classes.logoIcon}
                        />
                        <LogoTitle
                            first="Trade"
                            second="Sharpener"
                            variant="h6"
                            component="p"
                            weight="700"
                            color="#000"
                        />
                    </Box>
                    <Box sx={{ display: { xs: "block", sm: "none" } }}>
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuRoundedIcon sx={{ color: "#000" }} />
                        </IconButton>
                        <SwipeableDrawer
                            anchor="right"
                            open={openDrawer}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                            disableBackdropTransition={!iOS}
                            disableDiscovery={iOS}
                            elevation={0}
                            PaperProps={{
                                sx: {
                                    backgroundColor: "transparent",
                                },
                            }}
                        >
                            <Box className="mobile-drawer">
                                <NavButtonMobile
                                    className="guide-btn"
                                    sx={{ mb: 1 }}
                                    component={Link}
                                    to="/features"
                                    variant="contained"
                                    onClick={toggleDrawer(false)}
                                >
                                    Features
                                </NavButtonMobile>
                                <NavButtonMobile
                                    className="guide-btn"
                                    sx={{ mb: 1 }}
                                    component={Link}
                                    to="/guide"
                                    variant="contained"
                                    onClick={toggleDrawer(false)}
                                >
                                    Guide
                                </NavButtonMobile>
                                <LoginButtonMobile
                                    component={Link}
                                    to="/login"
                                    variant="contained"
                                    onClick={toggleDrawer(false)}
                                >
                                    My Account
                                </LoginButtonMobile>
                            </Box>
                        </SwipeableDrawer>
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <NavButton
                            component={Link}
                            to="/features"
                            variant="contained"
                        >
                            Features
                        </NavButton>
                        <NavButton
                            sx={{ ml: 1.5 }}
                            component={Link}
                            to="/guide"
                            variant="contained"
                        >
                            Guide
                        </NavButton>
                        <LoginButton
                            sx={{ ml: 1.5 }}
                            component={Link}
                            to="/login"
                            variant="contained"
                        >
                            My Account
                        </LoginButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    );
};

export default HomeBar;
