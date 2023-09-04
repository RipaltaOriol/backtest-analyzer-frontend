import GraphUpIcon from "assets/svg/graph_up.svg";
import MultipleUsersIcon from "assets/svg/multiple_users.svg";
import RoundedStatsIcon from "assets/svg/rounded_stats.svg";
import LogoIcon from "assets/svg/trade_sharpener_logo.svg";
import LogoTitle from "common/LogoTitle";
import { useState } from "react";
import { Link } from "react-router-dom";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { makeStyles } from "@mui/styles";

import HomeFilter from "../../assets/images/home-filter.png";
import HomeObserve from "../../assets/images/home-observe.png";
import HomePage from "../../assets/images/home-page.png";
import HomeVisualise from "../../assets/images/home-visualise.png";
import Footer from "../../common/Footer";
import FAQ from "./FAQ";
import "./Home.css";
import { LoginButtonMobile, NavButtonMobile } from "./HomeComponents";

// TODO: is this paper necessary?
const Item = styled(Box)({
    display: "flex",
    flexDirection: "column",
    background: "#FFFFFF",
    borderRadius: "12px",
    border: "1px solid #E1E4E8",
});

const OrangeButton = styled(Button)({
    background: "#FF9C00",
    borderRadius: "4px",
    "&:hover": {
        backgroundColor: "#FF9C00",
    },
});

const LearnButton = styled(Button)({
    background: "#F8F8F8",
    border: "1px solid #E1E4E8",
    borderRadius: "4px",
    color: "#494556",
    "&:hover": {
        color: "#2B61FF",
        border: "1px solid rgba(75, 78, 252, 0.25)",
    },
});

const LoginButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "trigger",
})(({ trigger, theme }) => ({
    color: "#252C32",
    backgroundColor: "#FFFFFF",
    borderRadius: "6px",
    padding: "4px 24px",
    fontSize: "0.875rem",
    "&:hover": {
        backgroundColor: "#f5f5f5",
        color: "#252C32",
    },
    ...(trigger && {
        color: "#F6F8F9",
        backgroundColor: "#4094F7",
        "&:hover": {
            backgroundColor: "inheirt",
        },
    }),
}));

const NavButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "trigger",
})(({ trigger, theme }) => ({
    color: "#FFF",
    backgroundColor: "transparent",
    boxShadow: "none",
    fontWeight: "400",
    borderRadius: "6px",
    padding: "4px 24px",
    fontSize: "0.875rem",
    "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    ...(trigger && {
        color: "#252C32",
        backgroundColor: "#FFF",
        boxShadow:
            "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);",
        "&:hover": {
            backgroundColor: "#f5f5f5",
            color: "#252C32",
        },
    }),
}));

const useStyles = makeStyles({
    logoLink: {
        textDecoration: "none",
        "&:hover": {
            color: "inherit",
        },
    },
});

