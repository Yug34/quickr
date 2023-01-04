import styled from "styled-components";
import { Flex } from "../Flex";
import React from "react";

interface CommonModalProps {
    closeModal: any;
    children: React.ReactNode;
}

const ModalOverlay = styled.div`
    box-sizing: border-box;
    padding: 1rem;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color:#000;
    opacity: 0.95;
    z-index: 1001;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled(Flex)`
    border: 3px solid lightgreen;
    border-radius: 1.5rem;
    background: darkgreen;
    padding: 1.5rem;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
`;

const CommonModal = ({ closeModal, children }: CommonModalProps) => {
    return (
        <ModalOverlay onClick={closeModal}>
            <InputContainer>
                {children}
            </InputContainer>
        </ModalOverlay>
    );
};

export default CommonModal;