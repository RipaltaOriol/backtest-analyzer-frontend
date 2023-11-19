import defaultTemplateImg from "assets/images/templates/defaultTemplate.png";
import pptTemplateImg from "assets/images/templates/pptTemplate.png";
import { ErrorFeedback } from "common/ErrorFeedback";
import { useState } from "react";

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
    useUpdatePasswordMutation,
} from "features/auth/authApiSlice";
import DefaultPreview from "features/templates/previews/DefaultPreview";
import PPTPreview from "features/templates/previews/PPTPreview";

import Message from "../common/Message";
// import { renderTemplate } from "features/templates/utilsTemplateManager";
import "./settings.css";

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: "#0e73f6",
            width: 100,
            height: 100,
            mr: 3,
        },
        children: name[0].toUpperCase(),
    };
}

const nameToPreview = (name) => {
    console.log(name);
    if (name === "Default") {
        return defaultTemplateImg;
    } else if (name === "PPT") {
        return pptTemplateImg;
    } else {
        return defaultTemplateImg;
    }
};

const Settings = () => {
    const { data } = useGetUserSettingsQuery();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [openPreview, setOpenPreview] = useState({});

    const [updatePassword] = useUpdatePasswordMutation();
    const [addTemplateUserSettings] = useAddTemplateUserSettingsMutation();

    const handleAddTemplate = (templateId) => {
        addTemplateUserSettings({ templateId });
    };

    const handlePreview = (isOpen, key) => {
        console.log(key);
        setOpenPreview({ ...openPreview, [key]: isOpen });
    };

    const handleUpdatePassword = async () => {
        if (newPassword === confirmPassword) {
            try {
                const updateResponse = await updatePassword({
                    newPassword,
                }).unwrap();
                setMessage(updateResponse.msg);
                setIsError(!updateResponse.success);
            } catch (err) {
                setMessage("Something went wrong. Please try again.");
                setIsError(true);
            }
        } else {
            setMessage("Passwords do not match.");
            setIsError(true);
        }
    };

    return (
        <Box>
            {true && (
                <Message
                    message={message}
                    setMessage={setMessage}
                    isError={isError}
                    sx={{ mb: 1.5 }}
                />
            )}
            <Typography variant="h5">Settings</Typography>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <Box display="flex" sx={{ mb: 5 }}>
                <Avatar
                    size="40"
                    {...stringAvatar("oriolripalta@hotmail.com")}
                />
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
                        type="password"
                        autoComplete=""
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{ "& input": { fontSize: 14 }, mr: 2 }}
                    />
                    <TextField
                        label="Confirm Password"
                        size="small"
                        autoComplete=""
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        sx={{ "& input": { fontSize: 14 }, mr: 2 }}
                    />
                    <Button
                        color="primary"
                        variant="outlined"
                        sx={{ textTransform: "none" }}
                        onClick={handleUpdatePassword}
                    >
                        Update Password
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ fontWeight: 600, mb: 2 }}>
                    Payment Method:
                </Typography>
                <ErrorFeedback msg="No payment method detected" />
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
                            <img
                                src={nameToPreview(template?.name)}
                                alt="default template"
                            />
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
                                onClick={() =>
                                    handlePreview(
                                        true,
                                        template?.name.toLowerCase()
                                    )
                                }
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
                            <img
                                src={nameToPreview(template?.name)}
                                alt="default template"
                            />
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
                                    disabled
                                >
                                    Preview
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <PPTPreview
                open={openPreview?.ppt}
                onClose={() => handlePreview(false, "ppt")}
            />
            <DefaultPreview
                open={openPreview?.default}
                onClose={() => handlePreview(false, "default")}
            />
        </Box>
    );
};

export default Settings;
