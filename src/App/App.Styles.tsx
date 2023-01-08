import styled from "styled-components";
import { Flex } from "../Components/Common/Flex";
import { px2vw } from "../utils";

export const Layout = styled(Flex)`
  color: white;
  background: #F1F1F1;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: clamp(1rem, ${px2vw(2 * 16)}, 2rem);
  
  @media (max-width: 1440px) {
    padding: 0;  
  }
  
  * {
      box-sizing: border-box;
  }
`;

export const LoggedInAs = styled(Flex)`
  column-gap: 4px;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  color: #000000;
`;

export const AppContainer = styled(Flex)`
  overflow: hidden;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
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

export const AddFriendCTA = styled(Button)`
  border-radius: 12px 12px 0 0;
`;

export const SelectFriendTipContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #000000;
`;

export const UsersContainer = styled(Flex)`
  height: 100%;
  flex-direction: column;
  min-width: 400px;
  max-width: 500px;
  width: ${px2vw(500)};
`;