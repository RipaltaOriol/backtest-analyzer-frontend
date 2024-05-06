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
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "react-router-dom";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { setError, setMessage } from "features/messages/messagesSlice";

import {
    useGetAccountSettingsQuery,
    useGetDocumentColumnsQuery,
    usePutAccountSettingsMutation,
} from "./documentSlice";

export const CurrencyMenuItem = styled(MenuItem)({
    fontSize: "14px",
    borderRadius: "5px",
    backgroundColor: "#000",
    color: "white",
    "&:hover": {
        color: "white",
        backgroundColor: "#495057",
    },
    "&:focus": {
        color: "inherit",
        backgroundColor: "#000",
    },
    "&.Mui-selected": {
        color: "white",
        backgroundColor: "#000",
        "&:focus": {
            color: "white",
            backgroundColor: "#000",
        },
        "&:hover": {
            color: "white",
            backgroundColor: "#495057",
        },
    },
    "&:hover:focus": {
        color: "white",
        backgroundColor: "#495057",
    },
});

const allCurrencies = ["USD", "EUR", "GBP", "AUD", "NZD", "CHF", "JPY", "CAD"];

const conditions = {
    object: {
        empty: "Empty",
        not_empty: "Not Empty",
        equal: "Equal",
        not_equal: "Not Equal",
    },
    float64: {
        empty: "Empty",
        not_empty: "Not Empty",
        higher: "Higher",
        lower: "Lower",
        equal: "Equal",
        not_equal: "Not Equal",
    },
    int64: {
        empty: "Empty",
        not_empty: "Not Empty",
        higher: "Higher",
        lower: "Lower",
        equal: "Equal",
        not_equal: "Not Equal",
    },
    "datetime64[ns, UTC]": {
        empty: "Empty",
        not_empty: "Not Empty",
        before: "Before",
        after: "After",
    },
};

const currencyAdornmentMapping = (currency) => {
    switch (currency) {
        case "USD":
            return "$";
        case "EUR":
            return "€";
        case "GBP":
            return "£";
        case "JPY":
            return "¥";
        default:
            return currency;
    }
};

