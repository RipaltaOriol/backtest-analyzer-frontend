import { useState } from "react";

import {
    useUpdateSetupsMutation,
} from 'features/setups/setupsSlice';

import Dialog from "@mui/material/Dialog";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const RenameSetupDialog = ({ setupId, openRenameDialog, handleRenameDialogClose }) => {

    const [name, setName] = useState("");
    const [updateSetups] = useUpdateSetupsMutation()


    const handleChangeName = () => {
        updateSetups({ setupId, name });
        setName("");
        handleRenameDialogClose();
    };

    return (
        <Dialog open={openRenameDialog} onClose={handleRenameDialogClose}>
            <DialogTitle sx={{ color: 'inherit' }}>
                <Typography variant="h5" sx={{ mt: 1 }}>
                    Rename Setup
                </Typography>
            </DialogTitle>
            <DialogContent>
            <DialogContentText sx={{ fontSize: '14px' }}>
                To change the name of the current setup write the new name for this
                setup:
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                value={name}

                fullWidth
                variant="standard"
                onChange={(e) => setName(e.target.value)}
            />
            </DialogContent>
            <DialogActions sx={{ mb: 1, px: 3 }}>
                <Button onClick={handleRenameDialogClose} variant="text">Cancel</Button>
                <Button onClick={handleChangeName} variant="contained">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RenameSetupDialog;