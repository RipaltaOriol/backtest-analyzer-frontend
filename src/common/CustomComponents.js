import { AddBoxRounded } from "@mui/icons-material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

export const TSSelect = styled(Select)({
    width: "100%",
    backgroundColor: "white",
    borderRadius: "5px",
    "&.MuiOutlinedInput-root:hover fieldset": {
        borderColor: "#0000003b",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
        borderWidth: "1px",
    },
    "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
        borderWidth: "1px",
    },
});

TSSelect.defaultProps = {
    size: "small",
    IconComponent: KeyboardArrowDownRoundedIcon,
};

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

export const TSTextField = styled(TextField)({
    border: "null",
    width: "100%",
    backgroundColor: "white",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            // targets the <fieldset> element
            borderRadius: "5px",
        },
        // targets the root of the outlined input
        "&:hover fieldset": {
            borderColor: "#0000003b", // border color on hover
        },
        "&.Mui-focused fieldset": {
            // targets the <fieldset> when the input is focused
            borderColor: "black", // border color on focus
            borderWidth: "1px", // border width on focus
        },
    },
});

TSTextField.defaultProps = {
    size: "small",
};

export const TSTextFieldStandard = styled(TextField)({
    "& .MuiInput-underline:before": {
        // Underline effect before hover (default state)
        borderBottom: "1px solid #0000003b", // Default border color
    },
    "&:hover .MuiInput-underline:before": {
        // Underline effect on hover
        borderWidth: "1px",
        borderColor: "#0000003b", // Change border color on hover
    },
    // Optional: Change the underline color when the text field is focused (activated)
    "& .MuiInput-underline:after": {
        borderWidth: "1px",
        borderBottomColor: "black", // Change border color when focused
    },
    // Change label color when TextField is focused
    "& .MuiInputLabel-root.Mui-focused": {
        color: "black", // Change to your desired focus color
    },
});

TSTextFieldStandard.defaultProps = {
    variant: "standard",
};

export const TSMainButton = styled(Button)({
    ml: 1,
    backgroundColor: "#0E73F6",
    px: 2,
    py: 1,
    borderRadius: "10px",
});

TSMainButton.defaultProps = {
    disableRipple: true,
    disableElevation: true,
};

export const TSDangerButton = styled(Button)({
    ml: 1,
    px: 2,
    py: 1,
    textTransform: "none",
    borderRadius: "10px",
});

TSDangerButton.defaultProps = {
    disableRipple: true,
    disableElevation: true,
    variant: "contained",
    color: "error",
};

export const TSBackButton = styled(Button)({
    backgroundColor: "#dbdbde",
    px: 2,
    py: 1,
    borderRadius: "10px",
});

TSBackButton.defaultProps = {
    color: "secondary",
};

export const TSAddButton = styled(Button)({
    width: "100%",
    backgroundColor: "#e0e8f8",
    color: "#1A65F1",
    fontSize: "15px",
    fontWeight: 600,
    "&:hover": {
        color: "#1A65F1",
        backgroundColor: "#e0e8f8",
    },
});

TSAddButton.defaultProps = {
    variant: "contained",
    disableRipple: true,
    disableElevation: true,
    disableFocusRipple: true,
    startIcon: <AddBoxRounded />,
};

export const TSDatePicker = styled(DatePicker)({
    backgroundColor: "white",
    width: "100%",
    flexGrow: 1,
    "& input": {
        // fontSize: "14px",
        padding: "8px",
    },
    "&:hover": {
        borderColor: "red",
    },
    "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
            borderColor: "#0000003b",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: "inherit",
        },
    },
});
