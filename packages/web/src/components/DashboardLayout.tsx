import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { Colors } from "../styles/Colors";
import * as Auth from "../utils/Auth";

const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  background-color: ${Colors.White};
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

type DashboardLayoutProps = {
  children: React.ReactNode,
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    const token = Auth.getToken();
    if(!token) {
      history.replace('/login');
    }
  }, []);

  return (
    <Container>
      {/* <MainNavigation /> */}
      <Content>{children}</Content>
    </Container>
  );
};

export default DashboardLayout;
