import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { apis } from "../../lib/axios";
import Button from "../button/Button";
import { __editRecipe } from "../../redux/modules/recipeSlice";

const Edit = () => {
  const dispatch = useDispatch;
  const param = useParams();
  const navigate = useNavigate();
  const [editRecipe, setEditRecipe] = useState({});

  const [recipes, setRecipes] = useState([]);
  console.log("recipes: ", recipes);

  // id값에 따라 불러오기
  useEffect(() => {
    apis
      .getIdRecipes(param.id)
      .then((res) => {
        const get = res.data;
        setRecipes(get);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [param.id]);

  // 수정하기 핸들러 apis instance 버전
  const onEditRecipe = (id, recipe) => {
    dispatch(__editRecipe([id, recipe]));
    // apis
    //   .editRecipes(id, recipe)
    //   .then((res) => {
    //     //   window.location.href = "/lists";
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //   });
  };

  return (
    <StDiv>
      <StForm>
        <StH1>레시피를 수정할 수 있습니다!</StH1>
        <StLabel htmlFor="title">Title</StLabel>
        <StInput
          type="text"
          name="title"
          id="title"
          defaultValue={recipes.title ? recipes.title : ""}
          // value={recipes.title || ""}
          onChange={(ev) => {
            const { value } = ev.target;
            setEditRecipe({
              ...editRecipe,
              title: value,
            });
          }}
        />
        <StLabel htmlFor="url">Image URL</StLabel>
        <StInput
          type="text"
          name="url"
          id="url"
          // defalutvalue={recipes.imgurl || ""}
          defaultValue={recipes.imgurl ? recipes.imgurl : ""}
          onChange={(ev) => {
            const { value } = ev.target;
            setEditRecipe({
              ...editRecipe,
              imgurl: value,
            });
          }}
        />
        <StLabel htmlFor="recipe">Recipe</StLabel>
        <StTextarea
          name="recipe"
          id="recipe"
          // value={recipes.recipe}
          defaultValue={recipes.recipe ? recipes.recipe : ""}
          cols="40"
          rows="10"
          onChange={(ev) => {
            const { value } = ev.target;
            setEditRecipe({
              ...editRecipe,
              recipe: value,
            });
          }}
        ></StTextarea>
        <div>
          <Button
            add
            onClick={(e) => {
              e.preventDefault();
              // onSubmitHandler(editRecipe);
              onEditRecipe([param.id, editRecipe]);
              navigate("/lists");
            }}
          >
            Edit Recipe
          </Button>
          {/* <Link to={`/lists`}> */}
          <Button
            back
            onClick={() => {
              navigate("/lists");
            }}
          >
            Back
          </Button>
          {/* </Link> */}
        </div>
        {/* <div>
        <div>
          <p>
            ID: <br />
            {recipes.id}
          </p>
          <h1>
            Title: <br />
            {recipes.title}
          </h1>
          <h3>
            Recipe: <br />
            {recipes.recipe}
          </h3>
          <img src={recipes.imgurl} alt="이미지" />
        </div>
      </div> */}
      </StForm>
    </StDiv>
  );
};

const StDiv = styled.div`
  max-width: 700px;
  width: 95%;
  min-height: 82.5vh;
  background-image: url("https://media.discordapp.net/attachments/1037267111585792020/1052641868619456522/image0.jpg");
  background-size: cover;
  opacity: 0.7;
`;

const StForm = styled.form`
  /* background-color: aqua; */
  max-width: 1000px;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  margin: -100px auto 0 auto;
  /* margin-top: -100px; */
`;

const StH1 = styled.h1`
  color: black;
  font-size: 50px;
  margin-bottom: 70px;
  /* background-color: #b0c4cc;
  border-radius: 20px; */
`;
const StLabel = styled.label`
  color: black;
  font-size: 20px;
  margin: 10px;
  font-weight: bold;
`;

const StInput = styled.input`
  font-weight: bold;
  color: black;
  width: 500px;
  height: 30px;
  border-radius: 10px;
  border: 0;
  border-bottom: 3px solid #4ea1ba;
  background-color: transparent;
  /* background-color: #d6edf8; */
  font-size: 20px;
  padding: 10px;

  &:focus {
    outline: none;
  }
`;

const StTextarea = styled.textarea`
  width: 500px;
  border-radius: 10px;
  border: 0;
  border-bottom: 3px solid #4ea1ba;
  background-color: #d6edf8;
  font-size: 20px;
  padding: 10px;
  opacity: 0.9;

  &:focus {
    outline: none;
  }
`;

export default Edit;
