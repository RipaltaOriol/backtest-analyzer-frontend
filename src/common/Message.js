import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

const Message = ({ message, setMessage, isError, sx }) => {
    const [open, setOpen] = useState(false);
    const alertType = isError ? "error" : "success";

    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);

    return (
        <Collapse in={open} sx={sx}>
            <Alert
                severity={alertType}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                            setMessage("");
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Collapse>
    );
};

export default Message;
