import { TSMenuItem, TSSelect, TSTextField } from "common/CustomComponents";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

const CURRENCY_STATES = [
    "Strong Bullish",
    "Weak Bullish",
    "Neutral",
    "Weak Bearish",
    "Strong Bearish",
];

const getPairBaseNQuote = (pair, pos) => {
    if (!pair) return "...";
    if (pos === 1 && pair.length > 3) {
        return pair.substring(0, 3);
    } else if (pos === 2 && pair.length > 3) return pair.substring(3);
    else return "...";
};

const strengthOptions = CURRENCY_STATES.map((state, idx) => (
    <TSMenuItem key={idx} value={state}>
        {state}
    </TSMenuItem>
));

const Fundamental = ({ template, onChangeField }) => {
    return (
        <Box sx={{ mb: 2.5 }}>
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: "30px",
                    letterSpacing: "-0.06em",
                    mb: 2,
                }}
            >
                Fundamental View
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid item xs={6}>
                    <Box>
                        <InputLabel shrink={false} sx={{ mb: 1 }}>
                            Pair
                        </InputLabel>
                        <TSTextField
                            value={template?.asset || ""}
                            onChange={(e) =>
                                onChangeField("asset", e.target.value)
                            }
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <InputLabel shrink={false} sx={{ mb: 1 }}>
                            Direction
                        </InputLabel>
                        <TSSelect
                            size="small"
                            value={template?.direction ?? " "}
                            onChange={(e) =>
                                onChangeField("direction", e.target.value)
                            }
                        >
                            <TSMenuItem value={"Long"}>Long</TSMenuItem>
                            <TSMenuItem value={"Short"}>Short</TSMenuItem>
                        </TSSelect>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        sx={{
                            mr: 2,
                            mb: 0.5,
                            fontSize: 16,
                            fontWeight: 600,
                            lineHeight: "24px",
                            letterSpacing: "-0.6px",
                        }}
                    >
                        PPT Result
                    </Typography>
                    <Box display="flex" justifyContent="space-between" gap={2}>
                        <Box flexGrow={1}>
                            <InputLabel shrink={false} sx={{ mb: 1 }}>
                                {getPairBaseNQuote(template?.asset, 1)}
                            </InputLabel>
                            <TSSelect
                                value={template?.base_ppt ?? " "}
                                onChange={(e) =>
                                    onChangeField("base_ppt", e.target.value)
                                }
                            >
                                {strengthOptions}
                            </TSSelect>
                        </Box>
                        <Box flexGrow={1}>
                            <InputLabel shrink={false} sx={{ mb: 1 }}>
                                {getPairBaseNQuote(template?.asset, 2)}
                            </InputLabel>
                            <TSSelect
                                value={template?.quote_ppt ?? " "}
                                onChange={(e) =>
                                    onChangeField("quote_ppt", e.target.value)
                                }
                            >
                                {strengthOptions}
                            </TSSelect>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        sx={{
                            mr: 2,
                            mb: 0.5,
                            fontSize: 16,
                            fontWeight: 600,
                            lineHeight: "24px",
                            letterSpacing: "-0.6px",
                        }}
                    >
                        Fundamental Reading
                    </Typography>
                    <Box display="flex" justifyContent="space-between" gap={2}>
                        <Box flexGrow={1}>
                            <InputLabel shrink={false} sx={{ mb: 1 }}>
                                {getPairBaseNQuote(template?.asset, 1)}
                            </InputLabel>
                            <TSSelect
                                value={template?.base_fundamental ?? " "}
                                onChange={(e) =>
                                    onChangeField(
                                        "base_fundamental",
                                        e.target.value
                                    )
                                }
                            >
                                {strengthOptions}
                            </TSSelect>
                        </Box>
                        <Box flexGrow={1}>
                            <InputLabel shrink={false} sx={{ mb: 1 }}>
                                {getPairBaseNQuote(template?.asset, 2)}
                            </InputLabel>
                            <TSSelect
                                value={template?.quote_fundamental ?? " "}
                                onChange={(e) =>
                                    onChangeField(
                                        "quote_fundamental",
                                        e.target.value
                                    )
                                }
                            >
                                {strengthOptions}
                            </TSSelect>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel shrink={false} sx={{ mb: 1 }}>
                        Reason
                    </InputLabel>
                    <TSTextField
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
