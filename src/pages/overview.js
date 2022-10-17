import { useState } from "react";
import { useSelector } from "react-redux";

import {
  useGetDocumentsQuery,
  useCloneDocumentMutation,
  useRenameDocumentMutation,
  useDeleteDocumentMutation,
} from "../features/documents/documentsApiSlice";
import { selectAllDocuments } from "../features/documents/documentsApiSlice";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DialogContentText from "@mui/material/DialogContentText";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const Overview = () => {

  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [documentId, setDocumentId] = useState("");

  const { isSuccess, isError } = useGetDocumentsQuery();

  const orderedDocuments = useSelector(selectAllDocuments);

  const [cloneDocument] = useCloneDocumentMutation();
  const [renameDocument] = useRenameDocumentMutation();
  const [deleteDocument] = useDeleteDocumentMutation();
  

  // Handles start of rename logic
  const handleClickOpen = (id) => {
    setDocumentId(id);
    setNewName('');
    setOpen(true);
  };

  // Handles rename running logic
  const handleClose = () => {
    setDocumentId('');
    setNewName('');
    setOpen(false);
  };

  const handleChangeName = () => {
    renameDocument({ id: documentId, name: newName });
    setOpen(false);
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
  
    </Box>
  );
};

export default Overview;
