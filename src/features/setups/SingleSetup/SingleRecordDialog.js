import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

function SingleRecordDialog({ open, onClose, rowRecord }) {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
        </Dialog>
    );
}

export default SingleRecordDialog;
