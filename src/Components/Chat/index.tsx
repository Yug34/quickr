import {Flex} from "../Common/Flex";
import React, {useState} from "react";
import styled from "styled-components";
import ProfilePic from "../../static/profilePicture.svg";

import {FriendsType, MessageType, UserType} from "../../App/App.Types";
import {px2vw} from "../../utils";


interface ChatProps {
    user: UserType;
    sendMessage: any;
    friend: FriendsType;
    chatMessages: MessageType[];
}

const ChatContainer = styled(Flex)`
  border-radius: 20px;
  background: #e8e8e8;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  color: #000000;
`;

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ChatInputContainer = styled(Flex)`
    justify-content: space-between;
    align-items: center;
    height: 40px;
`;

const StyledButton = styled.button`
    height: 100%;
    padding: 0 20px;
    border-radius: 0 20px 20px 0;
    border: 0px;
    cursor: pointer;
    outline: none;
    background: #b2cdf7;
    &:hover {
        background: #a0a0a0;
    }
`;

const ChatInput = styled.input`
    padding: 0 20px;
    width: 100%;
    height: 100%;
    border-radius: 20px 0 0 20px;
    border: 2px solid #b2cdf7;
    outline: none;
`;

const ChatTopBar = styled(Flex)`
  background: #b2cdf7;
  border-radius: 20px 20px 0 20px;
  color: #666666;
  font-weight: 600;
  justify-content: space-between;
  height: 40px;
`;

const ChatMsg = styled(Flex)<{ isOwn: boolean; }>`
    justify-content: ${(props) => props.isOwn ? "flex-end" : "flex-start"};
    align-items: center;
`;


const MsgCnt = styled(Flex)`
    height: 100%;
    overflow-y: scroll;
    flex-direction: column;
    justify-content: flex-end;
`;

interface ChatMessageProps {
    message: MessageType;
    isOwn: boolean;
}

const ChatMessageContainer = styled(Flex)<{ isOwn: boolean; }>`
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

const ThreeDotsContainer = styled.div`
    position: relative;
    margin: 0 0.5rem 0 0.25rem;
    cursor: pointer;
    
    &:hover .tooltipText {
        visibility: visible;
    }
`;

const Tooltip = styled.div<{isOwn: boolean;}>`
  visibility: hidden;
  white-space: pre;
  width: fit-content;
  min-width: clamp(120px, ${px2vw(140)}, 140px);
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 12px;
  ${(props) => props.isOwn && "right: 20px;"}
  ${(props) => !props.isOwn && "left: 20px;"}
  bottom: -4px;
  
  position: absolute;
  z-index: 1;
  
  &:hover {
    visibility: visible;
  }
`;

//TODO:
const ThreeDots = ({isOwn}: { isOwn: boolean; }): JSX.Element => (
    <ThreeDotsContainer style={{position: "relative", margin: "0 0.5rem 0 0.25rem", cursor: "pointer"}}>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
        <Tooltip onClick={() => console.log("TODO")} isOwn={isOwn} className={"tooltipText"}>Unsend Message</Tooltip>
    </ThreeDotsContainer>
);

const ChatNotch = styled.div<{ isOwn: boolean; }>`
    width: 8px;
    height: 8px;
    position: absolute;
    bottom: ${(props) => props.isOwn ? "0" : "4px"};
    margin: ${(props) => props.isOwn ? "0 12px 0 0" : "0 0 0 16px"};
    background: linear-gradient(to bottom ${(props) => props.isOwn ? "left" : "right"}, #b2cdf7 50%, #e8e8e8 50%);
`;

const ChatMessage = ({message, isOwn}: ChatMessageProps): JSX.Element => (
    <Flex style={{position: 'relative'}} width={"fit-content"} justify={isOwn ? 'flex-end' : 'flex-start'}>
        <ChatMessageContainer isOwn={isOwn} key={message.timeStamp}>{message.message}</ChatMessageContainer>
        <ChatNotch isOwn={isOwn}/>
    </Flex>
);

const Chat = ({user, friend, chatMessages, sendMessage}: ChatProps) => {
    const messageRef = React.createRef<HTMLInputElement>();

    const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            sendMessage(messageRef.current!.value, friend.friendUID, user.userUID, messageRef);
        }
    };

    return (
        <ChatContainer>
            <ChatTopBar>
                <Flex colGap={'12px'} align={"center"}>
                    <ProfilePicture src={ProfilePic} alt={"Profile Icon"}/>
                    <div>{friend.email}</div>
                </Flex>
            </ChatTopBar>
            <MsgCnt>
                {chatMessages.map((message: MessageType) => {
                    const isOwn = message.author === user.userUID;
                    return (
                        <ChatMsg isOwn={isOwn}>
                            {isOwn && <ThreeDots isOwn={isOwn}/>}
                            <ChatMessage key={message.timeStamp} isOwn={isOwn} message={message}/>
                            {!isOwn && <ThreeDots isOwn={isOwn}/>}
                        </ChatMsg>
                    );
                })}
            </MsgCnt>
            <ChatInputContainer>
                <ChatInput onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => submitOnEnter(e)} ref={messageRef} type={"text"} placeholder={"Type your message here"}/>
                <StyledButton onClick={() => sendMessage(messageRef.current!.value, friend.friendUID, user.userUID, messageRef)}>
                    Send
                </StyledButton>
            </ChatInputContainer>
        </ChatContainer>
    );
};

export default Chat;