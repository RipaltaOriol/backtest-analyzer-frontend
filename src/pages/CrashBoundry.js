import ComputerCrash from "assets/svg/computer-troubleshooting.svg";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const CrashBoundry = ({ error, resetErrorBoundary }) => {
    return (
        <Container
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ flex: "1 1 auto" }}>
                <img src={ComputerCrash} alt="Application Error" />
            </Box>
            <Box sx={{ maxWidth: 500 }}>
                <Typography
                    variant="h1"
                    gutterBottom
                    sx={{
                        fontFamily: "Inter",
                        color: "#000",
                        fontSize: "5rem",
                        fontWeight: "500",
                        lineHeight: "64px",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Oops!
                </Typography>
                <Typography
                    sx={{
                        fontSize: "18px",
                        color: "#5B6871",
                        mb: 2,
                    }}
                    gutterBottom
                >
                    Something went wrong. Try clicking the refresh page button
                    to reload the application.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: "#2b61ff",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "6px",
                        "&:hover": {
                            color: "#fff",
                            backgroundColor: "#2b61ff",
                        },
                    }}
                    onClick={resetErrorBoundary}
                >
                    Reload
                </Button>
            </Box>
        </Container>
    );
};

export default CrashBoundry;
