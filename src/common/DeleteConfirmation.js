import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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
                <Typography variant="h5" component="div">
                    Delete
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2" gutterBottom>
                    Are you sure you want to delete this {itemName || "item"}?
                </Typography>
                <Typography variant="body2">
                    This process cannot be undone.
                </Typography>
                <DialogActions sx={{ mt: 2 }}>
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
            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
