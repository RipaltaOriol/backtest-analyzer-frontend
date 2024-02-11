import LogoIcon from "assets/svg/trade_sharpener_logo.svg";
import LogoTitle from "common/LogoTitle";
import { useState } from "react";
import { Link } from "react-router-dom";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CompareIcon from "@mui/icons-material/Compare";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import QueueIcon from "@mui/icons-material/Queue";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import TroubleshootRoundedIcon from "@mui/icons-material/TroubleshootRounded";
import TuneIcon from "@mui/icons-material/Tune";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
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

import HomeAnalytics from "../../assets/images/home-analytics.png";
import HomeCreate from "../../assets/images/home-create.png";
import HomeCustomization from "../../assets/images/home-customization.png";
import HomePage from "../../assets/images/home-page.png";
import Footer from "../../common/Footer";
import FAQ from "./FAQ";
import "./Home.css";
import { LoginButtonMobile, NavButtonMobile } from "./HomeComponents";

const MainButton = styled(Button)({
    background: "white",
    borderRadius: "5px",
    color: "#2b61ff",
    "&:hover": {
        backgroundColor: "#f5f5f5",
        color: "#252C32",
    },
});

const LearnButton = styled(Button)({
    color: "#000",
    padding: 0,
    fontWeight: 600,
    fontSize: 16,
    "&:hover": {
        background: "none",
        color: "#2b61ff",
    },
    "&:focus": {
        background: "none",
    },
});

const LearnMoreButton = styled(Button)({
    background: "transparent",
    border: "2px solid white",
    borderRadius: "5px",
    color: "white",
    "&:hover": {
        backgroundColor: "transparent",
    },
});

const LoginButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "trigger",
})(({ trigger, theme }) => ({
    background: "white",
    borderRadius: "5px",
    color: "#2b61ff",
    "&:hover": {
        backgroundColor: "white",
        color: "#2b61ff",
    },
    ...(trigger && {
        border: "2px solid #2b61ff",
        color: "#2b61ff",
        "&:hover": {
            backgroundColor: "white",
            color: "#2b61ff",
        },
    }),
}));

const NavButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "trigger",
})(({ trigger, theme }) => ({
    color: "#FFF",
    backgroundColor: "transparent",
    boxShadow: "none",
    fontWeight: "500",
    borderRadius: "6px",
    fontSize: "16px",
    "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    ...(trigger && {
        color: "#000",
        "&:hover": {
            backgroundColor: "transparent",
            color: "#000",
            boxShadow: "none",
        },
    }),
}));

