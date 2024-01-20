import DeleteConfirmationDialog from "common/DeleteConfirmation";
import { useState } from "react";
import { useSelector } from "react-redux";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { selectAllDocuments } from "features/documents/documentSlice";
import AddSetupDialog from "features/setups/AllSetups/AddSetupDialog";
import RenameSetupDialog from "features/setups/AllSetups/RenameSetupDialog";
import SetupOptionsDropdown from "features/setups/AllSetups/SetupOptionsDropdown";
import { useUpdateSetupsMutation } from "features/setups/setupsSlice";
import { useDeleteSetupsMutation } from "features/setups/setupsSlice";

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

const AllSetups = () => {
    const [openRenameDialog, setOpenRenameDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [setupId, setSetupId] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (id, event) => {
        setSetupId(id);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setSetupId(null);
        setAnchorEl(null);
    };

    const handleRenameClose = () => {
        setAnchorEl(null);
        setOpenRenameDialog(true);
    };

    const handleDelete = () => {
        setAnchorEl(null);
        setOpenDeleteDialog(true);
    };

    const handleRenameDialogClose = () => {
        setSetupId(null);
        setOpenRenameDialog(false);
    };

    const handleAddDialogClose = () => {
        setOpenAddDialog(false);
    };

    const handleDefault = () => {
        setAnchorEl(null);
        updateSetups({ setupId, isDefault: true });
    };

    const orderedDocuments = useSelector(selectAllDocuments);

    const [deleteSetups] = useDeleteSetupsMutation();
    const [updateSetups] = useUpdateSetupsMutation();

    const populateDocumentSetups = (setups) => {
        return (
            <DocumentGrid container sx={{ mb: 3 }}>
                {setups
                    ? setups.map((setup, id) => (
                          <Grid
                              item
                              key={id}
                              xs={6}
                              lg={4}
                              xl={3}
                              sx={{ backgroundColor: "none" }}
                          >
                              <DocumentItem>
                                  <Box
                                      sx={{
                                          display: "flex",
                                          alignItems: "center",
                                      }}
                                  >
                                      <Box
                                          sx={{
                                              backgroundColor: "white",
                                              p: 1,
                                              borderRadius: "6px",
                                              mr: 2,
                                              border: "1px solid #E5E9EB",
                                          }}
                                      >
                                          <TextSnippetIcon
                                              sx={{ color: "#84919A" }}
                                          />
                                      </Box>
                                      <Box>
                                          <Typography>{setup.name}</Typography>
                                          {setup.isDefault && (
                                              <Typography
                                                  sx={{
                                                      color: "#84919A",
                                                      fontSize: "14px",
                                                  }}
                                              >
                                                  Default
                                              </Typography>
                                          )}
                                      </Box>
                                  </Box>

                                  <IconButton
                                      id="demo-positioned-button"
                                      aria-controls={
                                          open
                                              ? "demo-positioned-menu"
                                              : undefined
                                      }
                                      aria-haspopup="true"
                                      aria-expanded={open ? "true" : undefined}
                                      onClick={(e) => handleClick(setup.id, e)}
                                  >
                                      <MoreHorizIcon
                                          sx={{ color: "#252C32" }}
                                      />
                                  </IconButton>
                              </DocumentItem>
                          </Grid>
                      ))
                    : null}
            </DocumentGrid>
        );
    };

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5">All Versions</Typography>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setOpenAddDialog(true)}
                >
                    Add New Setup
                </Button>
            </Box>
            <Divider sx={{ mt: 2, mb: 4 }} />
            <Box sx={{ flexGrow: 1 }}>
                {orderedDocuments
                    ? orderedDocuments.map((doc, id) => (
                          <Box key={id}>
                              <Box sx={{ mb: 1 }}>
                                  <Typography variant="caption">
                                      {doc.name}
                                  </Typography>
                              </Box>
                              {populateDocumentSetups(doc.setups)}
                          </Box>
                      ))
                    : null}
            </Box>
            <DeleteConfirmationDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onSubmit={() => deleteSetups({ setupId })}
                itemName={"setup"}
            />
            <RenameSetupDialog
                setupId={setupId}
                openRenameDialog={openRenameDialog}
                handleRenameDialogClose={handleRenameDialogClose}
            />
            <AddSetupDialog
                openAddDialog={openAddDialog}
                handleAddDialogClose={handleAddDialogClose}
            />
            <SetupOptionsDropdown
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleRenameClose={handleRenameClose}
                handleDelete={handleDelete}
                handleDefault={handleDefault}
            />
        </Box>
    );
};

export default AllSetups;
