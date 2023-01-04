import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import UserCard from "../Components/UserCard";
import { Flex } from "../Components/Common/Flex";
import * as Styles from "./App.Styles";
import { database } from "../firebase";
import { get, onValue, ref, set, onDisconnect } from 'firebase/database';
import { createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";
import LoginSignupModal from "../Components/LoginSignupModal";
import FriendModal from "../Components/FriendModal";
import copyIcon from "../static/copyIcon.svg";
import { JoinStrings } from "../utils";
import Chat from "../Components/Chat";
import { FriendsType, MessageType, UserType } from "./App.Types";

const App = () => {
    const [user, setUser] = useState<null | UserType>(null);
    const [selectedFriend, setSelectedFriend] = useState<FriendsType | null>(null);
    const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
    const [userFriends, setUserFriends] = useState<FriendsType[]>([]);

    const [isFriendModalOpen, setIsFriendModalOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [sameUID, setSameUID] = useState<boolean>(false);
    const [noSuchUserFound, setNoSuchUserFound] = useState<boolean>(false);

    const auth = getAuth();

    useEffect(() => {
        if (selectedFriend) {
            onValue(ref(database, `chats/${JoinStrings(selectedFriend.friendUID, user!.userUID)}`), (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const chatMessages: MessageType[] = Object.entries(data).map(([_, value]: [string, any]): MessageType => value);
                    chatMessages.map((message: MessageType): void => {
                        if(message.author !== user?.userUID) {
                            set(ref(database, `chats/${JoinStrings(selectedFriend.friendUID, user!.userUID)}/${message.timeStamp}/status`), "read");
                        }
                    });
                    setChatMessages(chatMessages);
                }
            });
        }
    }, [selectedFriend, user]);

    const openCreateAccountModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const openAddFriendModal = useCallback(() => {
        setIsFriendModalOpen(true);
    }, []);

    const openUserChat = useCallback((friend: FriendsType) => {
        setSelectedFriend(friend);
    }, []);

    useEffect(() => {
        userFriends.map((friend): void => {
            set(ref(database, `users/${friend.friendUID}/friends/${user?.userUID}/isOnline/`), true);
            onDisconnect(ref(database, `users/${friend.friendUID}/friends/${user?.userUID}/isOnline/`)).set(false);
        });
    }, [userFriends, user?.userUID]);

    const sendMessage = useCallback((message: string, friendUID: string, userUID: string) => {
        if (message.length > 0) {
            set(ref(database, `users/${userUID}/friends/${friendUID}/lastMessage`), message);
            set(ref(database, `users/${friendUID}/friends/${userUID}/lastMessage`), message);

            set(ref(database, `chats/${JoinStrings(userUID!, friendUID)}/${Date.now()}`), {
                author: userUID,
                message: message,
                timeStamp: Date.now(),
                status: "sent"
            });
        }
    }, []);

    const createAccount = useCallback((e: SyntheticEvent, email: string, password: string) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsModalOpen(false);
                set(ref(database, `users/${user.uid}`), {
                    email: user.email,
                    uuid: user.uid,
                    timeStamp: Date.now(),
                    friends: {}
                });
            })
            .catch((error) => {
                console.log(error.code)
                console.log(error.message)
            });
    }, [auth]);

    const signIn = useCallback((e: SyntheticEvent, email: string, password: string) => {
        e.preventDefault();
        //TODO: Persistence
        setPersistence(auth, browserLocalPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUser({
                        userUID: user.uid,
                        email: user.email!,
                        isOnline: true
                    });
                    set(ref(database, `users/${user.uid}/isOnline/`), true);

                    onValue(ref(database, `users/${user.uid}`), (snapshot) => {
                        const data = snapshot.val();
                        //TODO: Fix types
                        const userFriends: FriendsType[] = Object.entries(data.friends).map(([_, value]: [string, any]) => value);
                        setUserFriends(userFriends);

                        userFriends.map((friend: FriendsType) => {
                            get(ref(database, `chats/${JoinStrings(user.uid, friend.friendUID)}`)).then((snapshot) => {
                                const messages = snapshot.val();
                                //TODO:
                                //Better way to do this?
                                Object.entries(messages).map(([_, message]: [string, any]) => {
                                    if (message.author !== user.uid && message.status === "sent") {
                                        set(ref(database, `chats/${JoinStrings(user.uid, friend.friendUID)}/${message.timeStamp}/status`), "delivered");
                                    }
                                });
                            }).catch((error) => console.log(error));
                        });
                    });

                    setIsModalOpen(false);
                    onDisconnect(ref(database, `users/${user.uid}/isOnline`)).set(false);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        });
    }, [auth]);

    const addFriend = useCallback((e: SyntheticEvent, friendUID: string, user: UserType) => {
        e.preventDefault();

        if (friendUID === user.userUID) {
            setSameUID(true);
        } else {
            get(ref(database, `users/${friendUID}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setIsFriendModalOpen(false);
                    let friend = snapshot.val();

                    set(ref(database, `users/${user.userUID}/friends/${friendUID}`), {
                        friendUID: friendUID,
                        timeStamp: Date.now(),
                        lastMessage: "",
                        email: friend.email
                    });
                    set(ref(database, `users/${friendUID}/friends/${user.userUID}`), {
                        friendUID: user.userUID,
                        timeStamp: Date.now(),
                        lastMessage: "",
                        email: user.email
                    });
                } else {
                    setNoSuchUserFound(true);
                }
            }).catch((error) => console.log(error));
        }
    }, []);

    const closeModal = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        if(e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    }, []);

    const closeFriendModal = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        if(e.target === e.currentTarget) {
            setIsFriendModalOpen(false);
        }
    }, []);

    const copyUUID = useCallback((userUID: string) => {
        navigator.clipboard.writeText(userUID).then(() => alert("User ID copied to clipboard!"));
    }, []);

    return (
        <Styles.Layout>
            {isModalOpen && (
                <LoginSignupModal
                    signIn={signIn}
                    createAccount={createAccount}
                    closeModal={(e: SyntheticEvent) => closeModal(e)}
                />
            )}
            {isFriendModalOpen && (
                <FriendModal
                    sameUID={sameUID}
                    noSuchUserFound={noSuchUserFound}
                    user={user}
                    addFriend={addFriend}
                    closeModal={(e: SyntheticEvent) => closeFriendModal(e)}
                />
            )}
            <Styles.AppContainer>
                {(user?.userUID && user?.email) ? (
                    <>
                        <Styles.LoggedInAs>
                            Logged in as <b>{user.email}</b>
                            User ID: <b style={{cursor: 'pointer'}} onClick={() => copyUUID(user!.userUID)}>{user!.userUID}</b>
                            <img src={copyIcon} alt={"Copy"}/>
                        </Styles.LoggedInAs>
                        <Flex height={"100%"}>
                            <Styles.UsersContainer>
                                <Styles.AddFriendCTA onClick={openAddFriendModal}>Add a friend</Styles.AddFriendCTA>
                                {userFriends.length !== 0 && userFriends.map((friend) => (
                                    <UserCard
                                        openUserChat={() => openUserChat(friend)}
                                        key={friend.friendUID}
                                        name={friend.email}
                                        lastTalked={friend.timeStamp}
                                        lastMessage={friend.lastMessage}
                                    />
                                ))}
                            </Styles.UsersContainer>
                            <Styles.ChatContainer>
                                {selectedFriend ? (
                                    <Chat user={user!} sendMessage={sendMessage} friend={selectedFriend} chatMessages={chatMessages} />
                                ) : (
                                    <div>Login or Sign-Up to chat!</div>
                                )}
                            </Styles.ChatContainer>
                        </Flex>
                    </>
                    ) : (
                    <Styles.Button onClick={openCreateAccountModal}>Login/Sign Up</Styles.Button>
                )}
            </Styles.AppContainer>
        </Styles.Layout>
    );
}

export default App;