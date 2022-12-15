import { configureStore } from "@reduxjs/toolkit";
import recipes from "../modules/recipeSlice";
import recipeSlice from "../modules/recipeSlice";
import counter from "../modules/counterSlice";

const store = configureStore({
  reducer: { recipes, counter },
  recipeSlice,
  // {} 안에 reviews 추가
});

export default store;
