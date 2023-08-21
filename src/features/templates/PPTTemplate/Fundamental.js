import { CustomMenuItem } from "common/CustomComponents";

import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {
    CustomSelect,
    CustomTextField,
} from "features/templates/templateCustomComponents";

const CURRENCY_STATES = [
    "Strong Bullish",
    "Weak Bullish",
    "Neutral",
    "Weak Bearish",
    "Strong Bullish",
];

const getPairBaseNQuote = (pair, pos) => {
    if (!pair) return "XXX";
    if (pos === 1 && pair.length > 3) {
        return pair.substring(0, 3);
    } else if (pos === 2 && pair.length > 3) return pair.substring(3);
    else return "XXX";
};

const strengthOptions = CURRENCY_STATES.map((state) => (
    <CustomMenuItem value={state}>{state}</CustomMenuItem>
));

const Fundamental = ({ template, onChangeField }) => {
    return (
        <Box sx={{ mb: 2.5 }}>
            <Typography variant="h5">Fundamental View</Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                        <Typography sx={{ mr: 2 }}>Pair</Typography>
                        <Box flexGrow={1}>
                            <CustomTextField
                                size="small"
                                variant="outlined"
                                value={template?.asset || ""}
                                onChange={(e) =>
                                    onChangeField("asset", e.target.value)
                                }
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                        <Typography sx={{ mr: 2 }}>Direction</Typography>
                        <Box flexGrow={1}>
                            <CustomSelect
                                size="small"
                                value={template?.direction}
                                onChange={(e) =>
                                    onChangeField("direction", e.target.value)
                                }
                            >
                                <CustomMenuItem value={"long"}>
                                    Long
                                </CustomMenuItem>
                                <CustomMenuItem value={"short"}>
                                    Short
                                </CustomMenuItem>
                            </CustomSelect>
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
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <Typography sx={{ mr: 2 }}>
                            {getPairBaseNQuote(template?.asset, 1)}
                        </Typography>
                        <Box flexGrow={1}>
                            <CustomSelect
                                size="small"
                                value={template?.base_ppt}
                                onChange={(e) =>
                                    onChangeField("base_ppt", e.target.value)
                                }
                            >
                                {strengthOptions}
                            </CustomSelect>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography sx={{ mr: 2 }}>
                            {getPairBaseNQuote(template?.asset, 2)}
                        </Typography>
                        <Box flexGrow={1}>
                            <CustomSelect
                                size="small"
                                value={template?.quote_ppt}
                                onChange={(e) =>
                                    onChangeField("quote_ppt", e.target.value)
                                }
                            >
                                {strengthOptions}
                            </CustomSelect>
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
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <Typography sx={{ mr: 2 }}>
                            {getPairBaseNQuote(template?.asset, 1)}
                        </Typography>
                        <Box flexGrow={1}>
                            <CustomSelect
                                size="small"
                                value={template?.base_fundamental}
                                onChange={(e) =>
                                    onChangeField(
                                        "base_fundamental",
                                        e.target.value
                                    )
                                }
                            >
                                {strengthOptions}
                            </CustomSelect>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography sx={{ mr: 2 }}>
                            {getPairBaseNQuote(template?.asset, 2)}
                        </Typography>
                        <Box flexGrow={1}>
                            <CustomSelect
                                size="small"
                                value={template?.quote_fundamental}
                                onChange={(e) =>
                                    onChangeField(
                                        "quote_fundamental",
                                        e.target.value
                                    )
                                }
                            >
                                {strengthOptions}
                            </CustomSelect>
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
                    <CustomTextField
                        multiline
                        value={template?.reason || ""}
                        onChange={(e) =>
                            onChangeField("reason", e.target.value)
                        }
                        minRows={3}
                        sx={{
                            "& .MuiInputBase-multiline": { p: 1 },
                            "& textarea": { fontSize: 14 },
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Fundamental;
