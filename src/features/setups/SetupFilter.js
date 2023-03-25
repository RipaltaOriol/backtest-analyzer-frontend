import { useState } from "react";

import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
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
    padding: "4px 12px",
    textTransform: "none",
    borderRadius: "6px",
});

const FilterMenuItem = styled(MenuItem)({
    fontSize: "14px",
    borderRadius: "6px",
    "&:hover": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
    "&:focus": {
        color: "inherit",
        backgroundColor: "inherit",
    },
    "&:hover:focus": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
});

const FilterMenuItemMultiple = styled(ListItemText)({
    borderRadius: "6px",
    "&:hover": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
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

        if (
            filterOptionIdx !== -1 &&
            setup.options[filterOptionIdx].type === "number"
        ) {
            filter.value = [Number(number)];
        }
        if (
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
                        p: "24px",
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
                    <Typography variant="subtitle2">Setup Filters</Typography>
                    <Typography sx={{ fontSize: "14px" }} gutterBottom>
                        Select from the dropdown to apply filters to your setups
                    </Typography>
                    <Select
                        size="small"
                        value={column}
                        renderValue={(value) => (
                            <>
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
                            </>
                        )}
                        onChange={(e, child) => {
                            setColumn(e.target.value);
                            setFilterOptionIdx(child.props.id);
                            setAction([null, "None"]);
                            setNumber("None");
                            setValues([]);
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
                        InputLabelProps={{ shrink: false }}
                        IconComponent={(props) => (
                            <KeyboardArrowDownRoundedIcon {...props} />
                        )}
                    >
                        {setup
                            ? setup?.options.map((option, idx) => (
                                  <FilterMenuItem
                                      key={idx}
                                      id={idx}
                                      value={[option.id, option.name]}
                                  >
                                      {option.name}
                                  </FilterMenuItem>
                              ))
                            : null}
                    </Select>
                    <Select
                        size="small"
                        autoFocus={false}
                        value={action}
                        disabled={filterOptionIdx === -1}
                        renderValue={(value) => (
                            <>
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
                            </>
                        )}
                        onChange={(e) => setAction(e.target.value)}
                        label={null}
                        MenuListProps={{
                            select: { "&:focus": { borderColor: "red" } },
                        }}
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
                        InputLabelProps={{ shrink: false }}
                        IconComponent={(props) => (
                            <KeyboardArrowDownRoundedIcon {...props} />
                        )}
                    >
                        {filterOptionIdx !== -1 ? (
                            setup.options[filterOptionIdx].type === "number" ? (
                                Object.keys(operations.numeric).map(
                                    (item, idx) => (
                                        <FilterMenuItem
                                            key={idx}
                                            value={[
                                                item,
                                                operations.numeric[item],
                                            ]}
                                        >
                                            {operations.numeric[item]}
                                        </FilterMenuItem>
                                    )
                                )
                            ) : (
                                Object.keys(operations.string).map(
                                    (item, idx) => (
                                        <FilterMenuItem
                                            key={idx}
                                            value={[
                                                item,
                                                operations.string[item],
                                            ]}
                                        >
                                            {operations.string[item]}
                                        </FilterMenuItem>
                                    )
                                )
                            )
                        ) : (
                            <></>
                        )}
                    </Select>
                    {setup?.options[filterOptionIdx]?.type === "string" ? (
                        <Select
                            size="small"
                            autoFocus={false}
                            multiple
                            value={values}
                            disabled={filterOptionIdx === -1}
                            renderValue={(values) => (
                                <>
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
                                </>
                            )}
                            onChange={handleValueChange}
                            label={null}
                            MenuListProps={{
                                select: { "&:focus": { borderColor: "red" } },
                            }}
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
                            InputLabelProps={{ shrink: false }}
                            IconComponent={(props) => (
                                <KeyboardArrowDownRoundedIcon {...props} />
                            )}
                        >
                            {setup.options[filterOptionIdx].values.map(
                                (value, idx) => (
                                    <FilterMenuItem key={idx} value={value}>
                                        <Checkbox
                                            checked={values.indexOf(value) > -1}
                                            size="small"
                                            sx={{ py: 0 }}
                                        />
                                        <FilterMenuItemMultiple
                                            primary={value}
                                        />
                                    </FilterMenuItem>
                                )
                            )}
                        </Select>
                    ) : (
                        <TextField
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
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderWidth: "1px",
                                            borderColor: "inherit",
                                        },
                                },
                            }}
                            InputLabelProps={{ shrink: false }}
                            onChange={(e) => setNumber(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
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
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}

                    <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
                        <Button
                            variant="text"
                            onClick={handleClose}
                            sx={{ mx: 1 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleApply}
                            sx={{ mx: 1 }}
                        >
                            Apply
                        </Button>
                    </Box>
                </Box>
            </Menu>
        </>
    );
};

export default SetupFilter;
