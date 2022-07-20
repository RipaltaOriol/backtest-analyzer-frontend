import "./Analysis.css";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SetupView from "../../features/setups/SetupView";
import SetupData from "../../features/setups/SetupData";
import SetupDropdown from "../../features/setups/SetupDropdown";
import { selectDefaultSetup, selectSetupsByDocument, selectSetupOnId } from "../../features/setups/setupsSlice";
import { useGetSetupsQuery } from "../../features/setups/setupsSlice";

import { selectDocumentById } from "../../features/documents/documentsApiSlice";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const Analysis = () => {

  const { documentId } = useParams();

  const [currentSetup, setCurrentSetup] = useState();
  const [isSetupView, setIsSetupView] = useState(true);


  // NOTE: handle Errors
  const {
    setupsByDocument,
    defaultSetup,
    actualSetup,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSetupsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
      setupsByDocument: selectSetupsByDocument(data, documentId),
      defaultSetup: selectDefaultSetup(data, documentId),
      actualSetup: selectSetupOnId(data, currentSetup?.id),
      isLoading,
      isError,
      isSuccess,
    }),
  })

  const document = useSelector((state) => selectDocumentById(state, documentId));

  useEffect(() => { }, [currentSetup])

  return (
    <Box>
      <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
        <Typography variant="h1" color="primary" sx={{ mr: 2 }}>
          {document ? document?.name : 'Loading'}
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setIsSetupView(!isSetupView)}
        >
          { isSetupView ? 'Charts & Data' : 'General View'}
        </Button>
        {/* setups dropdown */}
        <Box sx={{ ml: "auto" }}>
          <SetupDropdown defaultSetup={defaultSetup} setups={setupsByDocument} changeSetup={setCurrentSetup} />
          <Button
            sx={{ mx: 1 }}
            color="secondary"
            variant="contained"
            component={Link}
            to={"/" + documentId + "/setups"}
          >
            Manage
          </Button>

        </Box>
      </Box>
      <Divider />
      <Typography sx={{ my: 0.5 }} variant='h6'>{currentSetup ? currentSetup?.name : defaultSetup?.name}</Typography>

      { isSetupView ? (
        <SetupView setup={actualSetup ? actualSetup : defaultSetup}/>
      ) : (
        <SetupData setup={currentSetup ? currentSetup : defaultSetup} />
      )}
      
    </Box>
  );
};

export default Analysis;
