import LogoIcon from "assets/svg/trade_sharpener_white.svg";
import { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

import "./ChatEngine.css";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatEngine = ({ visible, user, chat }) => {
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setShowChat(true);
            }, 500);
        }
        return () => {};
    }, [visible]);

    return (
        <Box sx={{ height: showChat ? "100%" : "0%" }}>
            {showChat && (
                <Box sx={{ height: "100%" }}>
                    <Box className="chat-info" sx={{ p: 2 }}>
                        <img
                            src={LogoIcon}
                            alt="Support Logo"
                            className="support-logo"
                        />

                        <Typography sx={{ fontWeight: 500, ml: 1 }}>
                            Support Chat
                        </Typography>
                    </Box>
                    <ChatMessages user={user} chat={chat} />
                    <ChatInput user={user} chat={chat} />
                </Box>
            )}
        </Box>
    );
};

export default ChatEngine;
