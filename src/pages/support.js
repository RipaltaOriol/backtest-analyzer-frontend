import React from "react";
import { ChatEngine } from "react-chat-engine";

const SupportChat = () => {
    return (
        <ChatEngine
            projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
            userName="Trade Sharpener Support"
            userSecret="admin@tradesharpener.com"
            height="100vh"
        />
    );
};

export default SupportChat;
