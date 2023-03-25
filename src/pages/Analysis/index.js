import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import AddSetupDialog from "features/setups/AllSetups/AddSetupDialog";

import { selectDocumentById } from "../../features/documents/documentSlice";
import { useDownloadPDFFileMutation } from "../../features/pdfs/pdfsSlice";
import SetupDropdown from "../../features/setups/SetupDropdown";
import SetupFilter from "../../features/setups/SetupFilter";
import SetupView from "../../features/setups/SetupView";
import {
    selectDefaultSetup,
    selectSetupOnId,
    selectSetupsByDocument,
} from "../../features/setups/setupsSlice";
import { useGetSetupsQuery } from "../../features/setups/setupsSlice";
import "./Analysis.css";

const MenuButton = styled(Button)({
    color: "#252C32",
    backgroundColor: "#fff",
    border: "1px solid #DDE2E4",
    padding: "4px 12px",
    textTransform: "none",
    borderRadius: "6px",
});

const CustomIconMenuButton = styled(IconButton)({
    color: "#252C32",
    backgroundColor: "#fff",
    border: "1px solid #DDE2E4",
    padding: "4px 4px",
    textTransform: "none",
    borderRadius: "6px",
});

const Analysis = () => {
    const { documentId } = useParams();

    const [currentSetup, setCurrentSetup] = useState();
    const [openAddSetup, setOpenAddSetup] = useState(false);

    // NOTE: handle Errors
    const { setupsByDocument, defaultSetup, actualSetup } = useGetSetupsQuery(
        undefined,
        {
            selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
                setupsByDocument: selectSetupsByDocument(data, documentId),
                defaultSetup: selectDefaultSetup(data, documentId),
                actualSetup: selectSetupOnId(data, currentSetup?.id),
                isLoading,
                isError,
                isSuccess,
            }),
        }
    );

    const [downloadPDFFile] = useDownloadPDFFileMutation();

    const document = useSelector((state) =>
        selectDocumentById(state, documentId)
    );

    useEffect(() => {}, [currentSetup]);

    const handleAddDialogClose = () => {
        setOpenAddSetup(false);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h5">
                    {document ? document?.name : "Loading"}
                </Typography>
                <Box>
                    <Tooltip
                        title="If your table has a lot of columns the PDF might fail to capture them properly"
                        placement="top"
                        arrow
                    >
                        <MenuButton
                            color="secondary"
                            sx={{ ml: 1 }}
                            startIcon={
                                <ArrowUpwardRoundedIcon
                                    sx={{ color: "#5B6871" }}
                                />
                            }
                            onClick={() =>
                                downloadPDFFile({
                                    setupId: currentSetup?.id,
                                    name: currentSetup?.name,
                                })
                            }
                        >
                            Export
                        </MenuButton>
                    </Tooltip>
                    <SetupFilter
                        setup={actualSetup ? actualSetup : defaultSetup}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        component={Link}
                        to="/setups"
                        sx={{ ml: 1 }}
                        startIcon={<ViewColumnRoundedIcon />}
                    >
                        Manage
                    </Button>
                    <MenuButton
                        color="secondary"
                        sx={{ ml: 1 }}
                        component={Link}
                        to={`/${documentId}/compare`}
                        startIcon={
                            <CompareArrowsRoundedIcon
                                sx={{ color: "#5B6871" }}
                            />
                        }
                    >
                        Compare
                    </MenuButton>
                    <SetupDropdown
                        defaultSetup={defaultSetup}
                        setups={setupsByDocument}
                        changeSetup={setCurrentSetup}
                    />
                    <CustomIconMenuButton
                        sx={{ ml: 1 }}
                        onClick={() => setOpenAddSetup(true)}
                    >
                        <AddRoundedIcon />
                    </CustomIconMenuButton>
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

            <SetupView setup={actualSetup ? actualSetup : defaultSetup} />
            {/* <SetupData setup={currentSetup ? currentSetup : defaultSetup} /> */}
            <AddSetupDialog
                openAddDialog={openAddSetup}
                handleAddDialogClose={handleAddDialogClose}
                documentId={documentId}
            />
        </Box>
    );
};

export default Analysis;
