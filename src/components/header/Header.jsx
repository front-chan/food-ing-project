import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <StDiv>
      <Link to={`/`}>
        <StSpan>Food-ing</StSpan>
      </Link>
      {/* <span>My Todo List</span> */}
      <StSpan>React</StSpan>
    </StDiv>
  );
};

const StDiv = styled.div`
  /* background-color: black; */
  color: white;
  /* border: 1px solid rgb(221, 221, 221); */
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  margin: 14px 0;
  font-family: "Kalam", cursive;
`;

const StSpan = styled.span`
  /* -webkit-text-decoration: none; */
  text-decoration: none;
  color: #056683;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;
export default Header;