const HomeAppbar = (props) => {
    const { window } = props;

    const [openDrawer, setOpenDrawer] = useState(false);

    // NOTE: this treshold should be responsive
    let threshold = 200;

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
            elevation={trigger ? 1 : 0}
            sx={{
                background: trigger ? "#fff" : "transparent",
            }}
        >
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
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
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
                    </Box>
                </Box>
                <Box sx={{ display: { xs: "block", md: "none" } }}>
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
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <LoginButton
                        sx={{ px: 3, py: 1 }}
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
                <Toolbar />
                <Container sx={{ p: 3, pt: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{ mb: 2.5 }}
                            align="center"
                        >
                            Trade Sharpener
                        </Typography>
                        <Typography
                            compoenent="h2"
                            align="center"
                            sx={{
                                color: "rgba(255, 255, 255)",
                                fontWeight: "400",
                                fontSize: "1.2rem",
                                lineHeight: "24px",
                                mb: 4,
                            }}
                        >
                            Explore and Learn from your Trading Data
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                flexWrap: "wrap",
                                justifyContent: "center",
                            }}
                        >
                            <MainButton
                                variant="contained"
                                sx={{ px: 3, py: 1 }}
                                component={Link}
                                to="/login"
                            >
                                Get Started
                            </MainButton>
                            <LearnMoreButton
                                variant="contained"
                                disableRipple
                                sx={{ px: 3, py: 1 }}
                                component={Link}
                                to="/features"
                            >
                                Learn More
                            </LearnMoreButton>
                        </Box>
                        <Paper sx={{ my: 4 }}>
                            <img
                                src={HomePage}
                                className="home-img"
                                alt="App Demo"
                            />
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
                            mb: 6,
                        }}
                    >
                        <span className="span-buble">Features</span>
                        <Typography
                            component="h2"
                            className="h2-subtitle"
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            Discover Powerful{" "}
                            <span className="blue-highlights">Features</span>
                        </Typography>
                        <Typography variant="body2" align="center">
                            Unleash the power of our platform with a multitude
                            of powerful features, empowering you to achieve your
                            goals
                        </Typography>
                    </Box>
                    <Box className="home-features-1">
                        <Box
                            sx={{
                                backgroundColor: "#2b61ff1a",
                                p: 3,
                                borderRadius: "6px",
                            }}
                        >
                            <Avatar
                                sx={{
                                    backgroundColor: "#2b61ff",
                                    p: 1,
                                    mb: 2,
                                }}
                            >
                                <PieChartRoundedIcon
                                    fontSize="large"
                                    sx={{ color: "white" }}
                                />
                            </Avatar>
                            <Typography variant="h4" gutterBottom>
                                Advanced Analytics
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Experience advanced analytics capabilities that
                                enable you to dive deep into data, uncover
                                meaningful patterns, and derive actionable
                                insights for informed decision-making.
                            </Typography>
                            <LearnButton
                                omponent={Link}
                                to="/guide"
                                endIcon={<ArrowForwardRoundedIcon />}
                                disableRipple
                            >
                                Learn more
                            </LearnButton>
                            <img
                                className="home-features left"
                                src={HomeAnalytics}
                                alt="Change"
                            />
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#2b61ff1a",
                                p: 3,
                                borderRadius: "6px",
                            }}
                        >
                            <Avatar
                                sx={{
                                    backgroundColor: "#FDB52A",
                                    p: 1,
                                    mb: 2,
                                }}
                            >
                                <DashboardCustomizeIcon
                                    fontSize="large"
                                    sx={{ color: "white" }}
                                />
                            </Avatar>
                            <Typography variant="h4" gutterBottom>
                                Personalised Structure
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Our personalized table structure and templates
                                feature is designed to empower you with the
                                flexibility and adaptability you need to
                                organize and display your data exactly the way
                                you want it.
                            </Typography>
                            <LearnButton
                                component={Link}
                                to="/guide"
                                endIcon={<ArrowForwardRoundedIcon />}
                                disableRipple
                            >
                                Learn more
                            </LearnButton>
                            <img
                                className="home-features right"
                                src={HomeCustomization}
                                alt="Change"
                            />
                        </Box>
                    </Box>
                    <Box className="home-features-2">
                        <Box
                            sx={{
                                backgroundColor: "#2b61ff1a",
                                p: 3,
                                borderRadius: "6px",
                            }}
                        >
                            <Avatar
                                sx={{
                                    backgroundColor: "#FA5B68",
                                    p: 1,
                                    mb: 2,
                                }}
                            >
                                <TuneIcon
                                    fontSize="large"
                                    sx={{ color: "white" }}
                                />
                            </Avatar>
                            <Typography variant="h4" gutterBottom>
                                Custom Filtering
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Dive deep into your data and isolate different
                                metrics to differentiate what is working from
                                what is not. Apply different layers and generate
                                multiple scenarios to generate leads.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#2b61ff1a",
                                p: 3,
                                borderRadius: "6px",
                            }}
                        >
                            <Avatar
                                sx={{
                                    backgroundColor: "#FDB52A",
                                    p: 1,
                                    mb: 2,
                                }}
                            >
                                <TroubleshootIcon
                                    fontSize="large"
                                    sx={{ color: "white" }}
                                />
                            </Avatar>
                            <Typography variant="h4" gutterBottom>
                                Deep Observation
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Use our representative tables to observe what is
                                your data and find what you are looking for.
                                Write custom notes to record your thought
                                process and keep track of what you are looking
                                for.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#2b61ff1a",
                                p: 3,
                                borderRadius: "6px",
                            }}
                        >
                            <Avatar
                                sx={{
                                    backgroundColor: "#2b61ff",
                                    p: 1,
                                    mb: 2,
                                }}
                            >
                                <CompareIcon
                                    fontSize="large"
                                    sx={{ color: "white" }}
                                />
                            </Avatar>
                            <Typography variant="h4" gutterBottom>
                                Compare Results
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Visualize your data through our graphs and get a
                                better sense of what your data looks like. We
                                also offer image embedding to look at them as
                                you work on through your data.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box id="section-3">
                <Container sx={{ p: 5 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 6,
                        }}
                    >
                        <span className="span-buble">Workflow</span>
                        <Typography
                            component="h2"
                            className="h2-subtitle"
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            Create Your Own{" "}
                            <span className="blue-highlights">Workflow</span>
                        </Typography>
                        <Typography variant="body2" align="center">
                            Discover how it works by leveraging advanced
                            algorithms and data analysis techniques
                        </Typography>
                    </Box>
                    <Box className="section-3">
                        <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: "flex", mb: 6 }}>
                                <Avatar
                                    sx={{
                                        border: "1px solid #E1E4E8",
                                        backgroundColor: "transparent",
                                        p: 1,
                                        mr: 2,
                                    }}
                                >
                                    <QueueIcon
                                        fontSize="large"
                                        sx={{ color: "black" }}
                                    />
                                </Avatar>
                                <Box>
                                    <Typography variant="h4" gutterBottom>
                                        Create Multiple Instances
                                    </Typography>
                                    <Typography variant="body2">
                                        Generate different versions of your
                                        backtest data and study them
                                        individually
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", mb: 6 }}>
                                <Avatar
                                    sx={{
                                        border: "1px solid #E1E4E8",
                                        backgroundColor: "transparent",
                                        p: 1,
                                        mr: 2,
                                    }}
                                >
                                    <TroubleshootRoundedIcon
                                        fontSize="large"
                                        sx={{ color: "black" }}
                                    />
                                </Avatar>
                                <Box>
                                    <Typography variant="h4" gutterBottom>
                                        Study Your Data
                                    </Typography>
                                    <Typography variant="body2">
                                        Utilize all of our tools to study your
                                        data in the way that best fits your
                                        needs
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", mb: 4 }}>
                                <Avatar
                                    sx={{
                                        border: "1px solid #E1E4E8",
                                        backgroundColor: "transparent",
                                        p: 1,
                                        mr: 2,
                                    }}
                                >
                                    <LoopRoundedIcon
                                        fontSize="large"
                                        sx={{ color: "black" }}
                                    />
                                </Avatar>
                                <Box>
                                    <Typography variant="h4" gutterBottom>
                                        Improve and Repeat
                                    </Typography>
                                    <Typography variant="body2">
                                        Come up with leads for your next
                                        backtest and improve your strategy
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#2b61ff",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "end",
                                px: 2,
                                pt: 2,
                            }}
                        >
                            <img
                                className="home-workflow"
                                src={HomeCreate}
                                alt="Connect directly to your MT4 account"
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Divider sx={{ m: 3, borderColor: "transparent" }} />
            <Box id="section-4">
                <Container>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <span className="span-buble">FAQs</span>

                        <Typography
                            component="h2"
                            className="h2-subtitle"
                            align="center"
                            gutterBottom
                            sx={{ mt: 2 }}
                        >
                            Frequently Asked Questions
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mb: 4 }}
                            align="center"
                        >
                            Find answers to commonly asked questions about Trade
                            Sharpener
                        </Typography>
                    </Box>
                    <FAQ />
                </Container>
            </Box>

            <Box id="section-5">
                <Container sx={{ pt: 5 }}>
                    <Box className="blue-modal">
                        <Box>
                            <Typography className="h4-subtitle">
                                So What's Next?
                            </Typography>
                            <Typography
                                component="h2"
                                className="h2-subtitle white"
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
                </Container>
            </Box>

            <Divider sx={{ m: 3, borderColor: "transparent" }} />

            <Footer />
        </Box>
    );
};

export default Home;
