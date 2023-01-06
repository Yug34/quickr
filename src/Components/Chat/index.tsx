import {Flex} from "../Common/Flex";
import React from "react";
import styled from "styled-components";
import ProfilePic from "../../static/profilePicture.svg";

import {FriendsType, MessageStatus, MessageType, UserType} from "../../App/App.Types";
import {px2vw} from "../../utils";


interface ChatProps {
    user: UserType;
    sendMessage: any;
    friend: FriendsType;
    chatMessages: MessageType[];
    removeFriend: any;
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
    font-weight: 600;
    font-size: 16px;
    align-items: center;
    column-gap: 0.5rem;
`;

const ThreeDotsContainer = styled.div`
    position: relative;
    margin: 0 0.5rem 0 0.25rem;
    cursor: pointer;
    
    &:hover .tooltipText {
        visibility: visible;
    }
`;

const Tooltip = styled.div`
  visibility: hidden;
  white-space: pre;
  width: fit-content;
  min-width: clamp(120px, ${px2vw(140)}, 140px);
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 12px;
  right: 20px;
  bottom: -4px;
  
  position: absolute;
  z-index: 1;
  
  &:hover {
    visibility: visible;
  }
`;

//TODO:
const ThreeDots = (): JSX.Element => (
    <ThreeDotsContainer>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
        <Tooltip onClick={() => console.log("TODO")} className={"tooltipText"}>Unsend Message</Tooltip>
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

const RemoveFriendCTA = styled(Flex)`
    justify-content: center;
    align-items: center;
    border: 2px solid #f05e54;
    border-radius: 0 20px 0 0;
    box-sizing: border-box;
    white-space: pre;
    width: fit-content;
    min-width: clamp(140px, ${px2vw(160)}, 160px);
    cursor: pointer;
    background: #f05e54;
    color: white;
    
    &:hover {
        background: #d04e44;
    }
`;

interface SVGProps {
    color?: string;
    size?: string;
}

const SentCheck = ({color, size}: SVGProps) => (
    <svg stroke={color || "currentColor"} fill={color || "currentColor"} strokeWidth="0" viewBox="0 0 512 512" height={size || "1em"} width={size || "1em"} xmlns="http://www.w3.org/2000/svg">
        <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
    </svg>
);

const DeliveredCheck = ({color, size}: SVGProps) => (
    <svg stroke={color || "currentColor"} fill={color || "currentColor"} strokeWidth="0.5rem" viewBox="0 0 512 512" height={size || "1em"} width={size || "1em"} xmlns="http://www.w3.org/2000/svg">
        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
    </svg>
);

const ReadCheck = ({color, size}: SVGProps) => (
    <svg stroke={color || "currentColor"} fill={color || "currentColor"} strokeWidth="0" viewBox="0 0 512 512" height={size || "1em"} width={size || "1em"} xmlns="http://www.w3.org/2000/svg">
        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>
    </svg>
);

const Ring = styled.div`
    display: inline-block;
    position: relative;
    width: 1rem;
    height: 1rem;
    
    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 1rem;
        height: 1rem;
        border: 3px solid #ff6a60;
        border-radius: 50%;
        animation: spin-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #ff6a60 transparent transparent transparent;
    }
    
    div:nth-child(1) {
        animation-delay: -0.45s;
    }
    div:nth-child(2) {
        animation-delay: -0.3s;
    }
    div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes spin-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const SpinnerDiv = () => (
    <Ring>
        <div/>
        <div/>
        <div/>
        <div/>
    </Ring>
)

interface RenderProps {
    status: MessageStatus | string;
}

const RenderMessageStatus = ({status}: RenderProps): JSX.Element => {
    if (status === "read") {
        return <ReadCheck color={"#b2cdf7"}/>;
    }
    if (status === "delivered") {
        return <DeliveredCheck color={"#b2cdf7"}/>;
    }
    if (status === "sent") {
        return <SentCheck/>;
    }
    return <SpinnerDiv/>
}

const ChatMessage = ({message, isOwn}: ChatMessageProps): JSX.Element => (
    <Flex style={{position: 'relative'}} width={"fit-content"} justify={isOwn ? 'flex-end' : 'flex-start'}>
        <ChatMessageContainer isOwn={isOwn} key={message.timeStamp}>
            {message.message}
            {isOwn && <RenderMessageStatus status={message.status}/>}
        </ChatMessageContainer>
        <ChatNotch isOwn={isOwn}/>
    </Flex>
);

const Chat = ({user, friend, chatMessages, sendMessage, removeFriend}: ChatProps) => {
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
                <RemoveFriendCTA onClick={() => removeFriend(friend.friendUID, user.userUID)}>Remove friend</RemoveFriendCTA>
            </ChatTopBar>
            <MsgCnt>
                {chatMessages.map((message: MessageType) => {
                    const isOwn = message.author === user.userUID;
                    return (
                        <ChatMsg key={message.timeStamp} isOwn={isOwn}>
                            {isOwn && <ThreeDots/>}
                            <ChatMessage isOwn={isOwn} message={message}/>
                        </ChatMsg>
                    );
                })}
            </MsgCnt>
            <ChatInputContainer>
                <ChatInput onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => submitOnEnter(e)} ref={messageRef}
                           type={"text"} placeholder={"Type your message here"}/>
                <StyledButton
                    onClick={() => sendMessage(messageRef.current!.value, friend.friendUID, user.userUID, messageRef)}>
                    Send
                </StyledButton>
            </ChatInputContainer>
        </ChatContainer>
    );
};

export default Chat;