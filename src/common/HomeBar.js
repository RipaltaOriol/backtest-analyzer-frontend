import { Link, Outlet } from "react-router-dom";

import HelpIcon from "@mui/icons-material/Help";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";

import LogoIcon from "../assets/svg/layers-triple.svg";
import LogoTitle from "./LogoTitle";

const LoginButton = styled(Button)({
    color: "#F6F8F9",
    backgroundColor: "#4094F7",
    borderRadius: "6px",
    padding: "4px 24px",
});

const GuideButton = styled(Button)({
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

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Box
                        sx={{ flexGrow: 1, display: "inline-flex" }}
                        component={Link}
                        to="/"
                        className={classes.logoLink}
                    >
                        <img
                            alt="Backtest Analyser Logo"
                            src={LogoIcon}
                            className={classes.logoIcon}
                        />
                        <LogoTitle
                            first="Backtest"
                            second="Analyser"
                            variant="h6"
                            component="p"
                            weight="700"
                            color="#000"
                        />
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <GuideButton
                            component={Link}
                            to="/guide"
                            variant="contained"
                            startIcon={<HelpIcon sx={{ color: "#84919A" }} />}
                        >
                            Guide
                        </GuideButton>
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
