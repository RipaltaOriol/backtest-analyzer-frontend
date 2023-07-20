import { useState } from "react";

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

import { useGetUserSettingsQuery } from "features/auth/authApiSlice";
import { useAssignDocumentTemplateMutation } from "features/documents/documentSlice";

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

const TemplateSelection = ({ open, handleCloseDialog, document }) => {
    const { data } = useGetUserSettingsQuery();
    const [assignDocumentTemplate] = useAssignDocumentTemplateMutation();

    const [documentTemplate, setDocumentTemplate] = useState({});
    const [anchorDropdown, setAnchorDropdown] = useState(null);

    const menuOpen = Boolean(anchorDropdown);
    const handleClick = (event) => {
        setAnchorDropdown(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorDropdown(null);
        handleCloseDialog();
        setDocumentTemplate({});
    };

    const handleCloseDropdown = () => {
        setAnchorDropdown(null);
    };

    const handleChangeTempalte = ({ id, name }) => {
        setAnchorDropdown(null);
        setDocumentTemplate({ id, name });
    };

    const handleApplyTemplate = () => {
        setAnchorDropdown(null);
        handleCloseDialog();
        assignDocumentTemplate({
            documentId: document?.id,
            templateId: documentTemplate?.id,
        });
        setDocumentTemplate({});
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ color: "inherit" }}>
                <Typography variant="h5" sx={{ mt: 1 }}>
                    Select Account Template
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText gutterBottom sx={{ fontSize: "14px" }}>
                    Indicate which tempalte you want this account to use:
                </DialogContentText>
                <DropdownButton
                    sx={{ p: 1 }}
                    variant="text"
                    onClick={handleClick}
                >
                    <DocumentPlaceholder>Template:&nbsp;</DocumentPlaceholder>
                    {documentTemplate.name ||
                        document?.template?.name ||
                        "Default"}
                </DropdownButton>
                <Menu
                    anchorEl={anchorDropdown}
                    open={menuOpen}
                    onClose={handleCloseDropdown}
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
                    {data
                        ? data.templates.map(({ name, id }) => (
                              <DropdownMenuItem
                                  onClick={() =>
                                      handleChangeTempalte({ id, name })
                                  }
                              >
                                  {name}
                              </DropdownMenuItem>
                          ))
                        : null}
                </Menu>
                <Typography
                    sx={{ mt: 2, mb: 0, fontSize: "14px", color: "red" }}
                >
                    WARNING: Changing template will result is the loss of work
                    done in the current template.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ mb: 1, px: 3 }}>
                <Button onClick={handleClose} variant="text">
                    Cancel
                </Button>
                <Button onClick={handleApplyTemplate} variant="contained">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TemplateSelection;
