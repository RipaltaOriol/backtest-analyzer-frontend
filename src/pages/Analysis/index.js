import { TSMainButton } from "common/CustomComponents";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import IsoIcon from "@mui/icons-material/Iso";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { setError, setMessage } from "features/messages/messagesSlice";
import AddSetupDialog from "features/setups/AllSetups/AddSetupDialog";
import { useAddTradeMutation } from "features/trades/tradeAPISlice";
import { setOpen, setTrade } from "features/trades/tradeSlice";

import { selectDocumentById } from "../../features/documents/documentSlice";
import { useDownloadPDFFileMutation } from "../../features/pdfs/pdfsSlice";
import SetupDropdown from "../../features/setups/SetupDropdown";
import SetupFilter from "../../features/setups/SetupFilter";
import SetupView from "../../features/setups/SetupView";
import {
    selectDefaultSetup,
    selectProvidedSetup,
    selectSetupOnId,
    selectSetupsByDocument,
} from "../../features/setups/setupsSlice";
import { useGetSetupsQuery } from "../../features/setups/setupsSlice";
import "./Analysis.css";

const MenuButton = styled(Button)({
    color: "#252C32",
    backgroundColor: "#fff",
    border: "1px solid #DDE2E4",
    px: 2,
    py: 1,
    textTransform: "none",
    borderRadius: "10px",
});

const CustomIconMenuButton = styled(IconButton)({
    color: "#252C32",
    backgroundColor: "#fff",
    border: "1px solid #DDE2E4",
    p: 1,
    borderRadius: "10px",
    textTransform: "none",
    "& .MuiTouchRipple-root .MuiTouchRipple-child": {
        borderRadius: "6px",
    },
});

const Analysis = () => {
    const { documentId } = useParams();
    const { state } = useLocation();
    const [currentSetup, setCurrentSetup] = useState();
    const [openAddSetup, setOpenAddSetup] = useState(false);

    const [addTrade] = useAddTradeMutation();
    const dispatch = useDispatch();

    // NOTE: handle Errors
    const { setupsByDocument, defaultSetup, providedSetup, actualSetup } =
        useGetSetupsQuery(undefined, {
            selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
                setupsByDocument: selectSetupsByDocument(data, documentId),
                defaultSetup: selectDefaultSetup(data, documentId),
                providedSetup: selectProvidedSetup(data, state?.setup.id),
                actualSetup: selectSetupOnId(data, currentSetup?.id),
                isLoading,
                isError,
                isSuccess,
            }),
        });

    const [downloadPDFFile] = useDownloadPDFFileMutation();

    const document = useSelector((state) =>
        selectDocumentById(state, documentId)
    );

    useEffect(() => {}, [currentSetup]);

    const handleAddTrade = async () => {
        try {
            const newTrade = await addTrade({ documentId }).unwrap();
            if (newTrade.success) {
                dispatch(setTrade(newTrade.trade));
                dispatch(setOpen(true));
            }
            dispatch(setMessage({ msg: newTrade.msg }));
            dispatch(setError({ error: !newTrade.success }));
        } catch (error) {
            console.log(error);
        }
    };

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
                    mb: 2,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 25,
                        LineHeight: 30,
                        letterSpacing: "-0.6px",
                    }}
                >
                    {document ? document?.name : "Loading"}
                </Typography>
                <Box>
                    <TSMainButton
                        variant="contained"
                        onClick={handleAddTrade}
                        sx={{ ml: 1 }}
                        startIcon={<IsoIcon />}
                    >
                        Add Trade
                    </TSMainButton>
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
                    <SetupFilter setup={actualSetup} />
                    <TSMainButton
                        variant="contained"
                        component={Link}
                        to="/setups"
                        sx={{ ml: 1 }}
                        startIcon={<ViewColumnRoundedIcon />}
                    >
                        Manage
                    </TSMainButton>
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
                        defaultSetup={providedSetup || defaultSetup}
                        setups={setupsByDocument}
                        changeSetup={setCurrentSetup}
                    />
                    <CustomIconMenuButton
                        sx={{ ml: 1 }}
                        size="small"
                        onClick={() => setOpenAddSetup(true)}
                    >
                        <AddRoundedIcon />
                    </CustomIconMenuButton>
                </Box>
            </Box>

            {/* <Divider sx={{ my: 2 }} /> */}
            <SetupView setup={actualSetup} />
            <AddSetupDialog
                openAddDialog={openAddSetup}
                handleAddDialogClose={handleAddDialogClose}
                documentId={documentId}
            />
        </Box>
    );
};

export default Analysis;
