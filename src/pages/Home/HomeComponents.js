import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const GuideButtonMobile = styled(Button)({
    color: "#252C32",
    backgroundColor: "#FFF",
    fontWeight: "400",
    borderRadius: "6px",
    padding: "2px 24px",
    fontSize: "0.875rem",
    boxShadow:
        "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);",
    "&:hover": {
        backgroundColor: "#f5f5f5",
        color: "#252C32",
    },
});

export const LoginButtonMobile = styled(Button)({
    color: "#F6F8F9",
    backgroundColor: "#4094F7",
    "&:hover": {
        // backgroundColor: "#f5f5f5",
        backgroundColor: "#4094F7",
        color: "#F6F8F9",
    },
    fontWeight: "400",
    borderRadius: "6px",
    padding: "2px 24px",
    fontSize: "0.875rem",
});
