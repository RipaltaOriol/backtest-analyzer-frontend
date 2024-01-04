import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

const DeleteConfirmationDialog = ({
    open,
    onClose,
    onSubmit,
    itemName = null,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography variant="h5">Delete</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography gutterBottom>
                        Are you sure you want to delete this{" "}
                        {itemName || "item"}?
                    </Typography>
                    <Typography>This process cannot be undone.</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        if (onSubmit) onSubmit();
                        onClose();
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
