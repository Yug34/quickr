import React, {SyntheticEvent} from "react";
import * as Styles from "./Modal.Styles";

interface CommonModalProps {
    closeModal(e: SyntheticEvent): void;
    children: React.ReactNode;
}

const CommonModal = ({ closeModal, children }: CommonModalProps) => {
    return (
        <Styles.ModalOverlay onClick={closeModal}>
            <Styles.ModalContainer>
                {children}
            </Styles.ModalContainer>
        </Styles.ModalOverlay>
    );
};

export default CommonModal;