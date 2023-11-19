import LogoIcon from "assets/svg/trade_sharpener_logo.svg";
import LogoTitle from "common/LogoTitle";
import { Link } from "react-router-dom";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

const Footer = () => {
    return (
        <Container>
            <Divider sx={{ mb: 4 }} />
            <Grid container spacing={2}>
                <Grid xs={12} md={5}>
                    <Box>
                        <img
                            alt="Trade Sharpener Logo"
                            src={LogoIcon}
                            className="logo-icon logo-icon-scrollable"
                        />
                        <LogoTitle
                            first="Trade"
                            second="Sharpener"
                            variant="h4"
                            component="p"
                            weight="700"
                        />
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                        Streamline your trading operations with our powerful
                        journal solution. Boost productivity and drive growth
                        with Trade Sharpener.
                    </Typography>
                    <Box>
                        <IconButton
                            disableRipple
                            sx={{ backgroundColor: "#2b61ff", mr: 1 }}
                        >
                            <YouTubeIcon sx={{ color: "white" }} />
                        </IconButton>
                        <IconButton
                            disableRipple
                            sx={{ backgroundColor: "#2b61ff", mr: 1 }}
                        >
                            <InstagramIcon sx={{ color: "white" }} />
                        </IconButton>
                        <IconButton
                            disableRipple
                            sx={{ backgroundColor: "#2b61ff", mr: 1 }}
                        >
                            <LinkedInIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid xs={0} md={1}></Grid>
                <Grid xs={0} md={3}></Grid>
                <Grid xs={12} md={3}>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{ fontWeight: 600 }}
                        gutterBottom
                    >
                        Pages
                    </Typography>
                    <Link className="footer-link" to="/login">
                        Login
                    </Link>
                    <Link className="footer-link" to="/guide">
                        Help
                    </Link>
                    <Link className="footer-link" to="/features">
                        Features
                    </Link>
                    <Link
                        className="footer-link"
                        to="https://t.me/TradeSharpener_Support"
                    >
                        Contact Us
                    </Link>
                </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Typography sx={{ mb: 4 }}>
                @2023 Trade Sharpener. All Rights Reserved.
            </Typography>
        </Container>
    );
};

export default Footer;
