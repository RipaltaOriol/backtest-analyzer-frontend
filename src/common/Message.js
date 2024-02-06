import { useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Message = ({ message, setMessage, isError, sx }) => {
    const [open, setOpen] = useState(false);
    const alertType = isError ? "error" : "success";

    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);

    const handleClose = () => {
        setOpen(false);
        setMessage("");
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            autoHideDuration={5000}
        >
            <Alert severity={alertType} onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Message;
