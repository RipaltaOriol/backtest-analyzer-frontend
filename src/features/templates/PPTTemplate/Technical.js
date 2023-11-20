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
    CustomTextField,
    ImageUrlTextField,
    TemplateAccordion,
} from "features/templates/templateCustomComponents";

const Technical = ({ template, onChangeField }) => {
    const [startImage, setStartImage] = useState("");

    return (
        <Box sx={{ mb: 2.5 }}>
            <Typography variant="h5">Technical Analysis</Typography>
            <Divider sx={{ mb: 1.5 }} />

            <TemplateAccordion disableGutters sx={{ mb: 1.5 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                        px: 1.5,
                    }}
                >
                    <Typography>Technical Levels</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
                    <CustomTextField
                        multiline
                        minRows={3}
                        value={template?.technical_levels}
                        onChange={(e) =>
                            onChangeField("technical_levels", e.target.value)
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
            {template?.pre_trade_screenshot && (
                <img
                    className="preview-image"
                    alt="Pre Trade Screenshot"
                    src={template?.pre_trade_screenshot}
                />
            )}
            <Box display="flex" sx={{ mb: 1.5 }}>
                <ImageUrlTextField
                    size="small"
                    sx={{ flexGrow: 1, mr: 1 }}
                    variant="outlined"
                    value={startImage}
                    onChange={(e) => setStartImage(e.target.value)}
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
                        onChangeField("pre_trade_screenshot", startImage)
                    }
                >
                    Accept
                </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="h6"
                    sx={{ mr: 2, mb: 0.5, fontWeight: 500 }}
                >
                    Comments
                </Typography>
                <CustomTextField
                    multiline
                    minRows={3}
                    value={template?.technical_analysis_comment}
                    onChange={(e) =>
                        onChangeField(
                            "technical_analysis_comment",
                            e.target.value
                        )
                    }
                    sx={{
                        "& .MuiInputBase-multiline": { p: 1 },
                        "& textarea": { fontSize: 14 },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Technical;