const HomeAppbar = (props) => {
    const classes = useStyles();
    const { window } = props;

    const [openDrawer, setOpenDrawer] = useState(false);

    // NOTE: this treshold should be responsive
    let threshold = 50;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        target: window ? window() : undefined,
        threshold,
    });

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
        <AppBar
            elevation={0}
            sx={{
                py: 1,
                px: {
                    xs: 1,
                    md: 2,
                    lg: 5,
                },
                background: trigger ? "default" : "transparent",
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
                        className={`logo-icon ${
                            trigger ? "logo-icon-scrollable" : null
                        }`}
                    />
                    <LogoTitle
                        first="Trade"
                        second="Sharpener"
                        variant="h6"
                        component="p"
                        weight="700"
                        firstColor={trigger ? undefined : "#fff"}
                        color={trigger ? "#000" : "#fff"}
                    />
                </Box>
                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                    <IconButton onClick={toggleDrawer(true)}>
                        <MenuRoundedIcon
                            sx={{ color: trigger ? "#000" : "#fff" }}
                        />
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
                        {/* {list(anchor)} */}
                        <Box className="mobile-drawer">
                            {/* this is not right */}
                            <NavButtonMobile
                                className="guide-btn"
                                sx={{ mb: 1 }}
                                component={Link}
                                to="/features"
                                variant="contained"
                            >
                                Features
                            </NavButtonMobile>
                            <NavButtonMobile
                                className="guide-btn"
                                sx={{ mb: 1 }}
                                component={Link}
                                to="/guide"
                                variant="contained"
                            >
                                Guide
                            </NavButtonMobile>
                            <NavButtonMobile
                                className="guide-btn"
                                sx={{ mb: 1 }}
                                component={Link}
                                to="https://t.me/TradeSharpener_Support"
                                variant="contained"
                            >
                                Support
                            </NavButtonMobile>
                            <LoginButtonMobile
                                component={Link}
                                to="/login"
                                variant="contained"
                                trigger={true}
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
                        trigger={trigger}
                    >
                        Features
                    </NavButton>
                    <NavButton
                        sx={{ ml: 1.5 }}
                        component={Link}
                        to="/guide"
                        variant="contained"
                        trigger={trigger}
                    >
                        Guide
                    </NavButton>

                    <NavButton
                        sx={{ ml: 1.5 }}
                        component={Link}
                        to="https://t.me/TradeSharpener_Support"
                        variant="contained"
                        trigger={trigger}
                    >
                        Support
                    </NavButton>

                    <LoginButton
                        sx={{ ml: 2 }}
                        component={Link}
                        to="/login"
                        variant="contained"
                        trigger={trigger}
                    >
                        My Account
                    </LoginButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

const Home = (props) => {
    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = "//code.tidio.co/ky4jajarj9ghialebwkpxjyqz3qjls4g.js";
    //     script.async = true;
    //     document.body.appendChild(script);

    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Box id="section-1" sx={{ mb: 5 }}>
                <HomeAppbar {...props} />
                <Toolbar />
                <Container sx={{ p: 3, pt: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h1" sx={{ mb: 2.5 }}>
                            Trade Sharpener
                        </Typography>
                        <Typography
                            compoenent="h2"
                            sx={{
                                color: "rgba(255, 255, 255)",
                                fontWeight: "400",
                                fontSize: "1.3rem",
                                lineHeight: "24px",
                                mb: 4,
                            }}
                        >
                            Explore and Learn from your Trading Data
                        </Typography>
                        <OrangeButton
                            variant="contained"
                            size="large"
                            sx={{ px: 3, py: 1 }}
                            component={Link}
                            to="/login"
                        >
                            Get Sarted
                        </OrangeButton>
                        <Paper sx={{ my: 4 }}>
                            <img src={HomePage} alt="App Demo" />
                        </Paper>
                    </Box>
                </Container>
            </Box>

            <Divider sx={{ m: 2, borderColor: "transparent" }} />
            <Box id="section-2">
                <Container sx={{ py: 5 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <span className="span-buble">Features</span>
                        <Typography
                            component="h2"
                            className="h2-subtitle"
                            sx={{ mt: 2, mb: 4 }}
                        >
                            Easy and Intuitive{" "}
                            <span className="blue-highlights">Features</span>
                        </Typography>
                    </Box>
                    <Box className="card-section">
                        <Item sx={{ p: 3 }}>
                            <Typography variant="h4">1. Filter</Typography>
                            <Box sx={{ my: 1.5 }}>
                                <img src={HomeFilter} alt="Change" />
                            </Box>
                            <Typography sx={{ mb: 2 }}>
                                Dive deep into your data and isolate different
                                metrics to differentiate what is working from
                                what is not.
                            </Typography>
                            <Typography>
                                Apply different layers and generate multiple
                                scenarios to generate leads.
                            </Typography>
                        </Item>
                        <Item sx={{ p: 3 }}>
                            <Typography variant="h4">2. Observe</Typography>
                            <Box sx={{ my: 1.5 }}>
                                <img src={HomeObserve} alt="Change" />
                            </Box>
                            <Typography sx={{ mb: 2 }}>
                                Use our representative tables to observe what is
                                your data and find what you are looking for.
                            </Typography>
                            <Typography>
                                Write custom notes to record your thought
                                process and keep track of what you are looking
                                for.
                            </Typography>
                        </Item>
                        <Item sx={{ p: 3 }}>
                            <Typography variant="h4">3. Interpret</Typography>
                            <Box sx={{ my: 1.5 }}>
                                <img src={HomeVisualise} alt="Change" />
                            </Box>
                            <Typography sx={{ mb: 2 }}>
                                Be able to visualize your data through our
                                graphs and get a better sense of what your data
                                looks like.
                            </Typography>
                            <Typography>
                                If you also have screenshots of your trades we
                                offer image embedding to look at them as you
                                work on through your data.
                            </Typography>
                        </Item>
                    </Box>
                </Container>
            </Box>

            <Divider sx={{ m: 2, borderColor: "transparent" }} />
            <Box id="section-3">
                <Container sx={{ pt: 5 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 4,
                        }}
                    >
                        <span className="span-buble">Workflow</span>
                        <Typography
                            component="h2"
                            className="h2-subtitle"
                            sx={{ mt: 2 }}
                        >
                            Create your own{" "}
                            <span className="blue-highlights">Workflow</span>
                        </Typography>
                    </Box>
                    <Box className="card-section">
                        {/* TODO: custom links to ID with 'Learn More' */}
                        <Box
                            sx={{
                                border: "1px solid #E1E4E8",
                                borderRadius: "12px",
                                display: "flex",
                                flexDirection: "column",
                                p: 3,
                            }}
                        >
                            <img
                                src={MultipleUsersIcon}
                                className="workflow-grid-icons"
                                alt="workflow-user-icons"
                            />
                            <Typography
                                variant="h4"
                                sx={{ fontSize: "1.8rem", my: 2 }}
                            >
                                Create Multiple Instances
                            </Typography>
                            <Typography sx={{ mb: 3 }}>
                                Generate different versions of your backtest
                                data and study them individually
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: "flex" }}>
                                <LearnButton
                                    sx={{
                                        px: 1.5,
                                        alignSelf: "flex-end",
                                    }}
                                    size="small"
                                    component={Link}
                                    to="/features"
                                    // hash="#versioning"

                                    disableRipple
                                    endIcon={
                                        <ArrowForwardIosRoundedIcon fontSize="small" />
                                    }
                                >
                                    Learn More
                                </LearnButton>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                border: "1px solid #E1E4E8",
                                borderRadius: "12px",
                                display: "flex",
                                flexDirection: "column",
                                p: 3,
                            }}
                        >
                            <img
                                src={RoundedStatsIcon}
                                className="workflow-grid-icons"
                                alt="workflow-rounded-stats-icons"
                            />
                            <Typography
                                variant="h4"
                                sx={{ fontSize: "1.8rem", my: 2 }}
                            >
                                Study your Data
                            </Typography>
                            <Typography sx={{ mb: 3 }}>
                                Utilize all of our tools to study your backtest
                                in the way that best fits your needs
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: "flex" }}>
                                <LearnButton
                                    sx={{
                                        px: 1.5,
                                        alignSelf: "flex-end",
                                    }}
                                    size="small"
                                    component={Link}
                                    to="/features"
                                    // hash="#detail"
                                    disableRipple
                                    endIcon={
                                        <ArrowForwardIosRoundedIcon fontSize="small" />
                                    }
                                >
                                    Learn More
                                </LearnButton>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                border: "1px solid #E1E4E8",
                                borderRadius: "12px",
                                display: "flex",
                                flexDirection: "column",
                                p: 3,
                            }}
                        >
                            <img
                                src={GraphUpIcon}
                                className="workflow-grid-icons"
                                alt="workflow-graph-up-icons"
                            />
                            <Typography
                                variant="h4"
                                sx={{ fontSize: "1.8rem", my: 2 }}
                            >
                                Improve and Repeat
                            </Typography>
                            <Typography sx={{ mb: 3 }}>
                                Come up with leads for your next backtest and
                                improve your strategy
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: "flex" }}>
                                <LearnButton
                                    sx={{
                                        px: 1.5,
                                        alignSelf: "flex-end",
                                    }}
                                    size="small"
                                    component={Link}
                                    to="/features"
                                    disableRipple
                                    endIcon={
                                        <ArrowForwardIosRoundedIcon fontSize="small" />
                                    }
                                >
                                    Learn More
                                </LearnButton>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Divider sx={{ m: 3, borderColor: "transparent" }} />
            <Box id="section-4">
                <Container sx={{ pt: 5 }}>
                    <Box sx={{ backgroundColor: "#2B61FF" }}>
                        <Box className="blue-modal">
                            <Box>
                                <Typography className="h4-subtitle">
                                    So What's Next?
                                </Typography>
                                <Typography
                                    component="h2"
                                    className="h2-subtitle"
                                    sx={{ color: "white" }}
                                >
                                    Start Keeping Track of Your Data!
                                </Typography>
                            </Box>
                            {/* TODO: link to signup */}
                            <LoginButton
                                variant="contained"
                                // className="modal-login-btn"
                                component={Link}
                                to="/login"
                                sx={{ py: 1, mt: { xs: 2, md: 0 } }}
                            >
                                Get Started
                            </LoginButton>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Divider sx={{ m: 3, borderColor: "transparent" }} />
            <Box id="section-4">
                <Container>
                    <Typography
                        component="h2"
                        className="h2-subtitle"
                        align="center"
                        sx={{ mt: 2, mb: 4 }}
                    >
                        Frequently Asked Questions
                    </Typography>
                    <FAQ />
                </Container>
            </Box>

            <Divider sx={{ m: 3, borderColor: "transparent" }} />

            <Footer />
        </Box>
    );
};

export default Home;
