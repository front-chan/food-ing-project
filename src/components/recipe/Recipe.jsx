import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { apis } from "../../lib/axios";
import { HiHeart } from "react-icons/hi";
import Button from "../button/Button";
import { __getRecipe, __deleteRecipe } from "../../redux/modules/recipeSlice";
import {
  __addReviews,
  __getReviews,
  __deleteReviews,
} from "../../redux/modules/reviewSlice";

const Recipe = () => {
  //////////////레시피///////////////////
  const navigate = useNavigate();
  const param = useParams();
  console.log("param.id: ", param.id);
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  console.log("recipes: ", recipes);

  const reviews = useSelector((state) => state.reviews.reviews);
  console.log("reviews:", reviews);

  const recipeList = recipes?.find(
    (recipe) => Number(recipe.id) === Number(param.id)
  );
  console.log("recipeList: ", recipeList);
  // const r = recipes[recipeList];
  // console.log("r: ", r);
  const [review, setReview] = useState({
    title: "",
  });
  // const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   const recipeList = recipes?.find(
  //     (recipe) => recipe.id === Number(param.id)
  //   );
  //   console.log("recipeList: ", recipeList);
  //   // id값에 맞는 데이터 불러오기
  //   // dispatch(__getRecipe());
  //   // id값에 맞는 reivew값 불러오기
  //   // dispatch(__getReviews(+param.id));
  // }, []);

  // recipe 전체 삭제 핸들러 apis instance 버전
  const onDeleteRecipe = (recipeId) => {
    dispatch(__deleteRecipe(recipeId));
  };

  // const [reviews, setReviews] = useState(null);
  // console.log("reviews: ", reviews);

  useEffect(() => {
    dispatch(__getRecipe());
    dispatch(__getReviews(Number(param.id)));
  }, [param.id, dispatch]);

  const onSubmitHandler = (review) => {
    dispatch(__addReviews(review));
    // 새로고침이 안됨 렌더링 안됨
    // apis
    //   .createReiews(review)
    //   .then((res) => {
    //     // setReviews([...reviews, review]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const onClickDeleteButtonHandler = (reviewId) => {
    dispatch(__deleteReviews(reviewId));
    // apis
    //   .deleteReviews(reviewId)
    //   .then((res) => {
    //     const newReview = reviews?.filter((review) => review.id !== reviewId);
    //     // setReviews(newReview);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <StContainer>
      <StDialog>
        <div>
          <StDialogHeader>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>ID : {recipeList?.id}</div>
              <Button
                recipedel
                borderColor="#1195bd"
                onClick={() => {
                  // onDeleteRecipeHandler(param.id);
                  onDeleteRecipe(param.id);
                  navigate("/lists");
                }}
              >
                삭제하기
              </Button>
            </div>
            <div>
              <Button
                recipefix
                borderColor="#ddd"
                onClick={() => {
                  navigate(`/board/${param.id}`);
                }}
              >
                수정하기
              </Button>
              &nbsp;&nbsp;
              <Button
                recipeback
                borderColor="#ddd"
                onClick={() => {
                  navigate("/lists");
                }}
              >
                이전으로
              </Button>
            </div>
          </StDialogHeader>
          <StDiv>
            <StTitle>{recipeList?.title}</StTitle>
            <HiHeart style={{ color: "#5c94b6", cursor: "pointer" }}></HiHeart>
            <p>{recipeList?.count}</p>
          </StDiv>
          <StBody>
            <StLeftBox src={recipeList?.imgurl}></StLeftBox>
            <StRightBox>
              <StP>{recipeList?.recipe}</StP>
            </StRightBox>
          </StBody>
        </div>

        <StCommentBox>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitHandler(review);
            }}
          >
            <CommentSize>COMMENT</CommentSize>
            <StCommentFunction
              type="text"
              placeholder="코멘트를 입력하세요."
              onChange={(ev) => {
                const { value } = ev.target;
                setReview({
                  ...review,
                  id: Math.floor(Math.random() * 100000),
                  title: value,
                  postId: param.id,
                });
              }}
            />
            <Button addComment>등록</Button>
          </form>

          <CommentMarkBox>
            {reviews.map((review) => (
              <div key={review.id}>
                {review.id} :{review.title}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  commentdel
                  type="button"
                  onClick={() => onClickDeleteButtonHandler(review.id)}
                >
                  &nbsp;삭제하기&nbsp;
                </Button>
              </div>
            ))}
          </CommentMarkBox>
        </StCommentBox>
      </StDialog>
    </StContainer>
  );
};

const StContainer = styled.div`
  width: 1000px;
  height: 82.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://media.discordapp.net/attachments/1037267111585792020/1052831190404562944/image0.jpg");
  background-size: cover;
  /* opacity: 0.8; */
`;

const StDialog = styled.div`
  width: 1000px;
  height: 760px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: #eee; */
  /* @media screen and (max-width: 768px) {
    width: 95%;
  } */
`;

const StDialogHeader = styled.div`
  margin-top: 2px;
  display: flex;
  border-radius: 20px;
  height: 60px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;

const StTitle = styled.h1`
  padding: 0 24px;
  color: #022835;
`;

const StBody = styled.main`
  display: flex;
  gap: 10px;
`;

const StLeftBox = styled.img`
  /* background: #c0e9fc; */
  border-radius: 30px;
  /* float: left; */
  height: 350px;
  width: 495px;
  margin-bottom: 10px;
`;

const StRightBox = styled.div`
  background-color: #1195bd;
  color: white;
  /* font-weight: bold; */
  overflow: scroll;
  border-radius: 30px;
  /* float: right; */
  height: 350px;
  width: 495px;
  margin-bottom: 10px;
  font-size: 30px;

  //padding-top: 15px;
  &::-webkit-scrollbar {
    display: none;
  }
  /* @media screen and (max-width: 800px) {
    width: 200px;
  } */
`;

const StCommentBox = styled.div`
  margin-top: -40px;
  padding-left: 24px;

  background: #1195bd;
  border-radius: 30px;
  /* padding: 0px; */
  height: 250px;
  /* @media screen and (max-width: 800px) {
    width: 200px;
  } */
`;

const StCommentFunction = styled.input`
  width: 700px;
  height: 50px;
  font-size: 17px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
`;

const CommentMarkBox = styled.div`
  margin-top: 10px;
  overflow: scroll;
  width: 700px;
  height: 100px;
  font-size: 17px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding: 10px 2px 0 10px;
  background-color: rgb(233, 233, 233);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommentSize = styled.h2`
  font-size: 20px;
  color: white;
`;

// const StDiv = styled.div`
//   position: absolute;
//   /* top: 0;
//   left: 0; */
//   /* width: 100%; */
//   /* height: 100%; */
//   background: url(https://source.unsplash.com/random/1920x1080);
//   background-size: cover;
// `;

const StP = styled.p`
  padding-left: 25px;
`;

const StDiv = styled.div`
  display: flex;
  align-items: center;
`;

export default Recipe;
