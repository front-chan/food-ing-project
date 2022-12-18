import styled from "styled-components";
import List from "../components/list/List";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Button from "../components/button/Button";
import { __getRecipe } from "../redux/modules/recipeSlice";

const RecipeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recipeList = useSelector((state) => state.recipes.recipes);
  console.log("recipeList: ", recipeList);

  useEffect(() => {
    dispatch(__getRecipe());
    console.log("hi");
  }, [dispatch]);

  return (
    <div>
      <Stimg>
        <Wrapimg>
          <Title>
            <h1>Recipe Community</h1>
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
            {recipeList.map((recipe) => (
              <List key={recipe.id} recipes={recipe} />
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
