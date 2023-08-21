import Accordion from "@mui/material/Accordion";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";

export const TemplateAccordion = styled(Accordion)({
    boxShadow: "none",
    border: "1px solid #DDE2E4",
    borderRadius: "5px",
    "&.MuiAccordion-root:before": {
        backgroundColor: "white",
        zIndex: -1,
    },
    marginBottom: "8px",
});

export const CustomDateTimeField = styled(DateTimeField)({
    width: "100%",
    outline: "none",
    "& input": {
        fontSize: "14px",
        padding: "8px",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "1px solid #DDE2E4",
        },
        "&:hover fieldset": {
            border: "1px solid #DDE2E4",
        },
        "&.Mui-focused fieldset": {
            border: "1px solid #0e73f6",
        },
    },
});

export const CustomTextField = styled(TextField)({
    width: "100%",
    outline: "none",
    "& input": {
        fontSize: "14px",
        padding: "8px",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "1px solid #DDE2E4",
        },
        "&:hover fieldset": {
            border: "1px solid #DDE2E4",
        },
        "&.Mui-focused fieldset": {
            border: "1px solid #0e73f6",
        },
    },
});

export const ImageUrlTextField = styled(TextField)({
    outline: "none",
    "& input": {
        fontSize: "14px",
        padding: "8px",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "1px solid #DDE2E4",
        },
        "&:hover fieldset": {
            border: "1px solid #DDE2E4",
        },
        "&.Mui-focused fieldset": {
            border: "1px solid #0e73f6",
        },
    },
});

export const CustomSelect = styled(Select)({
    width: "100%",
    fontSize: "14px",
    "& fieldset": {
        border: "1px solid #DDE2E4",
    },
    "& .MuiSelect-outlined": {
        padding: "8px",
    },
    "&:hover fieldset": {
        border: "1px solid #DDE2E4",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#DDE2E4",
        borderWidth: "1px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0e73f6",
        borderWidth: "1px",
    },
});

export const CustomAddIcon = styled(IconButton)({
    padding: "4px",
    backgroundColor: "#d7edff",
});
