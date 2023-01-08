import styled from "styled-components";
import {Flex} from "../Common/Flex";
import React from "react";
import {px2vw} from "../../utils";

export const ChatContainer = styled(Flex)`
  border-radius: 20px;
  background: #e8e8e8;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  color: #000000;
`;

export const MessagesScrollContainer = styled(Flex)`
    flex-direction: column;
    overflow-y: auto;
    flex: 1 1 0;
`;

export const MessageWrapper = styled(Flex)<{ isOwn: boolean; }>`
    line-break: anywhere;
    width: 85%;
    align-self: ${(props) => props.isOwn ? "end" : "start"};
    justify-content: ${(props) => props.isOwn ? "flex-end" : "flex-start"};
    align-items: center;
`;

export const ChatMessageContainer = styled(Flex)<{ isOwn: boolean; }>`
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

export const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const ChatInputContainer = styled(Flex)`
    justify-content: space-between;
    align-items: center;
    height: 40px;
`;

export const StyledButton = styled.button`
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

export const ChatInput = styled.input`
    padding: 0 20px;
    width: 100%;
    height: 100%;
    border-radius: 20px 0 0 20px;
    border: 2px solid #b2cdf7;
    outline: none;
`;

export const ChatTopBar = styled(Flex)`
  background: #b2cdf7;
  border-radius: 20px 20px 0 20px;
  color: #666666;
  font-weight: 600;
  justify-content: space-between;
  height: 40px;
`;

export const UnsendCTAContainer = styled.div`
    position: relative;
    margin: 0 0.5rem 0 0.25rem;
    cursor: pointer;
`;

interface SVGProps {
    color?: string;
    size?: string;
}

export const DeleteBin = ({color, size}: SVGProps) => (
    <svg stroke={color || "currentColor"} fill={color || "currentColor"} strokeWidth="0" viewBox="0 0 24 24"
         height={size || "1em"} width={size || "1em"} xmlns="http://www.w3.org/2000/svg">
        <g>
            <path fill="transparent" d="M0 0h24v24H0z"/>
            <path
                d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"/>
        </g>
    </svg>
);

export const SentCheck = ({color, size}: SVGProps) => (
    <svg stroke={color || "currentColor"} fill={color || "currentColor"} strokeWidth="0" viewBox="0 0 512 512"
         height={size || "1em"} width={size || "1em"} xmlns="http://www.w3.org/2000/svg">
        <path
            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
    </svg>
);

export const DeliveredCheck = ({color, size}: SVGProps) => (
    <svg stroke={color || "currentColor"} fill={color || "currentColor"} strokeWidth="0.5rem" viewBox="0 0 512 512"
         height={size || "1em"} width={size || "1em"} xmlns="http://www.w3.org/2000/svg">
        <path
            d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/>
    </svg>
);

export const ReadCheck = ({color, size}: SVGProps) => (
    <svg stroke={color || "currentColor"} fill={color || "currentColor"} strokeWidth="0" viewBox="0 0 512 512"
         height={size || "1em"} width={size || "1em"} xmlns="http://www.w3.org/2000/svg">
        <path
            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>
    </svg>
);

export const ChatNotch = styled.div<{ isOwn: boolean; }>`
    width: 8px;
    height: 8px;
    position: absolute;
    bottom: ${(props) => props.isOwn ? "0" : "4px"};
    margin: ${(props) => props.isOwn ? "0 12px 0 0" : "0 0 0 16px"};
    background: linear-gradient(to bottom ${(props) => props.isOwn ? "left" : "right"}, #b2cdf7 50%, #e8e8e8 50%);
`;

export const RemoveFriendCTA = styled(Flex)`
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

export const Ring = styled.div`
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

export const SpinnerDiv = () => (
    <Ring>
        <div/>
        <div/>
        <div/>
        <div/>
    </Ring>
)