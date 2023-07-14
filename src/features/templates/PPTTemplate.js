import ImagesCarousel from "common/ImageCarousel";
import ImagePreviewDialog from "common/ImagePreviewDialog";
import Message from "common/Message";
import TipTapEditor, { useTextEditor } from "common/TipTapEditor";
import { EditorView } from "prosemirror-view";
import { useEffect, useState } from "react";
import { getResultAdornment } from "utils";
import parseColumnName from "utils/parseColumns";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import "./Templates.css";

const TemplateAccordion = styled(Accordion)({
    boxShadow: "none",
    border: "1px solid #DDE2E4",
    borderRadius: "5px",
    "&.MuiAccordion-root:before": {
        backgroundColor: "white",
        zIndex: -1,
    },
    marginBottom: "8px",
});

const PPTTemplate = () => {
    return (
        <Box>
            <Dialog
                // onClose={handleClose}
                open={false}
                fullWidth
                maxWidth="xl"
                sx={{
                    ".MuiDialog-paper": {
                        borderRadius: "6px",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F6F8F9",
                        border: "1px solid #E5E9EB",
                        px: 4,
                        py: 1.5,
                    }}
                >
                    <DialogTitle
                        sx={{
                            fontWeight: 600,
                            lineHeight: "24px",
                            display: "flex",
                            p: 0,
                        }}
                    >
                        Trade in [Pair]
                    </DialogTitle>
                </Box>
                <DialogContent sx={{ p: 4, pt: 1.5 }}>
                    {/* Fundamental */}
                    <Typography variant="h5">Fundamental View</Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={2}
                        sx={{ mb: 2 }}
                    >
                        <Grid item xs={6}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Pair
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        CADCHF
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Direction
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        Short
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h6"
                                sx={{ mr: 2, mb: 0.5, fontWeight: 500 }}
                            >
                                PPT Result
                            </Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    CAD
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        Weak
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    CAD
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        Very Strong
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h6"
                                sx={{ mr: 2, mb: 0.5, fontWeight: 500 }}
                            >
                                Fundamental Reading
                            </Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    CAD
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        Weak
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    CAD
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        Very Strong
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                sx={{ mr: 2, mb: 0.5, fontWeight: 500 }}
                            >
                                Reason
                            </Typography>
                            <Box
                                sx={{
                                    width: "100%",
                                    border: "1px solid #DDE2E4",
                                    borderRadius: "5px",
                                    height: "100px",
                                }}
                            ></Box>
                        </Grid>
                    </Grid>

                    {/* Setup & Values */}
                    <Typography variant="h5">Trade Setup & Values</Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={2}
                        sx={{ mb: 2 }}
                    >
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}>
                            Order Type
                        </Grid>
                        <Grid item xs={2}>
                            Price
                        </Grid>
                        <Grid item xs={2}>
                            Risk
                        </Grid>
                        <Grid item xs={2}>
                            Position Size
                        </Grid>
                        <Grid item xs={2}>
                            Risk Reward
                        </Grid>
                        <Grid item xs={2}>
                            Entry Position 1
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            Entry Position 1
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        border: "1px solid #DDE2E4",
                                        borderRadius: "5px",
                                        px: 1,
                                        py: 0.5,
                                        minWidth: "100px",
                                    }}
                                >
                                    Weak
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography
                        variant="h6"
                        sx={{ mr: 2, mb: 0, fontWeight: 500 }}
                    >
                        Risk Management
                    </Typography>
                    <Box className="box-grid-sl-tp" sx={{ mb: 1 }}>
                        <Box>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Stop Loss
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        1.1205
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Take Profit 1
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        1.1205
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Take Profit 2
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        1.1205
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {/* Technical Analysis */}
                    <Typography variant="h5">Technical Analysis</Typography>
                    <Divider sx={{ mb: 1.5 }} />

                    <TemplateAccordion disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                px: 1.5,
                            }}
                        >
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
                            <TextField></TextField>
                        </AccordionDetails>
                    </TemplateAccordion>
                    <TemplateAccordion disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                px: 1.5,
                            }}
                        >
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
                            <TextField></TextField>
                        </AccordionDetails>
                    </TemplateAccordion>
                    <TemplateAccordion disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                px: 1.5,
                            }}
                        >
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
                            <TextField></TextField>
                        </AccordionDetails>
                    </TemplateAccordion>
                    <img
                        className="preview-image"
                        alt="Pre Trade Screenshot"
                        src="https://static.tradingview.com/static/bundles/lightweight-charts.5c935e728656427cb801.jpg"
                    />
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{ mr: 2, mb: 0.5, fontWeight: 500 }}
                        >
                            Comments
                        </Typography>
                        <Box
                            sx={{
                                width: "100%",
                                border: "1px solid #DDE2E4",
                                borderRadius: "5px",
                                height: "100px",
                            }}
                        ></Box>
                    </Box>
                    {/* Risk */}
                    <Typography variant="h5">Risk</Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ mr: 2, mb: 0.5, fontWeight: 500 }}
                        >
                            Fundamental Risk
                        </Typography>
                        <Box
                            sx={{
                                width: "100%",
                                border: "1px solid #DDE2E4",
                                borderRadius: "5px",
                                height: "100px",
                            }}
                        ></Box>
                    </Box>

                    {/* Execution & Management */}
                    <Typography variant="h5">Execution & Management</Typography>
                    <Divider sx={{ mb: 1.5 }} />

                    {/* Close */}
                    <Typography variant="h5">Close Trade</Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    <TemplateAccordion disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                px: 1.5,
                            }}
                        >
                            <Typography>Liquidity Area</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
                            <TextField></TextField>
                        </AccordionDetails>
                    </TemplateAccordion>
                    <TemplateAccordion disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                px: 1.5,
                            }}
                        >
                            <Typography>Target Area</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
                            <TextField></TextField>
                        </AccordionDetails>
                    </TemplateAccordion>
                    <TemplateAccordion disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                px: 1.5,
                            }}
                        >
                            <Typography>Price Action</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
                            <TextField></TextField>
                        </AccordionDetails>
                    </TemplateAccordion>
                    <Box sx={{ mb: 1.5 }}>
                        <Typography
                            variant="h6"
                            sx={{ mb: 0.5, fontWeight: 500 }}
                        >
                            Reason Close
                        </Typography>
                        <Box
                            sx={{
                                width: "100%",
                                border: "1px solid #DDE2E4",
                                borderRadius: "5px",
                                height: "100px",
                            }}
                        ></Box>
                    </Box>
                    <Box className="box-grid-close" sx={{ mb: 1 }}>
                        <Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Win
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        CADCHF
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Win
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        CADCHF
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Win
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        CADCHF
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Win
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        CADCHF
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Win
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        CADCHF
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Win
                                </Typography>
                                <Box flexGrow={1}>
                                    <Typography
                                        sx={{
                                            border: "1px solid #DDE2E4",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: 0.5,
                                            minWidth: "100px",
                                        }}
                                    >
                                        CADCHF
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <img
                        className="preview-image"
                        alt="Pre Trade Screenshot"
                        src="https://static.tradingview.com/static/bundles/lightweight-charts.5c935e728656427cb801.jpg"
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default PPTTemplate;
