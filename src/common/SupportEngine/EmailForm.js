import axios from "axios";
import React, { useState } from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import "./Support.css";

const EmailForm = (props) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    function getOrCreateUser(callback) {
        axios({
            method: "put",
            url: "https://api.chatengine.io/users/",
            headers: {
                "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
            },
            data: { username: email, email, secret: email },
        })
            .then((r) => callback(r.data))
            .catch((e) => console.log("Get or create user error", e));
    }

    function getOrCreateChat(callback) {
        axios
            .put(
                "https://api.chatengine.io/chats/",
                {
                    usernames: [email, "Trade Sharpener Support"],
                    is_direct_chat: true,
                },
                {
                    headers: {
                        "Project-ID": process.env.REACT_APP_CHAT_ENGINE_ID,
                        "User-Name": email,
                        "User-Secret": email,
                    },
                }
            )
            .then((r) => callback(r.data))
            .catch((e) => console.log("Get or create chat error", e));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        getOrCreateUser((user) => {
            props.setUser && props.setUser(user);
            getOrCreateChat((chat) => {
                setLoading(false);
                props.setChat && props.setChat(chat);
            });
        });
    }

    return (
        <Box sx={{ display: props.visible ? "block" : "none" }}>
            <Box style={{ height: "0px" }}>
                <Box className="strip" />
            </Box>
            <CircularProgress
                size={50}
                sx={{
                    display: loading ? "block" : "none",
                    color: "#d7edff",
                    bottom: "calc(50% - 24px)",
                    left: "calc(50% - 24px)",
                    position: "absolute",
                }}
                thickness={5}
            />
            <Box className="email-form transition-2">
                <Typography className="support-text">
                    Welcome to to support 👋
                </Typography>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="support-form"
                >
                    <input
                        className="email-input"
                        placeholder="Your Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </form>
            </Box>
        </Box>
    );
};

export default EmailForm;
