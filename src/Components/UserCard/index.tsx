import {Flex} from "../Common/Flex";
import React from "react";
import styled from "styled-components";
import ProfilePic from "../../static/profilePicture.svg";
import {px2vw, trimStringToLength} from "../../utils";

interface UserCardProps {
    name: string;
    lastTalked: number;
    lastMessage: string;
    openUserChat: any;
    isOnline: boolean;
}

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const UserCardContainer = styled(Flex)`
  padding: 4px 8px 4px 4px;
  color: #000000;
  align-items: center;
  cursor: pointer;
  background: #b2cdf7;
    
  &:hover {
    background: #b0c0f0;
  }
`;

const UserName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BlinkingDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: green;

    animation: 1s blink ease infinite;

    @keyframes "blink" {
      from, to {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
    }
`;

const UserCard = ({name, lastTalked, lastMessage, openUserChat, isOnline}: UserCardProps) => {
    const lastTalkedTime = new Date(lastTalked).toLocaleDateString('en-GB', {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    }).replaceAll('/', '-');

    const removeEmailProvider = (userEmail: string): string => {
        return userEmail.split('@')[0];
    };

    return (
        <UserCardContainer onClick={() => openUserChat()}>
            <ProfilePicture src={ProfilePic} alt={"Profile Icon"}/>
            <Flex flexDirection={'column'} ml={`clamp(0.5rem, ${px2vw(16)}, 1rem)`}>
                <Flex justify={'space-between'} align={"center"}>
                    <UserName>{removeEmailProvider(name)}</UserName>
                    <div>{lastTalkedTime}</div>
                </Flex>
                <Flex justify={'space-between'} align={"center"}>
                    {trimStringToLength(lastMessage, 30)}
                    {isOnline && <BlinkingDot/>}
                </Flex>
            </Flex>
        </UserCardContainer>
    );
};

export default UserCard;