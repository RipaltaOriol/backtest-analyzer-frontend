import dayjs from "dayjs";

import AddIcon from "@mui/icons-material/Add";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
    CustomAddIcon,
    CustomTextField,
} from "features/templates/templateCustomComponents";

const Risk = ({ template, onChangeField, onChangeFieldArray }) => {
    const addWeek = () => {
        let week = [...template.event_risk_date];

        week.push({
            position_number: week.length,
            event_date: dayjs().toISOString(),
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
        });
        onChangeField("event_risk_date", week);
    };

    return (
        <Box sx={{ mb: 2.5 }}>
            <Typography variant="h5">Risk</Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Box>
                <Typography
                    variant="h6"
                    sx={{ mr: 2, mb: 0.5, fontWeight: 500 }}
                >
                    Fundamental Risk
                </Typography>
                <CustomTextField
                    multiline
                    minRows={3}
                    value={template?.fundamental_risk}
                    onChange={(e) =>
                        onChangeField("fundamental_risk", e.target.value)
                    }
                    sx={{
                        "& .MuiInputBase-multiline": { p: 1 },
                        "& textarea": { fontSize: 14 },
                        mb: 2,
                    }}
                />
                <Typography
                    variant="h6"
                    sx={{ mr: 2, mb: 0.5, fontWeight: 500 }}
                >
                    Events & Opportunities
                </Typography>
                <CustomTextField
                    multiline
                    minRows={3}
                    value={template?.event_opportunity}
                    onChange={(e) =>
                        onChangeField("event_opportunity", e.target.value)
                    }
                    sx={{
                        "& .MuiInputBase-multiline": { p: 1 },
                        "& textarea": { fontSize: 14 },
                        mb: 2,
                    }}
                />
                <Box>
                    <Box className="position-grid">
                        <Box>
                            <CustomAddIcon
                                onClick={() => addWeek()}
                                disableRipple
                            >
                                <AddIcon color="primary" />
                            </CustomAddIcon>
                        </Box>
                        <Box>Monday</Box>
                        <Box>Tuesday</Box>
                        <Box>Wednesday</Box>
                        <Box>Thursday</Box>
                        <Box>Friday</Box>
                    </Box>
                    {template.event_risk_date.map((event, i) => (
                        <Box
                            className="position-grid"
                            sx={{ alignItems: "start" }}
                        >
                            <Box>
                                Week{" "}
                                {dayjs(event.event_date)
                                    .day(1)
                                    .format("ddd D MMM")}
                            </Box>
                            <CustomTextField
                                multiline
                                value={event.monday}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "event_risk_date",
                                        "monday",
                                        e.target.value
                                    )
                                }
                                sx={{
                                    "& .MuiInputBase-multiline": { p: 1 },
                                    "& textarea": { fontSize: 14 },
                                }}
                            />
                            <CustomTextField
                                multiline
                                value={event.tuesday}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "event_risk_date",
                                        "tuesday",
                                        e.target.value
                                    )
                                }
                                sx={{
                                    "& .MuiInputBase-multiline": { p: 1 },
                                    "& textarea": { fontSize: 14 },
                                }}
                            />
                            <CustomTextField
                                multiline
                                value={event.wednesday}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "event_risk_date",
                                        "wednesday",
                                        e.target.value
                                    )
                                }
                                sx={{
                                    "& .MuiInputBase-multiline": { p: 1 },
                                    "& textarea": { fontSize: 14 },
                                }}
                            />
                            <CustomTextField
                                multiline
                                value={event.thursday}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "event_risk_date",
                                        "thursday",
                                        e.target.value
                                    )
                                }
                                sx={{
                                    "& .MuiInputBase-multiline": { p: 1 },
                                    "& textarea": { fontSize: 14 },
                                }}
                            />
                            <CustomTextField
                                multiline
                                value={event.friday}
                                onChange={(e) =>
                                    onChangeFieldArray(
                                        i,
                                        "event_risk_date",
                                        "friday",
                                        e.target.value
                                    )
                                }
                                sx={{
                                    "& .MuiInputBase-multiline": { p: 1 },
                                    "& textarea": { fontSize: 14 },
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Risk;
