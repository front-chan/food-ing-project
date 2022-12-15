import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../components/button/Button";

const Home = () => {
  const navigate = useNavigate();
  const linkGo = () => navigate("/lists");

  return (
    <StDiv background>
      <StDiv>
        <Button home onClick={linkGo}>
          Go to Food-ing
        </Button>
      </StDiv>
    </StDiv>
  );
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 82.5vh;
  ${(props) =>
    props.background &&
    css`
      width: 100%;
      background-image: url("https://cdn.discordapp.com/attachments/1037267111585792020/1051759567433896046/KakaoTalk_Photo_2022-12-12-16-16-40.jpeg");
      background-size: cover;
      opacity: 60%;
    `}
`;

export default Home;
