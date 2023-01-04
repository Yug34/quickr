export interface FriendsType {
    lastMessage: string;
    email: string;
    timeStamp: number;
    friendUID: string;
    isOnline: boolean;
}

export interface UserType {
    userUID: string;
    email: string;
    isOnline: boolean;
}

export interface MessageType {
    message: string;
    author: string;
    timeStamp: number;
    status: "sent" | "delivered" | "read";
}