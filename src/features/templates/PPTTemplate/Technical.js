import { uploadFile } from "api/awsS3";
import { TSTextField } from "common/CustomComponents";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { AddBoxRounded } from "@mui/icons-material";
import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { setError, setMessage } from "features/messages/messagesSlice";

const placeholderImg =
    "https://static.vecteezy.com/system/resources/previews/018/767/276/original/stock-market-volatility-chart-for-stock-trading-cryptocurrency-background-the-up-and-down-chart-illustration-on-the-blue-theme-screen-graph-for-trading-free-vector.jpg";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const Technical = ({ template, onChangeField }) => {
    const [startImage, setStartImage] = useState("");
    const dispatch = useDispatch();

    const handleFileChange = async (e) => {
        try {
            const file = e.target.files[0];
            const fileType = file["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.includes(fileType)) {
                const response = await uploadFile(file);
                if (response.success) {
                    onChangeField("pre_trade_screenshot", response.url);
                    setStartImage(response.url);
                } else {
                    dispatch(setError({ error: true }));
                    dispatch(setMessage({ msg: "Something went wrong." }));
                }
            } else {
                dispatch(setError({ error: true }));
                dispatch(setMessage({ msg: "File type not supported." }));
            }
        } catch (e) {
            dispatch(setError({ error: true }));
            dispatch(setMessage({ msg: "Something went wrong." }));
        }
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
                Technical Analysis
            </Typography>
            <Box sx={{ mb: 1.5 }}>
                <InputLabel shrink={false} sx={{ mb: 1 }}>
                    Technical Levels
                </InputLabel>
                <TSTextField
                    multiline
                    value={template?.technical_levels || ""}
                    onChange={(e) =>
                        onChangeField("technical_levels", e.target.value)
                    }
                    minRows={1}
                    sx={{
                        "& .MuiInputBase-multiline": { p: 1 },
                        "& textarea": { fontSize: 14 },
                    }}
                />
            </Box>

            <Box display="flex" alignItems="start" sx={{ mb: 1.5 }} gap={2}>
                <Box sx={{ width: "100%" }}>
                    <Button
                        component="label"
                        disableRipple
                        sx={{
                            py: 5,
                            mb: 1,
                            border: "1px dashed #0000003b",
                            backgroundColor: "white",
                            width: "100%",
                        }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <MoveToInboxRoundedIcon
                                sx={{ fontSize: 70, color: "#0000003b" }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: "#0d0d254d",
                                }}
                            >
                                Click To Upload Image
                            </Typography>
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Box>
                    </Button>

                    <TSTextField
                        placeholder="Image URL"
                        value={startImage}
                        onChange={(e) => setStartImage(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ mr: 0.5 }}>
                                    <IconButton
                                        edge="end"
                                        disableRipple
                                        sx={{
                                            color: "white",
                                            p: 0.5,
                                            backgroundColor: "#1A65F1",
                                            borderRadius: "5px",
                                        }}
                                        onClick={() =>
                                            onChangeField(
                                                "pre_trade_screenshot",
                                                startImage
                                            )
                                        }
                                    >
                                        <AddBoxRounded />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <img
                    className={`preview-image ${
                        !template?.pre_trade_screenshot && "image-placeholder"
                    }`}
                    alt="Pre Trade Screenshot"
                    src={template?.pre_trade_screenshot || placeholderImg}
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <InputLabel shrink={false} sx={{ mb: 1 }}>
                    Comments
                </InputLabel>
                <TSTextField
                    multiline
                    value={template?.technical_analysis_comment || ""}
                    onChange={(e) =>
                        onChangeField(
                            "technical_analysis_comment",
                            e.target.value
                        )
                    }
                    minRows={1}
                    sx={{
                        "& .MuiInputBase-multiline": { p: 1 },
                        "& textarea": { fontSize: 14 },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Technical;
