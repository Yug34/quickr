import React from "react";
import * as Styles from "./Modal.Styles";

interface CommonModalProps {
    closeModal: any;
    children: React.ReactNode;
}

const CommonModal = ({ closeModal, children }: CommonModalProps) => {
    return (
        <Styles.ModalOverlay onClick={closeModal}>
            <Styles.InputContainer>
                {children}
            </Styles.InputContainer>
        </Styles.ModalOverlay>
    );
};

export default CommonModal;