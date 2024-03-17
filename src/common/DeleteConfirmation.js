import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";

import { TSBackButton, TSDangerButton } from "./CustomComponents";

const DeleteConfirmationDialog = ({
    open,
    onClose,
    onSubmit,
    itemName = null,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 22,
                        lineHeight: "30px",
                        letterSpacing: "-0.6px",
                    }}
                    component="div"
                    gutterBottom
                >
                    Delete
                </Typography>
                <Typography>
                    Are you sure you want to delete this {itemName || "item"}?
                </Typography>
                <Typography>This process cannot be undone.</Typography>
            </DialogContent>
            <DialogActions>
                <TSBackButton onClick={onClose}>Cancel</TSBackButton>
                <TSDangerButton
                    onClick={() => {
                        if (onSubmit) onSubmit();
                        onClose();
                    }}
                >
                    Delete
                </TSDangerButton>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
