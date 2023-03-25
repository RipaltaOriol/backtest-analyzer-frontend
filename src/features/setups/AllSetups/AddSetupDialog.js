import { useState } from "react";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { selectAllDocuments } from "features/documents/documentSlice";
import { useAddSetupsMutation } from "features/setups/setupsSlice";

const DropdownButton = styled(Button)({
    justifyContent: "left",
    width: "100%",
    background: "#D7EDFF",
    "&:hover": {
        backgroundColor: "#D7EDFF",
    },
});

const DropdownMenuItem = styled(MenuItem)({
    borderRadius: "6px",
    "&:hover": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
});

const DocumentPlaceholder = styled("span")({
    color: "#5B6871",
});

const AddSetupDialog = ({
    openAddDialog,
    handleAddDialogClose,
    documentId = null,
}) => {
    const [name, setName] = useState("");
    const [document, setDocument] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const [addSetups] = useAddSetupsMutation();

    const orderedDocuments = useSelector(selectAllDocuments);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectDocument = ({ id, name }) => {
        setAnchorEl(null);
        setDocument({ id, name });
    };

    const handleAddSetup = () => {
        if ((document?.id === undefined && documentId === null) || name === "")
            return;

        if (documentId !== null) {
            addSetups({ document: documentId, name });
        } else {
            addSetups({ document: document.id, name });
        }

        setName("");
        setDocument(null);
        handleAddDialogClose();
    };

    return (
        <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
            <DialogTitle sx={{ color: "inherit" }}>
                <Typography variant="h5" sx={{ mt: 1 }}>
                    Add New Setup
                </Typography>
            </DialogTitle>
            <DialogContent>
                {documentId == null && (
                    <>
                        <DialogContentText sx={{ fontSize: "14px", mb: 1 }}>
                            Indicate for which document is this setup and what
                            name should it have:
                        </DialogContentText>
                        <DropdownButton
                            sx={{ p: 1 }}
                            variant="text"
                            onClick={handleClick}
                        >
                            <DocumentPlaceholder>
                                Document:&nbsp;
                            </DocumentPlaceholder>
                            {document ? document?.name : "None"}
                        </DropdownButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            autoFocus={false}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            {orderedDocuments
                                ? orderedDocuments.map(({ id, name }) => (
                                      <DropdownMenuItem
                                          onClick={() =>
                                              handleSelectDocument({ id, name })
                                          }
                                      >
                                          {name}
                                      </DropdownMenuItem>
                                  ))
                                : null}
                        </Menu>
                    </>
                )}
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
                <Button onClick={handleAddDialogClose} variant="text">
                    Cancel
                </Button>
                <Button onClick={handleAddSetup} variant="contained">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddSetupDialog;
