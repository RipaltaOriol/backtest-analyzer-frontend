import ConstructionIcon from "@mui/icons-material/Construction";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Settings = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <ConstructionIcon sx={{ mr: 1, color: "#5B6871" }} />
            <Typography variant="h5">
                This page is under construction
            </Typography>
        </Box>
    );
};

export default Settings;
