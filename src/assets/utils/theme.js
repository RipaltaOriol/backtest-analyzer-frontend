import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    width: "100%",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: "10%",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#EBECED",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#F6F8F9",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                },
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { color: "primary", variant: "contained" },
                    style: {
                        backgroundColor: "#4094F7",
                        textTransform: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                        borderRadius: "6px",
                        padding: "4px 12px",
                        "&:hover": {
                            color: "#fff",
                        },
                    },
                },
                {
                    props: { color: "primary", variant: "text" },
                    style: {
                        fontSize: "14px",
                        textTransform: "none",
                    },
                },
                {
                    props: { color: "secondary" },
                    style: {
                        color: "#252C32",
                        textTransform: "none",
                        border: "1px solid #DDE2E4",
                        borderRadius: "6px",
                        padding: "4px 12px",
                        "&:hover": {
                            color: "inherit",
                            backgroundColor: "#f0f0f0",
                        },
                    },
                },
            ],
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    "& .MuiPaper-root": {
                        padding: "5px",
                    },
                },
                list: {
                    padding: 0,
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: "#b4caf0",
                    },
                    "&:focus": {
                        backgroundColor: "#b4caf0",
                    },
                    "&.Mui-selected": {
                        backgroundColor: "inherit",
                        "&:hover": {
                            color: "#0E73F6",
                            backgroundColor: "#D7EDFF",
                        },
                    },
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: 0,
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    "&:last-child td": {
                        borderBottom: "none",
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        color: "#000000de",
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#D7EDFF",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#D7EDFF",
                        },
                        "& .MuiListItemText-root .MuiTypography-root": {
                            color: "#0E73F6",
                            fontWeight: "600",
                        },
                        "& .MuiListItemIcon-root": {
                            color: "#0E73F6",
                        },
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                    ".MuiFormControlLabel-label": {
                        fontSize: "14px",
                    },
                },
            },
        },
    },
    typography: {
        fontFamily: "Inter",
        fontWeightLight: "300",
        fontWeightRegular: "400",
        fontWeightMedium: "500",
        fontWeightBold: "700",
        h1: {
            color: "#fff",
            fontSize: "3.5rem",
            fontWeight: "700",
            lineHeight: "64px",
            letterSpacing: "-0.02em",
        },
        h2: {
            color: "#252C32",
            fontWeight: 600,
            fontSize: "32px",
        },
        h3: {
            fontSize: "36px",
        },
        h4: {
            fontSize: "1.5rem",
            fontWeight: "600",
        },
        h5: {
            color: "#5B6871",
            fontSize: "20px",
            fontWeight: "700",
            lineHeight: "32px",
        },
        h6: {
            fontSize: "18px",
            fontWeight: "400",
        },
        subtitle1: {
            fontWeight: "600",
            textTransform: "uppercase",
        },
        subtitle2: {
            fontSize: "14px",
            fontWeight: "800",
        },
        subtitle3: {
            fontWeight: "600",
            lineHeight: "24px",
        },
        body2: {
            fontSize: "16px",
            color: "#5B6871",
        },
        overline: {
            color: "#2b61ff",
            fontSize: "16px",
            lineHeight: "24px",
        },
        caption: {
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "24px",
            background: "#D7EDFF",
            borderRadius: "6px",
            padding: "4px 8px",
        },
    },
    palette: {
        primary: {
            main: "#0E73F6",
        },
        secondary: {
            main: "#e8920b",
            constrastText: "#fff",
        },
        action: {
            selectedOpacity: 0.8,
        },
    },
});

export default theme;
