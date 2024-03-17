import { TSMainButton } from "common/CustomComponents";
import DeleteConfirmationDialog from "common/DeleteConfirmation";
import Message from "common/Message";
import Upload from "pages/upload";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import InventoryIcon from "@mui/icons-material/Inventory";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SensorsIcon from "@mui/icons-material/Sensors";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import TemplateSelection from "./TemplateSelection";
import { selectAllDocuments } from "./documentSlice";
import {
    useCloneDocumentMutation,
    useDeleteDocumentMutation,
    useGetDocumentsQuery,
    useRefetchDocumentMutation,
    useRenameDocumentMutation,
} from "./documentSlice";

const DocumentGrid = styled(Grid)({
    backgroundColor: "#F6F8F9",
    border: "1px solid #E5E9EB",
    borderRadius: "6px",
    padding: 2,
});

const DocumentItem = styled(Card)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderRadius: "6px",
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:hover": {
        backgroundColor: "#D7EDFF",
    },
});

const DocumentMenuItem = styled(MenuItem)({
    borderRadius: "6px",
    "&:hover": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
});

const DocumentSource = styled(Typography)({
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "24px",
    color: "#84919A",
});

const AllDocuments = () => {
    let navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [openSelectTemplate, setOpenSelectTemplate] = useState(false);
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);
    const [newName, setNewName] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [openUpload, setOpenUpload] = useState(false);
    const open = Boolean(anchorEl);

    const handleUploadOpen = () => {
        setOpenUpload(true);
    };

    const handleUploadClose = () => {
        setOpenUpload(false);
    };

    const handleClick = (document, event) => {
        setSelectedDocument(document);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setSelectedDocument(null);
        setAnchorEl(null);
    };

    const handleRenameClose = () => {
        setAnchorEl(null);
        setOpenDialog(true);
    };

    const handleSelectTemplateClose = () => {
        setAnchorEl(null);
        setOpenSelectTemplate(true);
    };

    const handleCopyClose = () => {
        cloneDocument({ id: selectedDocument.id });
        setSelectedDocument(null);
        setAnchorEl(null);
    };

    const handleDeleteClose = () => {
        setOpenDeleteDialog(true);
        setAnchorEl(null);
    };

    const handleDialogClose = () => {
        setSelectedDocument(null);
        setNewName("");
        setOpenDialog(false);
    };

    const handleRefetch = () => {
        setAnchorEl(null);
        refetchDocument({ id: selectedDocument.id })
            .unwrap()
            .then((response) => {
                setIsError(!response.success);
                setMsg(response.msg);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleChangeName = () => {
        renameDocument({ id: selectedDocument.id, name: newName });
        setSelectedDocument(null);
        setOpenDialog(false);
    };

    const {
        isLoading,
        isSuccess,
        isError: isFailure,
        error,
    } = useGetDocumentsQuery();

    const orderedDocuments = useSelector(selectAllDocuments);

    const [
        cloneDocument,
        { data: cloneResponse, isSuccess: isCloneSuccess, reset: resetClone },
    ] = useCloneDocumentMutation();
    const [
        renameDocument,
        {
            data: renameResponse,
            isSuccess: isRenameSuccess,
            reset: resetRename,
        },
    ] = useRenameDocumentMutation();
    const [refetchDocument, { isLoading: isFetching }] =
        useRefetchDocumentMutation();
    const [
        deleteDocument,
        { data: deleteResponse, isSuccess: isDeleteSuccess, reset },
    ] = useDeleteDocumentMutation();

    let content;

    if (isLoading) {
        content = <></>;
    } else if (isSuccess) {
        content = orderedDocuments.map((doc, idx) => (
            <Grid
                item
                key={idx}
                xs={12}
                sm={6}
                lg={4}
                xl={3}
                sx={{ backgroundColor: "none" }}
            >
                <DocumentItem
                    sx={{
                        backgroundColor:
                            selectedDocument?.id === doc.id
                                ? "#D7EDFF"
                                : "transparent",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                            sx={{
                                backgroundColor: "white",
                                p: 1,
                                borderRadius: "6px",
                                mr: 2,
                                border: "1px solid #E5E9EB",
                            }}
                        >
                            <InventoryIcon sx={{ color: "#84919A" }} />
                        </Box>
                        <Box>
                            <Typography>{doc.name}</Typography>
                            <DocumentSource>{doc.source}</DocumentSource>
                        </Box>
                    </Box>
                    <IconButton
                        id="demo-positioned-button"
                        aria-controls={
                            open ? "demo-positioned-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(doc, e)}
                    >
                        <MoreHorizIcon sx={{ color: "#252C32" }} />
                    </IconButton>
                </DocumentItem>
            </Grid>
        ));
    } else if (isFailure) {
        content = <p>{error}</p>;
    }

    if (isDeleteSuccess) {
        setIsError(isDeleteSuccess.success);
        setMsg(deleteResponse.msg);
        reset();
    }

    if (isRenameSuccess) {
        setIsError(isRenameSuccess.success);
        setMsg(renameResponse.msg);
        resetRename();
    }

    if (isCloneSuccess) {
        setIsError(isCloneSuccess.success);
        setMsg(cloneResponse.msg);
        resetClone();
    }

    return (
        <Box>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 25,
                        LineHeight: 30,
                        letterSpacing: "-0.6px",
                    }}
                >
                    All Accounts
                </Typography>
                <Box>
                    <TSMainButton
                        variant="contained"
                        component={Link}
                        to="/files/create"
                        sx={{ mr: 2 }}
                    >
                        Create Manually
                    </TSMainButton>
                    <TSMainButton
                        variant="contained"
                        onClick={handleUploadOpen}
                    >
                        Upload New Document
                    </TSMainButton>
                </Box>
            </Box>
            {msg && (
                <Message
                    message={msg}
                    setMessage={setMsg}
                    isError={isError}
                    sx={{ my: 1 }}
                />
            )}
            <Box sx={{ flexGrow: 1 }}>
                {content.length > 0 && (
                    <DocumentGrid container>{content}</DocumentGrid>
                )}
            </Box>
            <Dialog open={isFetching}>
                <Box
                    sx={{
                        background: "#F6F8F9",
                        borderRadius: "8px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            color: "#5B6871",
                            p: 4,
                        }}
                    >
                        <Typography sx={{ mb: 5 }}>
                            Please wait. This might take a few minutes.
                        </Typography>
                        <CircularProgress size={80} sx={{ mb: 1 }} />
                    </Box>
                </Box>
            </Dialog>
            <Upload open={openUpload} onClose={handleUploadClose} />

            <DeleteConfirmationDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onSubmit={() => {
                    deleteDocument({ id: selectedDocument.id });
                    setSelectedDocument(null);
                }}
                itemName={"document"}
            />

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ color: "inherit" }}>
                    <Typography variant="h5" sx={{ mt: 1 }}>
                        Rename File
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: "14px" }}>
                        To change the name of the current file write the new
                        name for this document:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        value={newName}
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ mb: 1, px: 3 }}>
                    <Button onClick={handleDialogClose} variant="text">
                        Cancel
                    </Button>
                    <Button onClick={handleChangeName} variant="contained">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
            <TemplateSelection
                open={openSelectTemplate}
                handleCloseDialog={() => setOpenSelectTemplate(false)}
                document={selectedDocument}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                autoFocus={false}
                elevation={0}
                sx={{
                    list: { padding: 0 },
                    "& .MuiPaper-root": {
                        border: "1px solid #DDE2E4",
                    },
                }}
            >
                <DocumentMenuItem onClick={handleRenameClose}>
                    <ListItemIcon sx={{ minWidth: "30px !important" }}>
                        <DriveFileRenameOutlineRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Rename</ListItemText>
                </DocumentMenuItem>
                <DocumentMenuItem
                    onClick={() => navigate("update/" + selectedDocument.id)}
                >
                    <ListItemIcon sx={{ minWidth: "30px !important" }}>
                        <UpdateRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Update</ListItemText>
                </DocumentMenuItem>
                <DocumentMenuItem
                    onClick={() =>
                        navigate("/account/modify/" + selectedDocument.id)
                    }
                >
                    <ListItemIcon sx={{ minWidth: "30px !important" }}>
                        <TuneRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Modify</ListItemText>
                </DocumentMenuItem>
                {/* {selectedDocument?.source === "MT4 API" && (
                    <DocumentMenuItem onClick={handleRefetch}>
                        <ListItemIcon sx={{ minWidth: "30px !important" }}>
                            <SensorsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Sync MetaTrader</ListItemText>
                    </DocumentMenuItem>
                )} */}
                <DocumentMenuItem onClick={handleSelectTemplateClose}>
                    <ListItemIcon sx={{ minWidth: "30px !important" }}>
                        <ContentPasteSearchRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Select Template</ListItemText>
                </DocumentMenuItem>
                <DocumentMenuItem onClick={handleCopyClose}>
                    <ListItemIcon sx={{ minWidth: "30px !important" }}>
                        <FileCopyRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                </DocumentMenuItem>
                <DocumentMenuItem onClick={handleDeleteClose}>
                    <ListItemIcon sx={{ minWidth: "30px !important" }}>
                        <DeleteRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </DocumentMenuItem>
            </Menu>
        </Box>
    );
};

export default AllDocuments;
