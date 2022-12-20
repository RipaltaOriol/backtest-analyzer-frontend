import { Link, Outlet } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";

import LogoIcon from "../assets/svg/layers-triple.svg";
import LogoTitle from "./LogoTitle";

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

const navItems = [
    { name: "Guide", url: "/guide" },
    { name: "Login", url: "/login" },
];

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
                        {navItems.map((item) => (
                            <Button
                                key={item}
                                sx={{ color: "#fff", mx: 0.4 }}
                                component={Link}
                                to={item.url}
                                variant="contained"
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    );
};

export default HomeBar;
