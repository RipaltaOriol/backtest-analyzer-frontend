import {
    TSBackButton,
    TSMainButton,
    TSTextFieldStandard,
} from "common/CustomComponents";
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
        <Dialog
            open={openAddDialog}
            onClose={handleAddDialogClose}
            maxWidth="sm"
            fullWidth
            sx={{
                ".MuiDialog-paper": {
                    borderRadius: "10px",
                    p: 1,
                },
            }}
        >
            <DialogTitle sx={{ color: "inherit" }}>
                <Typography
                    component="div"
                    sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "-0.6px",
                    }}
                >
                    Add New Version
                </Typography>
            </DialogTitle>
            <DialogContent>
                {documentId == null && (
                    <>
                        <DialogContentText sx={{ fontSize: "14px", mb: 1 }}>
                            Indicate for which account is this version and what
                            name should it have:
                        </DialogContentText>
                        <DropdownButton
                            sx={{ p: 1 }}
                            variant="text"
                            onClick={handleClick}
                        >
                            <DocumentPlaceholder>
                                Account:&nbsp;
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
                                          key={id}
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
                <TSTextFieldStandard
                    id="name"
                    label="Name"
                    value={name}
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <TSBackButton onClick={handleAddDialogClose} variant="text">
                    Cancel
                </TSBackButton>
                <TSMainButton onClick={handleAddSetup} variant="contained">
                    Apply
                </TSMainButton>
            </DialogActions>
        </Dialog>
    );
};

export default AddSetupDialog;
