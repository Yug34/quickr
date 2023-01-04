import { Flex } from "../Common/Flex";
import React, { useEffect } from "react";
import styled from "styled-components";
import ProfilePic from "../../static/profilePicture.svg";

import { FriendsType, MessageType, UserType } from "../../App/App.Types";


interface ChatProps {
    user: UserType;
    sendMessage: any;
    friend: FriendsType;
    chatMessages: MessageType[];
}

const ChatContainer = styled(Flex)`
  background: #e8e8e8;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  color: #000000;
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChatInputContainer = styled(Flex)`
    justify-content: space-between;
    align-items: center;
`;

const ChatInput = styled.input``;

const ChatTopBar = styled(Flex)`
  justify-content: space-between;
  max-height: 4rem;
`;

const ChatMessagesContainer = styled(Flex)`
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
`;

interface ChatMessageProps {
    message: MessageType;
    isOwn: boolean;
}

const ChatMessageContainer = styled(Flex)<{isOwn: boolean;}>`
    width: fit-content;
    padding: ${(props) => props.isOwn ? "6px" : "10px"} 12px;
    border-radius: 12px 12px ${(props) => props.isOwn ? "0 12px" : "12px 0"};
    margin: ${(props) => props.isOwn ? "8px 12px 8px 0" : "8px 0 8px 12px"};
    background: ${(props) => props.isOwn ? "#f1f1f1" : "#b2cdf7"};
    border: 4px solid ${(props) => props.isOwn ? "#b2cdf7" : "#e8e8e8"};
    color: ${(props) => props.isOwn ? "#9aaac0" : "#666666"};
    box-shadow: ${(props) => props.isOwn ? "inset 11px 11px 22px #d3d3d3, inset -11px -11px 22px #ffffff" : ""};
    font-weight: 600;
    font-size: 16px;
`;

const ChatNotch = styled.div<{isOwn: boolean;}>`
    width: 8px;
    height: 8px;
    position: absolute;
    bottom: ${(props) => props.isOwn ? "0" : "4px"};
    margin: ${(props) => props.isOwn ? "0 12px 0 0" : "0 0 0 16px"};
    background: linear-gradient(to bottom ${(props) => props.isOwn ? "left" : "right"}, #b2cdf7 50%, #e8e8e8 50%);
`;

const ChatMessage = ({message, isOwn}: ChatMessageProps): JSX.Element => (
    <Flex style={{position: 'relative'}} justify={isOwn ? 'flex-end' : 'flex-start'}>
        <ChatMessageContainer isOwn={isOwn} key={message.timeStamp}>{message.message}</ChatMessageContainer>
        <ChatNotch isOwn={isOwn} />
    </Flex>
);

const Chat = ({user, friend, chatMessages, sendMessage}: ChatProps) => {
    const messageRef = React.createRef<HTMLInputElement>();

    return (
        <ChatContainer>
            <ChatTopBar>
                <Flex colGap={'12px'} align={"center"}>
                    <ProfilePicture src={ProfilePic} alt={"Profile Icon"} />
                    <div>{friend.email}</div>
                </Flex>
            </ChatTopBar>
            <ChatMessagesContainer>
                {chatMessages.map((message: MessageType) => (
                    <ChatMessage key={message.timeStamp} isOwn={message.author === user.userUID} message={message} />
                ))}
            </ChatMessagesContainer>
            <ChatInputContainer>
                <ChatInput ref={messageRef} type={"text"} placeholder={"Type your message here"} />
                <button onClick={() => sendMessage(messageRef.current!.value, friend.friendUID, user.userUID)}>Send</button>
            </ChatInputContainer>
        </ChatContainer>
    );
};

export default Chat;