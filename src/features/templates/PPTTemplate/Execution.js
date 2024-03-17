import { TSDatePicker } from "common/CustomComponents";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

const Execution = ({ template, onChangeField, onChangeDateField }) => {
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
                Execution & Management
            </Typography>
            <Box className="execution-grid">
                <Box>
                    <InputLabel shrink={false} sx={{ mb: 1 }}>
                        Execution Date
                    </InputLabel>
                    <TSDatePicker
                        format="L HH:mm"
                        value={dayjs(template?.date_executed) || null}
                        onChange={(newValue) =>
                            onChangeDateField("date_executed", newValue)
                        }
                    />
                </Box>
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label={
                        <Typography sx={{ fontWeight: 500 }}>
                            Alert Placed
                        </Typography>
                    }
                    checked={template?.entry_alert ?? false}
                    onChange={(e) =>
                        onChangeField("entry_alert", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label={
                        <Typography sx={{ fontWeight: 500 }}>
                            Trade Placed
                        </Typography>
                    }
                    checked={template?.is_trade_placed ?? false}
                    onChange={(e) =>
                        onChangeField("is_trade_placed", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label={
                        <Typography sx={{ fontWeight: 500 }}>
                            Read Notes
                        </Typography>
                    }
                    checked={template?.read_notes ?? false}
                    onChange={(e) =>
                        onChangeField("read_notes", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label={
                        <Typography sx={{ fontWeight: 500 }}>
                            Stop Loss
                        </Typography>
                    }
                    checked={template?.is_stop_loss ?? false}
                    onChange={(e) =>
                        onChangeField("is_stop_loss", e.target.checked)
                    }
                />
                <FormControlLabel
                    control={<Checkbox disableRipple />}
                    label={
                        <Typography sx={{ fontWeight: 500 }}>
                            Take Profit
                        </Typography>
                    }
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
