import { useEffect, useState } from "react";
import { ChatEngineWrapper, ChatFeed, Socket } from "react-chat-engine";

import Box from "@mui/material/Box";

import "./ChatEngine.css";

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
                <ChatEngineWrapper>
                    <Socket
                        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                        userName={user.email}
                        userSecret={user.email}
                    />
                    <ChatFeed activeChat={chat.id} />
                </ChatEngineWrapper>
            )}
        </Box>
    );
};

export default ChatEngine;
