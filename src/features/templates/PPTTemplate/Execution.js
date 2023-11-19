import dayjs from "dayjs";

import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

import { CustomDateTimeField } from "features/templates/templateCustomComponents";

const Execution = ({ template, onChangeField }) => {
    return (
        <Box sx={{ mb: 2.5 }}>
            <Typography variant="h5">Execution & Management</Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Box className="execution-grid">
                <Box display="flex" alignItems="center">
                    <Typography sx={{ mr: 1, textWrap: "nowrap" }}>
                        Execution Date
                    </Typography>
                    <CustomDateTimeField
                        format="L HH:mm"
                        value={dayjs(template?.date_executed)}
                        onChange={(newValue) =>
                            onChangeField(
                                "date_executed",
                                newValue.toISOString()
                            )
                        }
                    />
                </Box>
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Alert Placed"
                    value={template?.entry_alert}
                    onChange={(e) =>
                        onChangeField("entry_alert", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Trade Placed"
                    value={template?.is_trade_placed}
                    onChange={(e) =>
                        onChangeField("is_trade_placed", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Read Notes"
                    value={template?.read_notes}
                    onChange={(e) =>
                        onChangeField("read_notes", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Stop Loss"
                    value={template?.is_stop_loss}
                    onChange={(e) =>
                        onChangeField("is_stop_loss", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Take Profit"
                    value={template?.is_take_profit}
                    onChange={(e) =>
                        onChangeField("is_take_profit", e.target.checked)
                    }
                />
            </Box>
        </Box>
    );
};

export default Execution;
