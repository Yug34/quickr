import React, { SyntheticEvent } from "react";
import CommonModal from "../index";
import * as Styles from "../Modal.Styles";

interface UserType {
    userUID: string;
    email: string;
}

interface FriendModalProps {
    closeModal(e: SyntheticEvent): void;
    addFriend(e: SyntheticEvent, friendUID: string, user: UserType): void;
    user: null | UserType;
    noSuchUserFound: boolean;
    sameUID: boolean;
}

const FriendModal = ({closeModal, addFriend, user, noSuchUserFound, sameUID}: FriendModalProps) => {
    const friendUIDRef = React.createRef<HTMLInputElement>();

    return (
        <CommonModal closeModal={closeModal}>
            <Styles.ModalTitle>Add a friend</Styles.ModalTitle>
            <Styles.StyledInput ref={friendUIDRef} type={"text"} name={"friendUID"}/>

            <Styles.ModalButton
                onClick={(e: SyntheticEvent) => addFriend(e, friendUIDRef.current!.value, user!)}
            >
                Add friend
            </Styles.ModalButton>

            {noSuchUserFound && "No user found with that UUID"}
            {sameUID && "That's your own user ID stop testing me :("}
        </CommonModal>
    );
};

export default FriendModal;