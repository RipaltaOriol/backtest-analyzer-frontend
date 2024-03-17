import defaultTemplateImg from "assets/images/templates/defaultTemplate.png";
import pptTemplateImg from "assets/images/templates/pptTemplate.png";
import userProflileDefault from "assets/images/userProflileDefault.svg";
import {
    TSBackButton,
    TSMainButton,
    TSTextField,
} from "common/CustomComponents";
import { ErrorFeedback } from "common/ErrorFeedback";
import { useState } from "react";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
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

const nameToPreview = (name) => {
    if (name === "Default") {
        return defaultTemplateImg;
    } else if (name === "PPT") {
        return pptTemplateImg;
    } else {
        return defaultTemplateImg;
    }
};

const Settings = () => {
    const { data: userSettings } = useGetUserSettingsQuery();

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
            <Box sx={{ mb: 4 }}>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 25,
                        LineHeight: 30,
                        letterSpacing: "-0.6px",
                    }}
                >
                    Settings
                </Typography>
            </Box>
            <Box display="flex" sx={{ mb: 5 }}>
                <Avatar
                    sx={{
                        width: "80px",
                        height: "80px",
                        p: 2,
                        backgroundColor: "#0E73F6",
                        mr: 3,
                    }}
                    src={userProflileDefault}
                />
                <Box>
                    <Typography
                        sx={{ fontSize: 18, fontWeight: 500 }}
                        gutterBottom
                    >
                        {userSettings?.email || "Loading"}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 14, color: "#6E7C87", mb: 1.5 }}
                    >
                        Email: {userSettings?.email || "Loading"}
                    </Typography>
                    <TSBackButton disabled>Change Avatar</TSBackButton>
                </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography gutterBottom sx={{ fontWeight: 500, fontSize: 18 }}>
                    Password:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "end" }}>
                    <Box sx={{ mr: 2 }}>
                        <InputLabel shrink={false} sx={{ mb: 0.5 }}>
                            New Password
                        </InputLabel>
                        <TSTextField
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{
                                "& input": { fontSize: 14 },
                            }}
                        />
                    </Box>
                    <Box sx={{ mr: 2 }}>
                        <InputLabel shrink={false} sx={{ mb: 0.5 }}>
                            Confirm New Password
                        </InputLabel>
                        <TSTextField
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            sx={{
                                "& input": { fontSize: 14 },
                            }}
                        />
                    </Box>
                    <TSMainButton
                        variant="contained"
                        sx={{ py: 0.8 }}
                        onClick={handleUpdatePassword}
                    >
                        Update Password
                    </TSMainButton>
                </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography gutterBottom sx={{ fontWeight: 500, fontSize: 18 }}>
                    Payment Method:
                </Typography>
                <ErrorFeedback msg="No payment method detected" />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ mb: 5 }}>
                <Typography gutterBottom sx={{ fontWeight: 500, fontSize: 18 }}>
                    Current Templates
                </Typography>
                <Box className="templates-grid">
                    {Object.values(userSettings?.templates || []).map(
                        (template) => (
                            <Box
                                className="light-border"
                                sx={{ width: "300px", p: 2 }}
                            >
                                <img
                                    src={nameToPreview(template?.name)}
                                    alt="default template"
                                />
                                <Typography sx={{ mt: 1, fontSize: 16 }}>
                                    {template.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        mb: 2,
                                        fontSize: 14,
                                        color: "#6E7C87",
                                        fontWeight: 450,
                                    }}
                                >
                                    {template.description}
                                </Typography>
                                <TSMainButton
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
                                </TSMainButton>
                            </Box>
                        )
                    )}
                </Box>
            </Box>
            <Box sx={{ mb: 5 }}>
                <Typography gutterBottom sx={{ fontWeight: 500, fontSize: 18 }}>
                    Other Templates
                </Typography>
                <Box className="templates-grid">
                    {Object.values(userSettings?.marketTemplates || []).map(
                        (template) => (
                            <Box
                                className="light-border"
                                sx={{ width: "300px", p: 2 }}
                            >
                                <img
                                    src={nameToPreview(template?.name)}
                                    alt="default template"
                                />
                                <Typography sx={{ mt: 1, fontSize: 16 }}>
                                    {template.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        mb: 2,
                                        fontSize: 14,
                                        color: "#6E7C87",
                                        fontWeight: 450,
                                    }}
                                >
                                    {template.description}
                                </Typography>

                                <Box>
                                    <TSMainButton
                                        variant="contained"
                                        sx={{ mr: 1 }}
                                        onClick={() =>
                                            handleAddTemplate(template.id)
                                        }
                                    >
                                        Buy ${template.price.toFixed(2)}
                                    </TSMainButton>
                                    <TSBackButton
                                        startIcon={<VisibilityRoundedIcon />}
                                        disabled
                                    >
                                        Preview
                                    </TSBackButton>
                                </Box>
                            </Box>
                        )
                    )}
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
