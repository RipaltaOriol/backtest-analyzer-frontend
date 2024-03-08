import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

export const CustomMenuItem = styled(MenuItem)({
    fontSize: "14px",
    borderRadius: "6px",
    "&:hover": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
    "&:focus": {
        color: "inherit",
        backgroundColor: "inherit",
    },
    "&.Mui-selected": {
        "&:focus": {
            color: "inherit",
            backgroundColor: "inherit",
        },
    },
    "&:hover:focus": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
});

export const CustomSelect = styled(Select)({
    color: "#0e73f6",
    fontWeight: "500",
    "& legend": { display: "none" },
    "& fieldset": { top: 0 },
    "&.MuiOutlinedInput-root:hover fieldset": {
        borderColor: "#0e73f6",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "inherit",
        borderWidth: "1px",
    },
});

export const TSMenuItem = styled(MenuItem)({
    borderRadius: "6px",
    fontWeight: "500",
    "&:hover": {
        color: "#1A65F1",
        backgroundColor: "#f6f9fe",
    },
    "&:focus": {
        color: "inherit",
        backgroundColor: "inherit",
    },
    "&.Mui-selected": {
        "&:focus": {
            color: "inherit",
            backgroundColor: "inherit",
        },
    },
    "&:hover:focus": {
        color: "#1A65F1",
        backgroundColor: "#f6f9fe",
    },
});
