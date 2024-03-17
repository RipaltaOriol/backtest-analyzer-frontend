import logoTitleTradeSharpener from "assets/svg/TSLogoTitle.svg";
import { LoginButtonMobile, NavButtonMobile } from "pages/Home/HomeComponents";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";

const LoginButton = styled(Button)({
    background: "white",
    border: "2px solid #2b61ff",
    borderRadius: "5px",
    color: "#2b61ff",
    "&:hover": {
        backgroundColor: "white",
        color: "#2b61ff",
    },
});

const NavButton = styled(Button)({
    color: "#000",
    backgroundColor: "transparent",
    boxShadow: "none",
    fontWeight: "500",
    borderRadius: "6px",
    fontSize: "16px",
    "&:hover": {
        backgroundColor: "transparent",
        color: "#000",
        boxShadow: "none",
    },
});

const HomeBar = () => {
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
            <AppBar elevation={1} sx={{ backgroundColor: "white" }}>
                <Toolbar component={Container} sx={{ py: 3 }}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "inline-flex",
                            alignItems: "center",
                        }}
                        component={Link}
                        to="/"
                    >
                        <Box sx={{ mr: 4 }}>
                            <img
                                alt="Trade Sharpener Logo"
                                src={logoTitleTradeSharpener}
                                className="logo-icon-regular"
                            />
                        </Box>
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
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

                            <NavButton
                                sx={{ ml: 1.5 }}
                                component={Link}
                                to="https://t.me/TradeSharpener_Support"
                                variant="contained"
                            >
                                Support
                            </NavButton>
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: "block", md: "none" } }}>
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
                                <NavButtonMobile
                                    className="guide-btn"
                                    sx={{ mb: 1 }}
                                    component={Link}
                                    to="https://t.me/TradeSharpener_Support"
                                    variant="contained"
                                    onClick={toggleDrawer(false)}
                                >
                                    Support
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
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <LoginButton
                            sx={{ px: 3, py: 1 }}
                            component={Link}
                            to="/login"
                            disableRipple
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
