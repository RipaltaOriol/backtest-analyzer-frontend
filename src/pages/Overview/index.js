import useDocuments from "../../hooks/useDocuments";
import useDocument from "../../hooks/useDocument";
import FileList from "../../components/FileList";
import RichDataTable from "../../components/DataTable";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { documentCopied } from "../../features/documents/documentsSlice";
import { nanoid } from "@reduxjs/toolkit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import {
  useGetDocumentsQuery,
  useCloneDocumentMutation,
  useRenameDocumentMutation,
  useDeleteDocumentMutation,
} from "../../features/documents/documentsApiSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { selectAllDocuments } from "../../features/documents/documentsApiSlice";
// import { selectAllDocuments } from '../../features/documents/documentsApiSlice';

const Overview = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [newName, setNewName] = useState("");

  const { isLoading, isSuccess, isError, error } = useGetDocumentsQuery();

  const orderedDocuments = useSelector(selectAllDocuments);

  const [cloneDocument] = useCloneDocumentMutation();
  const [renameDocument] = useRenameDocumentMutation();
  const [deleteDocument] = useDeleteDocumentMutation();
  // const { documents, setIsDocumentUpload } = useDocuments()
  // const { documentData, documentColumns, setDocument } = useDocument()

  const handleClickOpen = (id) => {
    setDocumentId(id);
    setNewName("");
    setOpen(true);
  };

  const handleClose = () => {
    setDocumentId("");
    setNewName("");
    setOpen(false);
  };

  const handleChangeName = () => {
    renameDocument({ id: documentId, name: newName });
    setOpen(false);
  };

  const onCopiedPostClick = (name) => {
    dispatch(documentCopied(name));
  };

  let content = <p>Loading...</p>;
  if (isSuccess) {
    content = orderedDocuments.map((doc) => (
      <ListItem sx={{ pl: 0 }}>
        <ListItemAvatar>
          <Avatar>
            <InsertDriveFileIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={doc.name} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => handleClickOpen(doc.id)}
            edge="end"
            aria-label="rename"
            sx={{ ml: 2 }}
          >
            <DriveFileRenameOutlineIcon />
          </IconButton>
          <IconButton
            onClick={() => cloneDocument({ id: doc.id })}
            edge="end"
            aria-label="copy"
            sx={{ ml: 2 }}
          >
            <ContentCopyIcon />
          </IconButton>
          <IconButton
            onClick={() => deleteDocument({ id: doc.id })}
            edge="end"
            aria-label="delete"
            sx={{ ml: 2 }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  } else if (isError) {
    <p>Error</p>;
  }

  return (
    <Box>
      <Grid item>
        <Typography variant="h1" color="primary">
          Documents Overview
        </Typography>
        <List dense={true}>{content}</List>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rename File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change the name of the current file write the new name for this
            document:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangeName} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      {/* <FileUpload updateDocuments={setIsDocumentUpload} />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={3}>
          <FileList heading='File List' files={documents} changeFile={setDocument} />
        </Grid>
        <Grid item xs={9}>
          <RichDataTable selectRow={() => false} tableData={documentData} tableColumns={documentColumns} />
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default Overview;
