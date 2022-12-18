import { configureStore } from "@reduxjs/toolkit";
import recipes from "../modules/recipeSlice";
import recipeSlice from "../modules/recipeSlice";
import counter from "../modules/counterSlice";
import reviews from "../modules/reviewSlice";

const store = configureStore({
  reducer: { recipes, counter, reviews },
  recipeSlice,
  // {} 안에 reviews 추가
});

export default store;
