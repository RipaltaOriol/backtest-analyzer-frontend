import { db } from "api/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { selectCurrentUser } from "features/auth/authSlice";

import "./Support.css";

const EmailForm = (props) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const userId = useSelector(selectCurrentUser);

    async function getOrCreateUser() {
        const userRef = doc(db, "users", userId);
        let userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: userId,
                email,
            });
            userSnap = await getDoc(userRef);
        }
        return userSnap.data();
    }

    async function getOrCreateChat() {
        const chatRef = doc(db, "chats", userId);
        let chatSnap = await getDoc(chatRef);
        if (!chatSnap.exists()) {
            await setDoc(chatRef, {
                messages: [],
            });
            chatSnap = await getDoc(chatRef);
        }
        return chatSnap.data();
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const user = await getOrCreateUser();
        props.setUser && props.setUser(user);
        const chat = await getOrCreateChat();
        setLoading(false);
        props.setChat && props.setChat(chat);
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
                {!loading && (
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
                )}
            </Box>
        </Box>
    );
};

export default EmailForm;
