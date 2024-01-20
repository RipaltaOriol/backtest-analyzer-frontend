import { CustomMenuItem } from "common/CustomComponents";

import AddIcon from "@mui/icons-material/Add";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
    CustomAddIcon,
    CustomSelect,
    CustomTextField,
} from "features/templates/templateCustomComponents";

const ORDER_TYPES = [
    "Buy Limit",
    "Sell Limit",
    "Market",
    "Buy Stop",
    "Sell Stop",
];

const orderOptions = ORDER_TYPES.map((state, idx) => (
    <CustomMenuItem key={idx} value={state}>
        {state}
    </CustomMenuItem>
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
            <Typography variant="h5">Trade Setup & Values</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 1.5 }}>
                <Box className="position-grid">
                    <Box>
                        <CustomAddIcon
                            onClick={() => addPosition()}
                            disableRipple
                        >
                            <AddIcon color="primary" />
                        </CustomAddIcon>
                    </Box>
                    <Box>Order Type</Box>
                    <Box>Price</Box>
                    <Box>Risk</Box>
                    <Box>Position Size</Box>
                    <Box>Risk Reward</Box>
                </Box>
                {template.positions.map((position, i) => (
                    <Box className="position-grid" key={i}>
                        <Box>Entry Position {i + 1}</Box>
                        <Box>
                            <CustomSelect
                                size="small"
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
                            </CustomSelect>
                        </Box>
                        <Box>
                            <CustomTextField
                                size="small"
                                variant="outlined"
                                type="number"
                                value={position?.price.toString() || ""}
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
                            <CustomTextField
                                size="small"
                                variant="outlined"
                                type="number"
                                value={position?.risk.toString() || ""}
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
                            <CustomTextField
                                size="small"
                                variant="outlined"
                                type="number"
                                value={position?.size.toString() || ""}
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
                            <CustomTextField
                                size="small"
                                variant="outlined"
                                type="number"
                                value={position.risk_reward.toString() || ""}
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
            </Box>

            <Typography variant="h6" sx={{ mr: 2, mb: 0, fontWeight: 500 }}>
                Risk Management
            </Typography>
            <Box className="box-grid-sl-tp" sx={{ mb: 1 }}>
                <Box>
                    <Box display="flex" alignItems="center">
                        <Typography sx={{ mr: 2 }}>Stop Loss</Typography>
                        <Box flexGrow={1}>
                            <CustomTextField
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
                </Box>
                <Box>
                    {template?.take_profit.map((tp, i) => (
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{ mb: 1 }}
                            key={i}
                        >
                            <Typography sx={{ mr: 2 }}>
                                Take Profit {tp.take_profit_number + 1}
                            </Typography>
                            <Box flexGrow={1}>
                                <CustomTextField
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

                    <CustomAddIcon
                        onClick={() => addTakeProfit()}
                        disableRipple
                    >
                        <AddIcon color="primary" />
                    </CustomAddIcon>
                </Box>
            </Box>
        </Box>
    );
};

export default SetupAndValues;
