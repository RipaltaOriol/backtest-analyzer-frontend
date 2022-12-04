import "./Analysis.css";

import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import SetupView from "../../features/setups/SetupView";
import SetupData from "../../features/setups/SetupData";
import SetupFilter from "../../features/setups/SetupFilter";
import SetupDropdown from "../../features/setups/SetupDropdown";
import { selectDefaultSetup, selectSetupsByDocument, selectSetupOnId } from "../../features/setups/setupsSlice";
import { useGetSetupsQuery } from "../../features/setups/setupsSlice";
import { useDownloadPDFFileMutation } from '../../features/pdfs/pdfsSlice';
import { selectDocumentById } from "../../features/documents/documentSlice";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";


import { styled } from '@mui/system';

const MenuButton = styled(Button)({
  color: '#252C32',
  backgroundColor: "#fff",
  border: '1px solid #DDE2E4',
  padding: '4px 12px',
  textTransform: 'none',
  borderRadius: '6px',
})

const SetupMenuItem = styled(MenuItem)({
  borderRadius: '6px',
  '&:hover': {
      color: '#0E73F6',
      backgroundColor: '#D7EDFF',
  },
})

const Analysis = ({ hahaT = 'Hello' }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const { documentId } = useParams();
  const location = useLocation();
  const { setup } = location.state || {};

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

  const [downloadPDFFile] = useDownloadPDFFileMutation()

  const document = useSelector((state) => selectDocumentById(state, documentId));

  useEffect(() => {}, [currentSetup])

  return (
    <Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">
          {document ? document?.name : 'Loading'}
        </Typography>
        <Box>
          <MenuButton
            color='secondary'
            sx={{ ml: 1 }}
            startIcon={<ArrowUpwardRoundedIcon
            sx={{ color: "#5B6871" }} />}
            onClick={() => downloadPDFFile({setupId: currentSetup?.id, name: currentSetup?.name})}
          >
            Export
          </MenuButton>
          
          <SetupFilter setup={actualSetup ? actualSetup : defaultSetup} />
          <Button
            color='primary'
            variant='contained'
            component={Link}
            to='/setups'
            sx={{ ml: 1 }}
            startIcon={<ViewColumnRoundedIcon />}
          >
            Manage
          </Button>
          <MenuButton
            color='secondary'
            sx={{ ml: 1 }}
            component={Link}
            to={`/${documentId}/compare`}
            startIcon={<CompareArrowsRoundedIcon sx={{ color: "#5B6871" }} />}
          >
            Compare
          </MenuButton>
          <SetupDropdown defaultSetup={defaultSetup} setups={setupsByDocument} changeSetup={setCurrentSetup} />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      {/* <Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #DDE2E4', borderRadius: '6px', width: 'fit-content', padding: '4px 4px 4px 12px'}}>
          <Typography>
            Filter
          </Typography>
          &nbsp;
          <Typography>
            RR greater than 1.5
          </Typography>
          <IconButton sx={{ py: 0 }}>
            <CloseRoundedIcon sx={{ color: '#F76659' }} />
          </IconButton>
        </Box>
      </Stack> */}

      {/* <SetupData setup={currentSetup ? currentSetup : defaultSetup} /> */}
      {/* <SetupView setup={actualSetup ? actualSetup : defaultSetup}/> */}

      {/* <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
        <Typography variant="h1" color="primary" sx={{ mr: 2 }}>
          {document ? document?.name : 'Loading'}
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setIsSetupView(!isSetupView)}
        >
          { isSetupView ? 'Charts & Data' : 'General View'}
        </Button> */}
        {/* setups dropdown */}
        {/* <Box sx={{ ml: "auto" }}>
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
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={"/" + documentId + "/compare"}
          >
            Compare
          </Button>

        </Box>
      </Box>
      <Divider />
      <Typography sx={{ my: 0.5 }} variant='h6'>{currentSetup ? currentSetup?.name : defaultSetup?.name}</Typography> */}

      { isSetupView ? (
        <SetupView setup={actualSetup ? actualSetup : defaultSetup}/>
      ) : (
        <SetupData setup={currentSetup ? currentSetup : defaultSetup} />
      )}
      
    </Box>
  );
};

export default Analysis;
