import React, { SyntheticEvent, useCallback, useState} from "react";
import styled from "styled-components";
import CommonModal from "../index";
import * as Styles from "../Modal.Styles";

interface LoginModalProps {
    closeModal(e: SyntheticEvent): void;
    createAccount(e: SyntheticEvent, email: string, password: string): void;
    signIn(e: SyntheticEvent, email: string, password: string): void;
}

const Note = styled.small`
    text-decoration: underline;
    cursor: pointer;
    margin-top: 0.5rem;
    font-weight: 600;
`;

const LoginModal = ({createAccount, closeModal, signIn}: LoginModalProps) => {
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
            <Styles.ModalTitle>{signUpMode ? "Sign-up" : "Login"}</Styles.ModalTitle>

            Email:
            <Styles.StyledInput ref={emailRef} type={"email"} name="email"/>
            Password:
            <Styles.StyledInput ref={passwordRef} type={"password"} name="password"/>

            <Styles.ModalButton onClick={(e) => handleSignUpLoginClick(e, emailRef.current!.value, passwordRef.current!.value, signUpMode)}>{signUpMode ? "Create Account" : "Log into account"}</Styles.ModalButton>

            {signUpMode ? (
                <Note onClick={toggleSignUpMode}>Already have an account? Click here to log in!</Note>
            ) : (
                <Note onClick={toggleSignUpMode}>Don't have an account? Click here to create one!</Note>
            )}
        </CommonModal>
    );
};

export default LoginModal;