import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { selectDocumentById } from "features/documents/documentSlice";

const MenuButton = styled(Button)({
    color: "#252C32",
    backgroundColor: "#fff",
    border: "1px solid #DDE2E4",
    padding: "4px 12px",
    textTransform: "none",
    borderRadius: "6px",
});

const CalendarHeader = () => {
    const { documentId } = useParams();

    const document = useSelector((state) =>
        selectDocumentById(state, documentId)
    );

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Typography variant="h5" sx={{ mr: 2 }}>
                {document ? document?.name : "Loading"}
            </Typography>

            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    to="/setups"
                    sx={{ ml: 1 }}
                    startIcon={<ViewColumnRoundedIcon />}
                >
                    Manage
                </Button>
                <MenuButton
                    color="secondary"
                    sx={{ ml: 1 }}
                    component={Link}
                    to={`/${documentId}`}
                    startIcon={
                        <TrendingUpRoundedIcon sx={{ color: "#5B6871" }} />
                    }
                >
                    Charts &amp; Data
                </MenuButton>
            </Box>
        </Box>
    );
};

export default CalendarHeader;
