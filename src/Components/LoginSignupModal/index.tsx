import { Flex } from "../Common/Flex";
import React, { SyntheticEvent, useCallback, useState} from "react";
import styled from "styled-components";
import CommonModal from "../Common/CommonModal";

interface ModalProps {
    createAccount: any;
    closeModal: any;
    signIn: any;
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
    opacity: 0.9;
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

const StyledButton = styled.button`
    margin-top: 1rem;
`;

const StyledInput = styled.input`
    width: 100%;
    outline: none;
`;

const LoginTitle = styled.div`
    font-size: 1.5rem;
`;

const Note = styled.small`
    text-decoration: underline;
    cursor: pointer;
    margin-top: 0.5rem;
    font-weight: 600;
`;

const Modal = ({createAccount, closeModal, signIn}: ModalProps) => {
    const emailRef = React.createRef<HTMLInputElement>();
    const passwordRef = React.createRef<HTMLInputElement>();

    const [signUpMode, setSignUpMode] = useState<boolean>(false);
    const toggleSignUpMode = () => setSignUpMode(!signUpMode);

    const handleSignUpLoginClick = useCallback((e: SyntheticEvent, email: string, password: string, signUpMode: boolean) => {
        if (signUpMode) {
            createAccount(e, email, password);
        } else {
            signIn(e, email, password);
        }
    }, []);

    return (
        <CommonModal closeModal={closeModal}>
            <LoginTitle>{signUpMode ? "Sign-up" : "Login"}</LoginTitle>

            Email:
            <StyledInput ref={emailRef} type={"email"} name="email"/>
            Password:
            <StyledInput ref={passwordRef} type={"password"} name="password"/>

            <StyledButton onClick={(e) => handleSignUpLoginClick(e, emailRef.current!.value, passwordRef.current!.value, signUpMode)}>{signUpMode ? "Create Account" : "Log into account"}</StyledButton>

            {signUpMode ? (
                <Note onClick={toggleSignUpMode}>Already have an account? Click here to log in!</Note>
            ) : (
                <Note onClick={toggleSignUpMode}>Don't have an account? Click here to create one!</Note>
            )}
        </CommonModal>
    );
};

export default Modal;