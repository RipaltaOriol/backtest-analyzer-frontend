import { CustomMenuItem } from "common/CustomComponents";
import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

import {
    CustomSelect,
    CustomTextField,
    ImageUrlTextField,
    TemplateAccordion,
} from "features/templates/templateCustomComponents";

const RESULT_SATES = ["Win", "Loss", "Break Even"];
const REVIEW_SATES = ["Correct", "Incorrect", "Not Known"];
const reviewOptions = REVIEW_SATES.map((state, idx) => (
    <CustomMenuItem key={idx} value={state}>
        {state}
    </CustomMenuItem>
));
const resultOptions = RESULT_SATES.map((state, idx) => (
    <CustomMenuItem key={idx} value={state}>
        {state}
    </CustomMenuItem>
));
const Close = ({ template, onChangeField }) => {
    const [endImage, setEndImage] = useState("");
    return (
        <Box sx={{ mb: 2.5 }}>
            <Typography variant="h5">Close Trade</Typography>
            <Divider sx={{ mb: 1.5 }} />
            <TemplateAccordion disableGutters sx={{ mb: 1.5 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                        px: 1.5,
                    }}
                >
                    <Typography>Target Area</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
                    <CustomTextField
                        multiline
                        minRows={3}
                        value={template?.target_area}
                        onChange={(e) =>
                            onChangeField("target_area", e.target.value)
                        }
                        sx={{
                            "& .MuiInputBase-multiline": { p: 1 },
                            "& textarea": { fontSize: 14 },
                            backgroundColor: "#d7edff",
                            borderRadius: "5px",
                        }}
                    />
                </AccordionDetails>
            </TemplateAccordion>
            <Box sx={{ mb: 1.5 }}>
                <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 500 }}>
                    Reason Close
                </Typography>
                <CustomTextField
                    multiline
                    minRows={3}
                    sx={{
                        "& .MuiInputBase-multiline": { p: 1 },
                        "& textarea": { fontSize: 14 },
                    }}
                />
            </Box>
            <Box className="box-grid-close" sx={{ mb: 1 }}>
                <Box>
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <Typography sx={{ mr: 2 }}>Result</Typography>
                        <CustomSelect
                            size="small"
                            value={template?.result}
                            onChange={(e) =>
                                onChangeField("result", e.target.value)
                            }
                        >
                            {resultOptions}
                        </CustomSelect>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <Typography sx={{ mr: 2, textWrap: "nowrap" }}>
                            Return %
                        </Typography>
                        <CustomTextField
                            size="small"
                            variant="outlined"
                            type="number"
                            value={template?.return_percentage}
                            onChange={(e) =>
                                onChangeField(
                                    "return_percentage",
                                    e.target.value
                                )
                            }
                        />
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <Typography sx={{ mr: 2, textWrap: "nowrap" }}>
                            Return $
                        </Typography>
                        <CustomTextField
                            size="small"
                            variant="outlined"
                            type="number"
                            value={template?.return_value}
                            onChange={(e) =>
                                onChangeField("return_value", e.target.value)
                            }
                        />
                    </Box>
                </Box>
                <Box>
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <Typography sx={{ mr: 2 }}>Direction</Typography>
                        <CustomSelect
                            size="small"
                            value={template?.direction_result}
                            onChange={(e) =>
                                onChangeField(
                                    "direction_result",
                                    e.target.value
                                )
                            }
                        >
                            {reviewOptions}
                        </CustomSelect>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <Typography sx={{ mr: 2 }}>Levels</Typography>
                        <CustomSelect
                            size="small"
                            value={template?.levels_result}
                            onChange={(e) =>
                                onChangeField("levels_result", e.target.value)
                            }
                        >
                            {reviewOptions}
                        </CustomSelect>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <Typography sx={{ mr: 2 }}>Exit</Typography>
                        <CustomSelect
                            size="small"
                            value={template?.close_result}
                            onChange={(e) =>
                                onChangeField("close_result", e.target.value)
                            }
                        >
                            {reviewOptions}
                        </CustomSelect>
                    </Box>
                </Box>
            </Box>
            {template?.post_trade_screenshot && (
                <img
                    className="preview-image"
                    alt="Post Trade Screenshot"
                    src={template?.post_trade_screenshot}
                />
            )}
            <Box display="flex" sx={{ mb: 1.5 }}>
                <ImageUrlTextField
                    size="small"
                    sx={{ flexGrow: 1, mr: 1 }}
                    variant="outlined"
                    value={endImage}
                    onChange={(e) => setEndImage(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                Image URL
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    onClick={() =>
                        onChangeField("post_trade_screenshot", endImage)
                    }
                >
                    Accept
                </Button>
            </Box>
            <Box sx={{ mb: 1.5 }}>
                <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 500 }}>
                    Learnings
                </Typography>
                <CustomTextField
                    multiline
                    minRows={3}
                    sx={{
                        "& .MuiInputBase-multiline": { p: 1 },
                        "& textarea": { fontSize: 14 },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Close;
