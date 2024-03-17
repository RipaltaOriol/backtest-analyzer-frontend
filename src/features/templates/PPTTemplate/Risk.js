import { TSAddButton, TSTextField } from "common/CustomComponents";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

const rowHeaderStyles = {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: "18px",
    letterSpacing: "-0.6px",
};

const rowWeekStyles = {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "-0.6px",
};

const Risk = ({ template, onChangeField, onChangeFieldArray }) => {
    const addWeek = () => {
        let week = [...template.event_risk_date];

        week.push({
            // position_number: week.length, // IT LOOKS LIKE THIS IS NOT NEEDED AND WRONG
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
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: "30px",
                    letterSpacing: "-0.06em",
                    mb: 2,
                }}
            >
                Risk
            </Typography>
            <Box>
                <InputLabel shrink={false} sx={{ mb: 1 }}>
                    Fundamental Risk
                </InputLabel>
                <TSTextField
                    multiline
                    minRows={1}
                    value={template?.fundamental_risk || ""}
                    onChange={(e) =>
                        onChangeField("fundamental_risk", e.target.value)
                    }
                    sx={{
                        "& .MuiInputBase-multiline": { p: 1 },
                        "& textarea": { fontSize: 14 },
                        mb: 2,
                    }}
                />

                <InputLabel shrink={false} sx={{ mb: 1 }}>
                    Events & Opportunities
                </InputLabel>
                <TSTextField
                    multiline
                    minRows={1}
                    value={template?.event_opportunity || ""}
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
                        <Box></Box>
                        <Box sx={rowHeaderStyles}>Monday</Box>
                        <Box sx={rowHeaderStyles}>Tuesday</Box>
                        <Box sx={rowHeaderStyles}>Wednesday</Box>
                        <Box sx={rowHeaderStyles}>Thursday</Box>
                        <Box sx={rowHeaderStyles}>Friday</Box>
                    </Box>
                    {template.event_risk_date.map((event, i) => (
                        <Box
                            key={i}
                            className="position-grid"
                            sx={{ alignItems: "start" }}
                        >
                            <Box sx={rowWeekStyles}>
                                Week{" "}
                                {dayjs(event.event_date)
                                    .day(1)
                                    .format("ddd D MMM")}
                            </Box>
                            <TSTextField
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
                            <TSTextField
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
                            <TSTextField
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
                            <TSTextField
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
                            <TSTextField
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
                    <Box>
                        <TSAddButton onClick={() => addWeek()}>
                            Add New
                        </TSAddButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Risk;
