import Alert from "@mui/material/Alert";

export const ErrorFeedback = ({ msg }) => {
    return (
        <Alert severity="error">{msg || "Not enough data to display :("}</Alert>
    );
};
