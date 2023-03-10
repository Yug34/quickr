//bug reproduction:
//  2 friends: user1, user2
//  user2 removes user1 from friends (onDisconnect is canceled)
//  user1 disconnects
//  user2/friends/(user1)/isOnline = false; <--- cause of crash for user1

import React, {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import UserCard from "../Components/UserCard";
import {Flex} from "../Components/Common/Flex";
import * as Styles from "./App.Styles";
import {database} from "../firebase";
import {get, onDisconnect, onValue, ref, set} from 'firebase/database';
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword
} from "firebase/auth";
import LoginSignupModal from "../Components/Common/CommonModal/LoginSignupModal";
import FriendModal from "../Components/Common/CommonModal/FriendModal";
import copyIcon from "../static/copyIcon.svg";
import {JoinStrings} from "../utils";
import Chat from "../Components/Chat";
import {FriendsType, MessageType, UserType} from "./App.Types";

const App = () => {
    const [user, setUser] = useState<null | UserType>(null);
    const [selectedFriend, setSelectedFriend] = useState<FriendsType | null>(null);
    const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
    const [userFriends, setUserFriends] = useState<FriendsType[]>([]);

    const [isFriendModalOpen, setIsFriendModalOpen] = useState<boolean>(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [sameUID, setSameUID] = useState<boolean>(false);
    const [noSuchUserFound, setNoSuchUserFound] = useState<boolean>(false);

    const auth = getAuth();

    useEffect(() => {
        if (selectedFriend) {
            onValue(ref(database, `chats/${JoinStrings(selectedFriend.friendUID, user!.userUID)}`), (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    //When chat has messages:
                    const chatMessages: MessageType[] = Object.values(data);
                    chatMessages.map((message: MessageType): void => {
                        if (message.author !== user?.userUID && message.status !== "unsent") {
                            set(ref(database, `chats/${JoinStrings(selectedFriend.friendUID, user!.userUID)}/${message.timeStamp}/status`), "read");
                        }
                    });
                    setChatMessages(chatMessages);
                } else {
                    //Empty chat:
                    setChatMessages([]);
                }
            });
        }
    }, [selectedFriend, user]);

    const openCreateAccountModal = useCallback((): void => {
        setIsLoginModalOpen(true);
    }, []);

    const openAddFriendModal = useCallback((): void => {
        setIsFriendModalOpen(true);
    }, []);

    const openUserChat = useCallback((friend: FriendsType): void => {
        setSelectedFriend(friend);
    }, []);

    const sendMessage = useCallback((message: string, friendUID: string, userUID: string, messageRef: React.RefObject<HTMLInputElement>): void => {
        if (message.length > 0) {
            set(ref(database, `users/${userUID}/friends/${friendUID}/lastMessage`), message);
            set(ref(database, `users/${friendUID}/friends/${userUID}/lastMessage`), message);

            set(ref(database, `chats/${JoinStrings(userUID!, friendUID)}/${Date.now()}`), {
                author: userUID,
                message: message,
                timeStamp: Date.now(),
                status: "sent"
            });

            messageRef.current!.value = "";
        }
    }, []);

    const createAccount = useCallback((e: SyntheticEvent, email: string, password: string) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsLoginModalOpen(false);
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
                        if (data.friends === undefined) {
                            setUserFriends([]);
                        } else {
                            const userFriends: FriendsType[] = Object.values(data.friends);
                            setUserFriends(userFriends);

                            userFriends.map((friend: FriendsType) => {
                                get(ref(database, `chats/${JoinStrings(user.uid, friend.friendUID)}`)).then((snapshot) => {
                                    const messages: MessageType[] = snapshot.val();
                                    //TODO:
                                    //Better way to do this?
                                    if (messages !== null) {
                                        Object.values(messages).map((message: MessageType): void => {
                                            if (message.author !== user.uid && message.status === "sent") {
                                                SetMessageStatus(user.uid, friend.friendUID, message.timeStamp, "delivered");
                                            }
                                        });
                                    }
                                }).catch((error) => console.log(error));
                            });
                        }
                    });

                    setIsLoginModalOpen(false);
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

    const removeFriend = useCallback((friendUID: string, userUID: string): void => {
        set(ref(database, `users/${userUID}/friends/${friendUID}`), null);
        set(ref(database, `users/${friendUID}/friends/${userUID}`), null);
        set(ref(database, `chats/${JoinStrings(friendUID, userUID)}`), null);

        setSelectedFriend(null);
    }, []);

    const SetMessageStatus = (userUID: string, friendUID: string, messageTimestamp: number, status: string): void => {
        set(ref(database, `chats/${JoinStrings(userUID, friendUID)}/${messageTimestamp}/status`), status);
    };

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

    const closeLoginModal = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            setIsLoginModalOpen(false);
        }
    }, []);

    const closeFriendModal = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            setIsFriendModalOpen(false);
        }
    }, []);

    const copyUUID = useCallback((userUID: string) => {
        navigator.clipboard.writeText(userUID).then(() => alert("User ID copied to clipboard!"));
    }, []);

    return (
        <Styles.Layout>
            {isLoginModalOpen && (
                <LoginSignupModal
                    signIn={signIn}
                    createAccount={createAccount}
                    closeModal={(e: SyntheticEvent) => closeLoginModal(e)}
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
                            User ID: <b style={{cursor: 'pointer'}}
                                        onClick={() => copyUUID(user!.userUID)}>{user!.userUID}</b>
                            <img style={{cursor: 'pointer'}} onClick={() => copyUUID(user!.userUID)} src={copyIcon}
                                 alt={"Copy"}/>
                        </Styles.LoggedInAs>
                        <Flex height={"100%"}>
                            <Styles.UsersContainer>
                                <Styles.AddFriendCTA onClick={openAddFriendModal}>Add a friend</Styles.AddFriendCTA>
                                <Flex flexDirection={"column"} style={{overflowY: "auto", flex: "1 1 0"}}>
                                    {userFriends.length !== 0 && userFriends.map((friend) => (
                                        <UserCard
                                            friendUID={friend.friendUID}
                                            // isOnline={friend.isOnline}
                                            openUserChat={() => openUserChat(friend)}
                                            key={friend.friendUID}
                                            name={friend.email}
                                            lastTalked={friend.timeStamp}
                                            lastMessage={friend.lastMessage}
                                        />
                                    ))}
                                </Flex>
                            </Styles.UsersContainer>
                            {selectedFriend ? (
                                <Chat
                                    removeFriend={removeFriend}
                                    user={user!}
                                    sendMessage={sendMessage}
                                    friend={selectedFriend}
                                    chatMessages={chatMessages}
                                    SetMessageStatus={SetMessageStatus}
                                />
                            ) : (
                                <Styles.SelectFriendTipContainer>
                                    <div style={{textDecoration: 'underline', margin: '0 0 1rem 0', fontWeight: 600}}>
                                        Add and select a friend to start chatting
                                    </div>
                                    {[
                                        "1. Ask for your friend's User ID.",
                                        "2. Click on the \"Add Friend\" button.",
                                        "3. Paste your friend's User ID there and add them.",
                                        "4. Now you'll be able to chat with them! :)"
                                    ].map((tip: string) => (
                                        <div key={tip}>{tip}</div>
                                    ))}
                                </Styles.SelectFriendTipContainer>
                            )}
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