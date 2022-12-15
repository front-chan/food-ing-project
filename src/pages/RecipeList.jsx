import styled from "styled-components";
import List from "../components/list/List";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button/Button";

const RecipeList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  // console.log(recipes);

  const fetchRecipes = async () => {
    const { data } = await axios.get("http://localhost:3005/recipes");
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <Stimg>
        <Wrapimg>
          <Title>
            <h1> Recipe Community</h1>
          </Title>
          <Nbutton>
            <Button
              post
              onClick={() => {
                navigate("/board");
              }}
            >
              new Post
            </Button>
          </Nbutton>

          <Card>
            {recipes.map((recipe) => (
              <List key={recipe.id} recipelist={recipe} />
            ))}
          </Card>
        </Wrapimg>
      </Stimg>
    </div>
  );
};

const Title = styled.div`
  color: #056683;
  text-align: center;
  font-family: "Kalam", cursive;
`;
const Nbutton = styled.div`
  margin-bottom: -40px;
  text-align: right;
`;

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-family: "Nanum Gothic", sans-serif;
`;
const Wrapimg = styled.div`
  width: 1105px;
  min-height: 400px;
`;
const Stimg = styled.div`
  background-image: url("https://cdn.discordapp.com/attachments/1047386886269829182/1051905388976550018/pngegg.png");
  background-repeat: no-repeat;
  background-size: fill;
  background-position: center;
`;
export default RecipeList;
