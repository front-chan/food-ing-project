import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { apis } from "../../lib/axios";
import Button from "../button/Button";
// import Form from "../form/Form";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { apis, __getRecipes } from "../../redux/modules/recipeSlice";
// import { addRecipe } from "../../redux/modules/recipeSlice";
// import { postCreators } from "../../redux/modules/recipeSlice";

const Board = () => {
  // const dispatch = useDispatch();
  // const list = useSelector((state) => state);
  // console.log("list: ", list);
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    imgurl: "",
    recipe: "",
    count: 0,
  });
  const [recipes, setRecipes] = useState([]);
  // console.log("recipes: ", recipes);

  // const { data } = dispatch(__getRecipes());
  // console.log("BoardData: ", data);
  // const recipes = useSelector((state) => state);
  // console.log("recipes: ".recipes);

  // 데이터 처음 한번만 가져오기
  useEffect(() => {
    apis
      .getRecipes()
      .then((res) => {
        const get = res.data;
        setRecipes(get);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const onSubmitHandler = (recipe) => {
    apis
      .createRecipes(recipe)
      .then((res) => {
        // window.location.href = "/lists";
        // console.log("test res: ", res);
        // console.log("test recipe: ", recipe);
        // dispatch(addRecipe([...recipe, res]));
        // setRecipes([...recipes, recipe]);
      })
      .catch((err) => {
        // console.log(err);
      });

    // axios.post("http://localhost:3000/recipes", recipe);
    // setRecipes([...recipes, recipe]);
    // try {
    //   // 새로고침 되었을 때 경로 이동
    //   window.location.href = "/lists";
    // } catch (error) {
    //   console.log(error);
    // }
  };

  /*
  useEffect(() => {
    dispatch(__getRecipes());
  }, [dispatch]);
*/
  /*
  // 코드복사 12~15까지
  const fetchRecipes = async () => {
    const { data } = await axios.get("http://localhost:3000/recipes");
    setRecipes(data);
  };

  const onSubmitHandler = (recipe) => {
    axios.post("http://localhost:3000/recipes", recipe);
    setRecipes([...recipes, recipe]);
    try {
      // 새로고침 되었을 때 경로 이동
      window.location.href = "/lists";
    } catch (error) {
      console.log(error);
    }
  };

  // 코드복사 26~27까지
  useEffect(() => {
    fetchRecipes();
  }, []);
*/

  return (
    // <Form
    //   onSubmitHandler={onSubmitHandler}
    //   recipe={recipe}
    //   setRecipe={setRecipe}
    // ></Form>
    <StDiv>
      <StForm
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(recipe);
          navigate("/lists");
        }}
      >
        <StH1>당신의 레시피를 추천해주세요!</StH1>
        <StLabel htmlFor="title">Title</StLabel>
        <StInput
          type="text"
          name="title"
          id="title"
          required
          maxLength={10}
          minLength={3}
          placeholder="추천하고 싶은 레시피가 있나요?"
          onChange={(ev) => {
            const { value } = ev.target;
            setRecipe({
              ...recipe,
              id: Math.floor(Math.random() * 10000),
              title: value,
            });
          }}
        />
        <StLabel htmlFor="url">Image URL</StLabel>
        <StInput
          required
          placeholder="이미지 주소를 붙여넣어 주세요!"
          type="text"
          name="url"
          id="url"
          onChange={(ev) => {
            const { value } = ev.target;
            setRecipe({
              ...recipe,
              id: Math.floor(Math.random() * 10000),
              imgurl: value,
            });
          }}
        />
        <StLabel htmlFor="recipe">Recipe</StLabel>
        <StTextarea
          required
          maxLength={200}
          placeholder="레시피를 자세히 소개해주세요!"
          name="recipe"
          id="recipe"
          cols="40"
          rows="10"
          onChange={(ev) => {
            const { value } = ev.target;
            setRecipe({
              ...recipe,
              id: Math.floor(Math.random() * 10000),
              recipe: value,
            });
          }}
        ></StTextarea>
        <div>
          <Button add>Add Recipe</Button>
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
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <p>{recipe.id}</p>
            <h1>{recipe.title}</h1>
            <h3>{recipe.recipe}</h3>
            <img src={recipe.imgurl} alt="이미지" />
          </div>
        ))}
      </div> */}
      </StForm>
    </StDiv>
  );
};

const StDiv = styled.div`
  max-width: 700px;
  width: 95%;
  min-height: 82.5vh;
  /* filter: brightness(1); */
  background-image: url("https://media.discordapp.net/attachments/1037267111585792020/1052637612629823518/image0.jpg");
  /* background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.096),
      rgba(0, 0, 0, 0.105)
    ),
    url("https://media.discordapp.net/attachments/1037267111585792020/1052637612629823518/image0.jpg"); */
  background-size: cover;
  opacity: 0.8;
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
  text-align: center;
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

export default Board;
