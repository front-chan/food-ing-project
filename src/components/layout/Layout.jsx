import React from "react";
import Header from "../header/Header";
import styled from "styled-components";

const FooterStyles = {
  width: "100%",
  height: "100px",
  display: "flex",
  background: "black",
  color: "white",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  textAlign: "center",
};

const layoutStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  minHeight: "82.5vh",
};

const Footer = () => {
  return (
    <div style={{ ...FooterStyles }}>
      <Stspan>
        copyright ©️ 10기 C반 1조 <br />| 김세연 | 정상욱 | 최신영 |
      </Stspan>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ ...layoutStyles }}>{children}</div>
      <Footer />
    </div>
  );
};
const Stspan = styled.span`
  font-family: "Dongle", sans-serif;
`;
export default Layout;
