import LogoIcon from "assets/svg/trade_sharpener_logo.svg";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingPage = () => {
    return (
        <Container
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img src={LogoIcon} alt="Loading Logo" className="loading-logo" />
            <Box sx={{ width: "200px" }}>
                <LinearProgress color="inherit" />
            </Box>
        </Container>
    );
};

export default LoadingPage;
