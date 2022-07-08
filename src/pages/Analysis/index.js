import "./Analysis.css";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import FilterList from "./FilterList";
import FilterOptions from "./FilterOptions";
import SetupView from "../../features/setups/SetupView";
import SetupDropdown from "../../features/setups/SetupDropdown";

import { selectSetupName } from "../../features/setups/setupSlice";
import { selectDocumentById } from "../../features/documents/documentsApiSlice";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";



const Analysis = () => {

  const navigate = useNavigate();

  const { documentId } = useParams();

  const [open, setOpen] = useState(false);

  const setupName = useSelector(selectSetupName);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doc = useSelector((state) => selectDocumentById(state, documentId));

  let documentName = "Loading";
  if (doc) {
    documentName = doc.name;
  }

  const handleManageSetups = () => {
    navigate("/" + documentId + "/setups");
  }

  const handleChartsNData = () => {
    navigate("/" + documentId + "/statistics")
  }

  return (
    <Box>
      <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
        <Typography variant="h1" color="primary" sx={{ mr: 2 }}>
          {documentName}
        </Typography>
        <ButtonGroup color="secondary" variant="contained">
          <Button onClick={() => handleChartsNData()}>Charts &#38; Data</Button>
          <Button onClick={() => handleManageSetups()}>Manage Setups</Button>
        </ButtonGroup>
        {/* setups dropdown */}
        <Box sx={{ ml: "auto" }}>
          <SetupDropdown />
        </Box>
      </Box>
      
      <Divider />
      <Typography variant='h6'>{setupName}</Typography>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ButtonGroup variant="contained">
          <Button disabled>Toggle Tables</Button>
          <Button>Toggle Notes</Button>
          <Button>Toggle Images</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained">
            <Button onClick={handleClickOpen}>Filter</Button>
            <Button>Export Imgs</Button>
            <Button>Export All</Button>
        </ButtonGroup>
      </Box>
      <FilterOptions open={open} handleClose={handleClose}/>
      <Box sx={{ my: 2 }}>
        <FilterList />
        <SetupView />
      </Box>
    </Box>
  );
};

export default Analysis;
