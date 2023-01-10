import styled from "styled-components";
import {Flex} from "../Flex";

export const ModalOverlay = styled.div`
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

export const ModalContainer = styled(Flex)`
    border: 5px solid #b2cdf7;
    border-radius: 1.5rem;
    background: #dadada;
    color: #000000;
    padding: 1.5rem;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
`;

export const ModalTitle = styled.div`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

export const ModalButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 12px;
  background: #b0c0f0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #666666;
  &:hover {
    color: #000000;
    background: #b2cdf7;
  }
`;

export const StyledInput = styled.input`
    margin-top: 0.5rem;
    padding: 0 20px;
    width: 100%;
    height: 1.5rem;
    border-radius: 20px;
    border: 2px solid #b2cdf7;
    outline: none;
    text-align: center;
`;