import {Flex} from "../Common/Flex";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ProfilePic from "../../static/profilePicture.svg";
import {px2vw, trimStringToLength} from "../../utils";
import {onValue, ref, set} from "firebase/database";
import {database} from "../../firebase";

interface UserCardProps {
    name: string;
    lastTalked: number;
    lastMessage: string;
    openUserChat(): void;
    friendUID: string;
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

const UserCard = ({name, lastTalked, lastMessage, openUserChat, friendUID}: UserCardProps) => {
    const [isUserOnline, setIsUserOnline] = useState<boolean>(false);

    useEffect(() => {
        onValue(ref(database, `users/${friendUID}/isOnline/`), (snapshot) => {
            setIsUserOnline(snapshot.val());
        });
    }, []);

    const lastTalkedTime = new Date(lastTalked).toLocaleDateString('en-GB', {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    }).replaceAll('/', '-');

    const removeEmailProvider = (userEmail: string): string => {
        return userEmail.split('@')[0];
    };

    return (
        <UserCardContainer onClick={openUserChat}>
            <ProfilePicture src={ProfilePic} alt={"Profile Icon"}/>
            <Flex flexDirection={'column'} ml={`clamp(0.5rem, ${px2vw(16)}, 1rem)`}>
                <Flex justify={'space-between'} align={"center"}>
                    <UserName>{removeEmailProvider(name)}</UserName>
                    <div>{lastTalkedTime}</div>
                </Flex>
                <Flex justify={'space-between'} align={"center"}>
                    {trimStringToLength(lastMessage, 30)}
                    {isUserOnline && <BlinkingDot/>}
                </Flex>
            </Flex>
        </UserCardContainer>
    );
};

export default UserCard;