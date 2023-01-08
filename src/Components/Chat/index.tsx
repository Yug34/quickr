import {Flex} from "../Common/Flex";
import React from "react";
import ProfilePic from "../../static/profilePicture.svg";
import * as Styles from "./Chat.Styles";
import {FriendsType, MessageStatus, MessageType, UserType} from "../../App/App.Types";

interface ChatProps {
    user: UserType;
    sendMessage (message: string, friendUID: string, userUID: string, messageRef: React.RefObject<HTMLInputElement>): void;
    friend: FriendsType;
    chatMessages: MessageType[];
    removeFriend: any;
    SetMessageStatus: any;
}

interface ChatMessageProps {
    message: MessageType;
    isOwn: boolean;
}

interface UnsendMessageProps {
    timeStamp: number;
    friendUID: string;
    userUID: string;
    SetMessageStatus (friendUID: string, userUID: string, timeStamp: number, status: string): void;
}

const UnsendMessageCTA = ({timeStamp, friendUID, userUID, SetMessageStatus}: UnsendMessageProps): JSX.Element => (
    <Styles.UnsendCTAContainer onClick={() => SetMessageStatus(friendUID, userUID, timeStamp,"unsent")}>
        <Styles.DeleteBin color={"red"}/>
    </Styles.UnsendCTAContainer>
);

interface RenderProps {
    status: MessageStatus | string;
}

const RenderMessageStatus = ({status}: RenderProps): JSX.Element => {
    if (status === "read") {
        return <Styles.ReadCheck color={"#b2cdf7"}/>;
    }
    if (status === "delivered") {
        return <Styles.DeliveredCheck color={"#b2cdf7"}/>;
    }
    if (status === "sent") {
        return <Styles.SentCheck/>;
    }
    if (status === "unsent") {
        return <Styles.DeleteBin color={"#666666"}/>;
    }
    return <Styles.SpinnerDiv/>;
};

const ChatMessage = ({message, isOwn}: ChatMessageProps): JSX.Element => (
    <Flex style={{position: 'relative'}} width={"fit-content"} justify={isOwn ? 'flex-end' : 'flex-start'}>
        <Styles.ChatMessageContainer isOwn={isOwn} key={message.timeStamp}>
        {message.status === "unsent" ? "Message has been unsent" : message.message}
        {isOwn && <RenderMessageStatus status={message.status}/>}
        </Styles.ChatMessageContainer>
        <Styles.ChatNotch isOwn={isOwn}/>
    </Flex>
);

const Chat = ({user, friend, chatMessages, sendMessage, removeFriend, SetMessageStatus}: ChatProps) => {
    const messageRef = React.createRef<HTMLInputElement>();

    const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            sendMessage(messageRef.current!.value, friend.friendUID, user.userUID, messageRef);
        }
    };

    return (
        <Styles.ChatContainer>
            <Styles.ChatTopBar>
                <Flex colGap={'12px'} align={"center"}>
                    <Styles.ProfilePicture src={ProfilePic} alt={"Profile Icon"}/>
                    <div>{friend.email}</div>
                </Flex>
                <Styles.RemoveFriendCTA onClick={() => removeFriend(friend.friendUID, user.userUID)}>Remove friend</Styles.RemoveFriendCTA>
            </Styles.ChatTopBar>
            <Styles.MsgCnt>
                {chatMessages.map((message: MessageType) => {
                    const isOwn = message.author === user.userUID;
                    return (
                        <Styles.ChatMsg key={message.timeStamp} isOwn={isOwn}>
                            {(isOwn && message.status !== "unsent") && (
                                <UnsendMessageCTA
                                    timeStamp={message.timeStamp}
                                    userUID={user.userUID}
                                    friendUID={friend.friendUID}
                                    SetMessageStatus={SetMessageStatus}
                                />
                            )}
                            <ChatMessage isOwn={isOwn} message={message}/>
                        </Styles.ChatMsg>
                    );
                })}
            </Styles.MsgCnt>
            <Styles.ChatInputContainer>
                <Styles.ChatInput onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => submitOnEnter(e)} ref={messageRef}
                           type={"text"} placeholder={"Type your message here"}/>
                <Styles.StyledButton
                    onClick={() => sendMessage(messageRef.current!.value, friend.friendUID, user.userUID, messageRef)}>
                    Send
                </Styles.StyledButton>
            </Styles.ChatInputContainer>
        </Styles.ChatContainer>
    );
};

export default Chat;