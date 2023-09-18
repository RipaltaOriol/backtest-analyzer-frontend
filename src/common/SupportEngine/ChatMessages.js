import { db } from "api/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import ChatMessage from "./ChatMessage";

const ChatMessages = ({ user }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", user.uid), (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages);
            } else {
                setMessages([]);
            }
        });

        return () => {
            unSub();
        };
    }, [user]);

    return (
        <div className="messages-container">
            {messages.map((m) => (
                <ChatMessage message={m} user={user} key={m.id} />
            ))}
        </div>
    );
};

export default ChatMessages;
