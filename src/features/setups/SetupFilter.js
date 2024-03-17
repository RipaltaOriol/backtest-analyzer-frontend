import {
    TSBackButton,
    TSDatePicker,
    TSMainButton,
    TSMenuItem,
    TSSelect,
    TSTextField,
} from "common/CustomComponents";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { useAddFilterSetupMutation } from "features/setups/setupsSlice";

const operations = {
    numeric: {
        gt: "<",
        lt: ">",
        eq: "=",
        ne: "≠",
    },
    string: {
        in: "Include",
        nin: "Not include",
    },
};

const MenuButton = styled(Button)({
    color: "#252C32",
    backgroundColor: "#fff",
    border: "1px solid #DDE2E4",
    px: 2,
    py: 1,
    borderRadius: "10px",
});

const FilterMenuItemMultiple = styled(ListItemText)({
    // borderRadius: "6px",
    fontWeight: "500",
    "&:hover": {
        color: "#1A65F1",
        backgroundColor: "#f6f9fe",
    },
    "& .MuiTypography-root": {
        fontSize: "14px",
    },
});

const SetupFilter = ({ setup }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [column, setColumn] = useState([null, "None"]);
    const [action, setAction] = useState([null, "None"]);
    const [values, setValues] = useState([]);
    const [number, setNumber] = useState("None");
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [filterOptionIdx, setFilterOptionIdx] = useState(-1);

    const [addFilterSetup] = useAddFilterSetupMutation();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleValueChange = (event) => {
        const {
            target: { value },
        } = event;
        setValues(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleApply = async () => {
        if (
            column[0] === null ||
            action[0] === null ||
            (!values.length && number === undefined)
        ) {
            return handleClose();
        }

        const filter = {
            column: column[0],
            action: action[0],
        };

        if (filter.action === "date") {
            if (!dateFrom || !dateTo) {
                return false;
            }
            // assume it is a date filter
            filter.value = [
                dateFrom.format("MM/DD/YYYY"),
                dateTo.format("MM/DD/YYYY"),
            ];
        } else if (
            filterOptionIdx !== -1 &&
            setup.options[filterOptionIdx].type === "number"
        ) {
            filter.value = [Number(number)];
        } else if (
            filterOptionIdx !== -1 &&
            setup.options[filterOptionIdx].type === "string"
        ) {
            filter.value = values;
        }
        try {
            await addFilterSetup({ setupId: setup.id, filter }).unwrap();
            setColumn([null, "None"]);
            setAction([null, "None"]);
            setValues([]);
            setNumber(undefined);
            setFilterOptionIdx(-1);
            handleClose();
        } catch (err) {
            console.error("Something went wrong", err);
        }
    };

    useEffect(() => {
        setColumn([null, "None"]);
        setAction([null, "None"]);
        setValues([]);
        setNumber("None");
        setFilterOptionIdx(-1);
    }, [setup?.documentId]);

    const displayFilterValueOptions = (filterType) => {
        if (!filterType) {
            return false;
        }
        if (filterType === "string") {
            return (
                <TSSelect
                    size="small"
                    autoFocus={false}
                    multiple
                    value={values}
                    disabled={filterOptionIdx === -1}
                    renderValue={(values) => (
                        <span>
                            <Typography
                                display="inline-block"
                                sx={{
                                    minWidth: 60,
                                    color: "#9AA6AC",
                                    fontSize: "14px",
                                }}
                            >
                                Value
                            </Typography>
                            {values.map((value, idx) => (
                                <Typography
                                    display="inline"
                                    sx={{ fontSize: "14px" }}
                                >
                                    {value},&nbsp;
                                </Typography>
                            ))}
                        </span>
                    )}
                    onChange={handleValueChange}
                    label={null}
                    sx={{
                        my: 1,
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },
                        width: "100%",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "inherit",
                            borderWidth: "1px",
                        },
                    }}
                    IconComponent={(props) => (
                        <KeyboardArrowDownRoundedIcon {...props} />
                    )}
                >
                    {setup.options[filterOptionIdx].values.map((value, idx) => (
                        <TSMenuItem key={idx} value={value}>
                            <Checkbox
                                checked={values.indexOf(value) > -1}
                                size="small"
                                sx={{ py: 0 }}
                            />
                            <FilterMenuItemMultiple primary={value} />
                        </TSMenuItem>
                    ))}
                </TSSelect>
            );
        } else if (filterType === "date") {
            return (
                <Box
                    sx={{
                        display: "flex",
                        // justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TSDatePicker
                        label="Date From"
                        value={dayjs(dateFrom) || null}
                        onChange={(newValue) => setDateFrom(newValue)}
                        sx={{
                            my: 1,
                            flexGrow: 1,
                            "& input": {
                                p: 1.1,
                            },
                            borderRadius: "4px",
                            "&:hover": {
                                color: "rgba(0, 0, 0, 0.87)",
                            },
                            "& .MuiOutlinedInput-root": {
                                fontSize: "14px",
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderWidth: "1px",
                                        borderColor: "inherit",
                                    },
                            },
                        }}
                    />
                    <Box sx={{ mx: 4 }}>-</Box>
                    <TSDatePicker
                        label="Date To"
                        value={dayjs(dateTo) || null}
                        onChange={(newValue) => setDateTo(newValue)}
                        sx={{
                            my: 1,
                            flexGrow: 1,
                            "& input": {
                                p: 1.1,
                            },
                            "& .MuiDayCalendar-weekDayLabel": {
                                background: "red",
                            },
                            borderRadius: "4px",
                            "&:hover": {
                                color: "rgba(0, 0, 0, 0.87)",
                            },
                            "& .MuiOutlinedInput-root": {
                                fontSize: "14px",
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderWidth: "1px",
                                        borderColor: "inherit",
                                    },
                            },
                        }}
                    />
                </Box>
            );
        } else {
            return (
                <TSTextField
                    fullWidth
                    value={number}
                    size="small"
                    type="number"
                    label={null}
                    variant="outlined"
                    sx={{
                        my: 1,
                        borderRadius: "4px",
                        "&:hover": {
                            color: "rgba(0, 0, 0, 0.87)",
                        },
                        "& .MuiOutlinedInput-root": {
                            fontSize: "14px",
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderWidth: "1px",
                                borderColor: "inherit",
                            },
                        },
                    }}
                    onChange={(e) => setNumber(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Typography
                                    display="inline-block"
                                    sx={{
                                        minWidth: 50,
                                        color: "#9AA6AC",
                                        fontSize: "14px",
                                    }}
                                >
                                    Value
                                </Typography>
                            </InputAdornment>
                        ),
                    }}
                />
            );
        }
    };

    return (
        <>
            <MenuButton
                color="secondary"
                sx={{ ml: 1 }}
                onClick={handleClick}
                startIcon={<FilterAltRoundedIcon sx={{ color: "#5B6871" }} />}
            >
                Filter
            </MenuButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                autoFocus={false}
                sx={{ mt: 1 }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box
                    sx={(theme) => ({
                        p: 2,
                        [theme.breakpoints.up("sm")]: {
                            width: "400px",
                        },
                        [theme.breakpoints.up("md")]: {
                            width: "500px",
                        },
                        [theme.breakpoints.up("lg")]: {
                            width: "700px",
                        },
                    })}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 20,
                            lineHeight: "30px",
                            letterSpacing: "-0.6px",
                        }}
                    >
                        Setup Filters
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }} gutterBottom>
                        Select from the dropdown to apply filters to your setups
                    </Typography>
                    <TSSelect
                        size="small"
                        value={column}
                        renderValue={(value) => (
                            <span>
                                <Typography
                                    display="inline-block"
                                    sx={{
                                        minWidth: 60,
                                        color: "#9AA6AC",
                                        fontSize: "14px",
                                    }}
                                >
                                    Column
                                </Typography>
                                <Typography
                                    display="inline"
                                    sx={{ fontSize: "14px" }}
                                >
                                    {value[1]}
                                </Typography>
                            </span>
                        )}
                        onChange={(e, child) => {
                            setColumn(e.target.value);
                            setFilterOptionIdx(child.props.id);
                            setAction([null, "None"]);
                            setNumber("None");
                            setValues([]);
                            if (e.target.value[0].startsWith("col_d_"))
                                setAction(["date", null]);
                        }}
                        label={null}
                        sx={{
                            my: 1,
                            "& legend": { display: "none" },
                            "& fieldset": { top: 0 },
                            width: "100%",
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "inherit",
                                borderWidth: "1px",
                            },
                        }}
                        IconComponent={(props) => (
                            <KeyboardArrowDownRoundedIcon {...props} />
                        )}
                    >
                        {setup
                            ? setup?.options.map((option, idx) => (
                                  <TSMenuItem
                                      key={idx}
                                      id={idx}
                                      value={[option.id, option.name]}
                                      sx={{ fontSize: 14 }}
                                  >
                                      {option.name}
                                  </TSMenuItem>
                              ))
                            : null}
                    </TSSelect>
                    {setup?.options[filterOptionIdx]?.type !== "date" && (
                        <TSSelect
                            size="small"
                            autoFocus={false}
                            value={action}
                            disabled={filterOptionIdx === -1}
                            renderValue={(value) => (
                                <span>
                                    <Typography
                                        display="inline-block"
                                        sx={{
                                            minWidth: 60,
                                            color: "#9AA6AC",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Action
                                    </Typography>
                                    <Typography
                                        display="inline"
                                        sx={{ fontSize: "14px" }}
                                    >
                                        {value[1]}
                                    </Typography>
                                </span>
                            )}
                            onChange={(e) => setAction(e.target.value)}
                            label={null}
                            sx={{
                                my: 1,
                                "& legend": { display: "none" },
                                "& fieldset": { top: 0 },
                                width: "100%",
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "inherit",
                                        borderWidth: "1px",
                                    },
                            }}
                            IconComponent={(props) => (
                                <KeyboardArrowDownRoundedIcon {...props} />
                            )}
                        >
                            {filterOptionIdx !== -1
                                ? setup.options[filterOptionIdx].type ===
                                  "number"
                                    ? Object.keys(operations.numeric).map(
                                          (item, idx) => (
                                              <TSMenuItem
                                                  key={idx}
                                                  value={[
                                                      item,
                                                      operations.numeric[item],
                                                  ]}
                                                  sx={{ fontSize: 14 }}
                                              >
                                                  {operations.numeric[item]}
                                              </TSMenuItem>
                                          )
                                      )
                                    : Object.keys(operations.string).map(
                                          (item, idx) => (
                                              <TSMenuItem
                                                  key={idx}
                                                  value={[
                                                      item,
                                                      operations.string[item],
                                                  ]}
                                                  sx={{ fontSize: 14 }}
                                              >
                                                  {operations.string[item]}
                                              </TSMenuItem>
                                          )
                                      )
                                : null}
                        </TSSelect>
                    )}
                    {/* FILTER VALUE OPTIONS */}
                    {displayFilterValueOptions(
                        setup?.options[filterOptionIdx]?.type
                    )}

                    <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
                        <TSBackButton onClick={handleClose} sx={{ mx: 1 }}>
                            Cancel
                        </TSBackButton>
                        <TSMainButton
                            variant="contained"
                            onClick={handleApply}
                            sx={{ mx: 1 }}
                        >
                            Apply
                        </TSMainButton>
                    </Box>
                </Box>
            </Menu>
        </>
    );
};

export default SetupFilter;
