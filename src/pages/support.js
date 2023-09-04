import {
    ChannelList,
    Chat,
    MessageInput,
    MessageList,
    TypingIndicator,
    useUsers,
} from "@pubnub/react-chat-components";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import React from "react";
import { ChatEngine } from "react-chat-engine";

/* Creates and configures your PubNub instance. Be sure to replace "myPublishKey" and "mySubscribeKey"
with your own keyset. If you wish, modify the default "myFirstUser" userId value for the chat user. */
const pubnub = new PubNub({
    publishKey: "pub-c-94008a57-7f67-406b-be0d-b7803db30574",
    subscribeKey: "sub-c-59a5c93a-6b09-4cdb-a46e-c808bbdf3093",
    userId: "12342de2",
});
const currentChannel = "Default";
const theme = "support";

function ChatConversation() {
    const [users] = useUsers();
    console.log(users);

    return (
        //     <ActiveUsersListPanelWrapper>
        //     <ActiveUsersListPanel />
        //   </ActiveUsersListPanelWrapper>
        //   <MessageListPanelWrapper>
        //     <MessageListPanel />
        //   </MessageListPanelWrapper>
        <Chat currentChannel="test-channel" users={users}>
            <MessageList />
            <MessageInput />
        </Chat>
    );
}

const SupportChat = () => {
    return (
        <PubNubProvider client={pubnub}>
            {/* PubNubProvider is a part of the PubNub React SDK and allows you to access PubNub instance
      in components down the tree. */}
            <ChatConversation />
        </PubNubProvider>
        // <ChatEngine
        //     projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        //     userName="Trade Sharpener Support"
        //     userSecret="admin@tradesharpener.com"
        //     height="100vh"
        // />
    );
};

export default SupportChat;
