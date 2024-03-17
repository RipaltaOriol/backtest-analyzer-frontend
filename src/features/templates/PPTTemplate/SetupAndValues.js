import {
    TSAddButton,
    TSMenuItem,
    TSSelect,
    TSTextField,
} from "common/CustomComponents";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

const ORDER_TYPES = [
    "Buy Limit",
    "Sell Limit",
    "Market",
    "Buy Stop",
    "Sell Stop",
];

const rowHeaderStyles = {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: "18px",
    letterSpacing: "-0.6px",
};

const rowPositionStyles = {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "-0.6px",
};

const orderOptions = ORDER_TYPES.map((state, idx) => (
    <TSMenuItem key={idx} value={state}>
        {state}
    </TSMenuItem>
));

const SetupAndValues = ({ template, onChangeField, onChangeFieldArray }) => {
    const addPosition = () => {
        let positions = [...template.positions];

        positions.push({
            position_number: positions.length,
            order_type: "",
            price: "",
            risk: "",
            size: "",
            risk_reward: "",
        });
        onChangeField("positions", positions);
    };

    const addTakeProfit = () => {
        let take_profit = [...template.take_profit];

        take_profit.push({
            take_profit_number: take_profit.length,
            take_profit: 0,
        });
        onChangeField("take_profit", take_profit);
    };

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
                Trade Setup & Values
            </Typography>
            <Box sx={{ mb: 1.5 }}>
                <Box className="position-grid">
                    <Box></Box>
                    <Box sx={rowHeaderStyles}>Order Type</Box>
                    <Box sx={rowHeaderStyles}>Price</Box>
                    <Box sx={rowHeaderStyles}>Risk (Account %)</Box>
                    <Box sx={rowHeaderStyles}>Position Size</Box>
                    <Box sx={rowHeaderStyles}>Risk Reward</Box>
                </Box>
                {template.positions.map((position, i) => (
                    <Box className="position-grid" key={i}>
                        <Box sx={rowPositionStyles}>Entry Position {i + 1}</Box>
                        <Box>
                            <TSSelect
                                value={position?.order_type}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "positions",
                                        "order_type",
                                        e.target.value
                                    )
                                }
                            >
                                {orderOptions}
                            </TSSelect>
                        </Box>
                        <Box>
                            <TSTextField
                                size="small"
                                variant="outlined"
                                type="number"
                                value={position?.price ?? ""}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "positions",
                                        "price",
                                        e.target.valueAsNumber
                                    )
                                }
                            />
                        </Box>
                        <Box>
                            <TSTextField
                                size="small"
                                variant="outlined"
                                type="number"
                                value={position?.risk ?? ""}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            %
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "positions",
                                        "risk",
                                        e.target.valueAsNumber
                                    )
                                }
                            />
                        </Box>
                        <Box>
                            <TSTextField
                                size="small"
                                variant="outlined"
                                type="number"
                                value={position?.size ?? ""}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "positions",
                                        "size",
                                        e.target.valueAsNumber
                                    )
                                }
                            />
                        </Box>
                        <Box>
                            <TSTextField
                                size="small"
                                variant="outlined"
                                type="number"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            RR
                                        </InputAdornment>
                                    ),
                                }}
                                value={position?.risk_reward ?? ""}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "positions",
                                        "risk_reward",
                                        e.target.valueAsNumber
                                    )
                                }
                            />
                        </Box>
                    </Box>
                ))}
                <Box>
                    <TSAddButton onClick={() => addPosition()}>
                        Add New
                    </TSAddButton>
                </Box>
            </Box>

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
                Risk Management
            </Typography>
            <Box className="box-grid-sl-tp" sx={{ mb: 1 }}>
                <Box>
                    <InputLabel shrink={false} sx={{ mb: 1 }}>
                        Stop Loss
                    </InputLabel>
                    <Box flexGrow={1}>
                        <TSTextField
                            size="small"
                            variant="outlined"
                            type="number"
                            value={template.stop_loss ?? ""}
                            onChange={(e) =>
                                onChangeField(
                                    "stop_loss",
                                    e.target.valueAsNumber
                                )
                            }
                        />
                    </Box>
                </Box>
                <Box>
                    {template?.take_profit.map((tp, i) => (
                        <Box sx={{ mb: 2 }}>
                            <InputLabel shrink={false} sx={{ mb: 1 }}>
                                Take Profit {tp.take_profit_number + 1}
                            </InputLabel>
                            <Box flexGrow={1}>
                                <TSTextField
                                    size="small"
                                    variant="outlined"
                                    type="number"
                                    value={tp.take_profit ?? ""}
                                    onChange={(e) =>
                                        onChangeFieldArray(
                                            i,
                                            "take_profit",
                                            "take_profit",
                                            e.target.valueAsNumber
                                        )
                                    }
                                />
                            </Box>
                        </Box>
                    ))}

                    <TSAddButton onClick={() => addTakeProfit()}>
                        Add New
                    </TSAddButton>
                </Box>
            </Box>
        </Box>
    );
};

export default SetupAndValues;