const AccountSettins = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    // TODO: handle None for currency
    const [accountSettings, setAccountSettings] = useState({
        currency: "USD",
        balance: 0,
        name: "Loading...",
    });

    // TODO: potentially merge this with settings
    const [openCondition, setOpenCondition] = useState({
        column: null,
        condition: null,
        value: null,
    });

    const { documentId } = useParams();

    const { data: settings } = useGetAccountSettingsQuery(
        { accountId: documentId },
        { skip: !documentId }
    );

    const { data: accountColumns } = useGetDocumentColumnsQuery(
        { documentId },
        { skip: !documentId }
    );

    const [putAccountSettings] = usePutAccountSettingsMutation();

    const handleChangeCurrency = (e) => {
        setAccountSettings({ ...accountSettings, currency: e.target.value });
    };

    const handleOpenPosition = (event) => {
        let { name, value } = event.target;
        if (name === "value") {
            // Convert value as a number if indicated by data type
            let columnType = accountColumns[openCondition.column]?.type;
            if (columnType === "int64" || columnType === "float64") {
                value = Number(value);
            }
        }
        if (name === "column") {
            setOpenCondition({
                [name]: value,
                condition: null,
                value: null,
            });
        } else {
            setOpenCondition({ ...openCondition, [name]: value });
        }
    };

    const handleOpenPositionDate = (date) => {
        let formatedDate = date.format("MM/DD/YYYY");
        setOpenCondition({ ...openCondition, value: formatedDate });
    };

    const handleChangeBalance = (e) => {
        const { value } = e.target;
        // remove all non-numeric characters except the decimal point.
        const newBalance = value.replace(/[^0-9.]/g, "");
        setAccountSettings({ ...accountSettings, balance: newBalance });
    };

    const handleSettingsUpdate = async () => {
        try {
            const updatedSettings = await putAccountSettings({
                ...accountSettings,
                accountId: documentId,
                openCondition,
            });
            dispatch(setMessage({ msg: updatedSettings?.data.message }));
            dispatch(setError({ error: !updatedSettings?.data.success }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (settings) {
            const { positionCondition, ...otherSettings } = settings;
            setAccountSettings(otherSettings);
            setOpenCondition(positionCondition);
        }
    }, [settings]);

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "10px",
                    backgroundColor: "#F6F8F9",
                    border: "none",
                    p: 2,
                    mb: 2,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 25,
                        LineHeight: 30,
                        letterSpacing: "-0.6px",
                    }}
                >
                    Acccount Settings
                </Typography>
                <Box sx={{ display: "flex", gap: "8px" }}>
                    <TSBackButton onClick={() => navigate("/files")}>
                        Cancel
                    </TSBackButton>
                    <TSMainButton
                        variant="contained"
                        onClick={handleSettingsUpdate}
                    >
                        Confirm
                    </TSMainButton>
                </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
                <InputLabel
                    shrink={false}
                    htmlFor={"accountName"}
                    sx={{ mb: 1 }}
                >
                    Account Name
                </InputLabel>
                <TSTextField
                    id="accountName"
                    variant="outlined"
                    value={accountSettings?.name}
                    disabled
                    sx={{
                        width: "100%",
                        border: "null",
                        backgroundColor: "white",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                // targets the <fieldset> element
                                borderRadius: "10px",
                            },
                            // targets the root of the outlined input
                            "&:hover fieldset": {
                                borderColor: "gray", // border color on hover
                            },
                            "&.Mui-focused fieldset": {
                                // targets the <fieldset> when the input is focused
                                borderColor: "#0e73f6", // border color on focus
                                borderWidth: "1px", // border width on focus
                            },
                        },
                    }}
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        lineHeight: "30px",
                        letterSpacing: "-0.6px",
                    }}
                    gutterBottom
                >
                    Account Initial Balance
                </Typography>
                <Box
                    sx={{
                        borderRadius: "10px",
                        backgroundColor: "#F6F8F9",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 2,
                        py: 1,
                    }}
                >
                    <TextField
                        size="small"
                        value={accountSettings?.balance}
                        variant="standard"
                        onChange={handleChangeBalance}
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    {currencyAdornmentMapping(
                                        accountSettings?.currency
                                    )}
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: "100%",
                            "& input": {
                                fontSize: 20,
                                lineHeight: "30px",
                            },
                        }}
                    />
                    <Select
                        value={accountSettings?.currency || "USD"}
                        inputProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: {
                                        backgroundColor: "black",
                                        borderRadius: "10px",
                                    },
                                },
                            },
                        }}
                        onChange={handleChangeCurrency}
                        IconComponent={KeyboardArrowDownRoundedIcon}
                        size="small"
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: "100px",
                            px: 1,
                            fontSize: 20,
                            fontWeight: 500,
                            "& .MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
                                {
                                    paddingRight: "48px",
                                },
                            "& .MuiSvgIcon-root": {
                                color: "white",
                                // fontWeight: 500,
                            },

                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                                borderWidth: "0px",
                            },
                        }}
                    >
                        {allCurrencies.map((currency) => (
                            <CurrencyMenuItem value={currency} key={currency}>
                                {currencyAdornmentMapping(currency)}
                            </CurrencyMenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
            <Box>
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        lineHeight: "30px",
                        letterSpacing: "-0.6px",
                    }}
                    gutterBottom
                >
                    Open Positions
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        columnGap: 2,
                    }}
                >
                    <Box>
                        <InputLabel shrink={false} sx={{ mb: 1 }}>
                            Column
                        </InputLabel>
                        <TSSelect
                            value={openCondition.column ?? ""}
                            size="small"
                            name="column"
                            onChange={handleOpenPosition}
                        >
                            {Object.entries(accountColumns || {}).map(
                                ([columnId, columnProps]) => {
                                    // Filter out images and notes
                                    if (
                                        columnId !== "imgs" &&
                                        columnId !== "note"
                                    ) {
                                        return (
                                            <TSMenuItem
                                                key={columnId}
                                                value={columnId}
                                            >
                                                {columnProps.name}
                                            </TSMenuItem>
                                        );
                                    }
                                    return null;
                                }
                            )}
                        </TSSelect>
                    </Box>
                    <Box>
                        <InputLabel shrink={false} sx={{ mb: 1 }}>
                            Condition
                        </InputLabel>
                        <TSSelect
                            value={openCondition.condition ?? ""}
                            size="small"
                            name="condition"
                            onChange={handleOpenPosition}
                        >
                            {accountColumns &&
                                Object.entries(
                                    conditions[
                                        accountColumns[openCondition.column]
                                            ?.type
                                    ] || {}
                                ).map(([id, name]) => (
                                    <TSMenuItem key={id} value={id}>
                                        {name}
                                    </TSMenuItem>
                                ))}
                        </TSSelect>
                    </Box>
                    <Box>
                        <InputLabel shrink={false} sx={{ mb: 1 }}>
                            Value
                        </InputLabel>
                        {openCondition?.condition === "before" ||
                        openCondition?.condition === "after" ? (
                            <TSDatePicker
                                label=""
                                value={dayjs(openCondition.value) || null}
                                onChange={(newValue) =>
                                    handleOpenPositionDate(newValue)
                                }
                                sx={{}}
                            />
                        ) : (
                            <TSTextField
                                value={openCondition.value ?? ""}
                                name="value"
                                onChange={handleOpenPosition}
                                disabled={
                                    openCondition.condition === "empty" ||
                                    openCondition.condition === "not_empty"
                                }
                                sx={{
                                    "& .Mui-disabled": {
                                        backgroundColor: "#ced4da",
                                        borderRadius: "5px",
                                        textDecoration: "line-through",
                                        "& input": {},
                                    },
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AccountSettins;
