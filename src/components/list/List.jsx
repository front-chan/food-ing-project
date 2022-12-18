import styled from "styled-components";
import "./List.css";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const List = (props) => {
  const navigate = useNavigate();
  console.log("props: ", props);

  return (
    <Cardcontainer>
      <div>
        <Imagecontainer src={props.recipes.imgurl} alt="" />
      </div>
      <Cardcontent>
        <Title>
          <h3>{props.recipes.title}</h3>
        </Title>
        <Body>
          <Text style={{ wordBreak: "break-all" }}>{props.recipes.recipe}</Text>
        </Body>
      </Cardcontent>
      <Btn>
        <Button
          view
          borderColor="#ddd"
          onClick={() => {
            navigate(`/lists/${props.recipes.id}`);
          }}
        >
          View More
        </Button>
      </Btn>
    </Cardcontainer>
  );
};

const Cardcontainer = styled.div`
  width: 250px;
  height: 400px;
  box-shadow: 0px 0px 15px -5px;
  transition: 0.3s;
  animation: ease-in;
  &:hover {
    transform: scale(1, 1);
    box-shadow: 0px 0px 15px 0px;
  }
  margin-top: 70px;
  margin-left: 10px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
  background-color: #ffffffd0;
`;
const Imagecontainer = styled.img`
  overflow: hidden;
  height: 200px;
  width: 250px;
  border-top-left-radius: 30px;
`;
const Cardcontent = styled.div`
  margin: 1rem 1rem 0 1rem;
  margin-top: 0.3rem;
`;
const Title = styled.div`
  color: #056683;
  text-align: center;
`;
const Body = styled.div`
  color: #056683;
`;
const Text = styled.p`
  &::-webkit-scrollbar {
    display: none;
  }
  text-overflow: ellipsis;
  overflow: scroll;
  word-break: break-word;
  height: 90px;
  margin-bottom: 0;
`;
const Btn = styled.div`
  display: flex;
  justify-content: center;
`;

export default List;
