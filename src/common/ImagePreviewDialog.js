import Dialog from "@mui/material/Dialog";

const ImagePreviewDialog = ({ url, open, close }) => {
    return (
        <Dialog open={open} onClose={close} maxWidth="xl">
            {/* Use redux instad and pass the alt text */}
            <img src={url} alt="Some Text" />
        </Dialog>
    );
};

export default ImagePreviewDialog;
