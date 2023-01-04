import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import CommonModal from "../Common/CommonModal";

interface UserType {
    userUID: string;
    email: string;
}

interface ModalProps {
    closeModal: any;
    addFriend: any;
    user: null | UserType;
    noSuchUserFound: boolean;
    sameUID: boolean;
}

const AddTitle = styled.div`
    font-size: 1.5rem;
`;

const FriendModal = ({closeModal, addFriend, user, noSuchUserFound, sameUID}: ModalProps) => {
    const friendUIDRef = React.createRef<HTMLInputElement>();

    return (
        <CommonModal closeModal={closeModal}>
            <AddTitle>Add a friend</AddTitle>
            <input ref={friendUIDRef} type={"text"} name={"friendUID"}/>

            <button onClick={(e: SyntheticEvent) => addFriend(e, friendUIDRef.current!.value, user)}>
                Add friend
            </button>

            {noSuchUserFound && "No user found with that UUID"}
            {sameUID && "That's your own user ID stop testing me :("}
        </CommonModal>
    );
};

export default FriendModal;