import defaultTemplate from "assets/images/templates/defaultTemplate.png";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
    useAddTemplateUserSettingsMutation,
    useGetUserSettingsQuery,
} from "features/auth/authApiSlice";
import { renderTemplate } from "features/templates/utilsTemplateManager";

import "./settings.css";

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name.toUpperCase()),
            width: 100,
            height: 100,
            mr: 3,
        },
        children: name[0].toUpperCase(),
    };
}

const Settings = () => {
    const { data } = useGetUserSettingsQuery();

    const [addTemplateUserSettings] = useAddTemplateUserSettingsMutation();

    const handleAddTemplate = (templateId) => {
        addTemplateUserSettings({ templateId });
    };

    return (
        <Box>
            <Typography variant="h5">Settings</Typography>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <Box display="flex" sx={{ mb: 5 }}>
                <Avatar {...stringAvatar("oriolripalta@hotmail.com")} />
                <Box>
                    <Typography
                        sx={{ fontSize: 16, fontWeight: 600 }}
                        gutterBottom
                    >
                        {data?.email || "Loading"}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 14, color: "#6E7C87", mb: 1.5 }}
                    >
                        Email: {data?.email || "Loading"}
                    </Typography>
                    <Button color="secondary" disabled>
                        Change Avatar
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ fontWeight: 600, mb: 2 }}>
                    Password:
                </Typography>
                <Box>
                    <TextField
                        label="New Password"
                        size="small"
                        autoComplete=""
                        type="password"
                        sx={{ "& input": { fontSize: 14 }, mr: 2 }}
                    />
                    <TextField
                        label="Confirm Password"
                        size="small"
                        autoComplete=""
                        type="password"
                        sx={{ "& input": { fontSize: 14 }, mr: 2 }}
                    />
                    <Button
                        color="primary"
                        variant="outlined"
                        disabled
                        sx={{ textTransform: "none" }}
                    >
                        Update Password
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ fontWeight: 600, mb: 2 }}>
                    Payment Method:
                </Typography>
                <Box sx={{ color: "red" }}>No payment method detected</Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ fontWeight: 600, mb: 2 }}>
                    Current Templates
                </Typography>
                <Box className="templates-grid">
                    {data?.templates.map((template) => (
                        <Box
                            className="light-border"
                            sx={{ width: "300px", p: 2 }}
                        >
                            <img src={defaultTemplate} alt="default template" />
                            <Typography sx={{ mt: 2 }}>
                                {template.name}
                            </Typography>
                            <Typography
                                sx={{ mb: 2, fontSize: 14, color: "#6E7C87" }}
                            >
                                {template.description}
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<VisibilityRoundedIcon />}
                            >
                                Preview
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ fontWeight: 600, mb: 2 }}>
                    Other Templates
                </Typography>
                <Box className="templates-grid">
                    {data?.allTemplates.map((template) => (
                        <Box
                            className="light-border"
                            sx={{ width: "300px", p: 2 }}
                        >
                            <img src={defaultTemplate} alt="default template" />
                            <Typography sx={{ mt: 2 }}>
                                {template.name}
                            </Typography>
                            <Typography
                                sx={{ mb: 2, fontSize: 14, color: "#6E7C87" }}
                            >
                                {template.description}
                            </Typography>
                            <Box>
                                <Button
                                    variant="contained"
                                    sx={{ mr: 1 }}
                                    onClick={() =>
                                        handleAddTemplate(template.id)
                                    }
                                >
                                    Buy ${template.price.toFixed(2)}
                                </Button>
                                <Button
                                    color="secondary"
                                    startIcon={<VisibilityRoundedIcon />}
                                >
                                    Preview
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Settings;
