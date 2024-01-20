import dayjs from "dayjs";

import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

import { CustomDateTimeField } from "features/templates/templateCustomComponents";

const Execution = ({ template, onChangeField, onChangeDateField }) => {
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
                        value={dayjs(template?.date_executed) || null}
                        onChange={(newValue) =>
                            onChangeDateField("date_executed", newValue)
                        }
                    />
                </Box>
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Alert Placed"
                    checked={template?.entry_alert ?? false}
                    onChange={(e) =>
                        onChangeField("entry_alert", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Trade Placed"
                    checked={template?.is_trade_placed ?? false}
                    onChange={(e) =>
                        onChangeField("is_trade_placed", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Read Notes"
                    checked={template?.read_notes ?? false}
                    onChange={(e) =>
                        onChangeField("read_notes", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Stop Loss"
                    checked={template?.is_stop_loss ?? false}
                    onChange={(e) =>
                        onChangeField("is_stop_loss", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label="Take Profit"
                    checked={template?.is_take_profit ?? false}
                    onChange={(e) =>
                        onChangeField("is_take_profit", e.target.checked)
                    }
                />
            </Box>
        </Box>
    );
};

export default Execution;
