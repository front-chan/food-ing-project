import { configureStore } from "@reduxjs/toolkit";
import recipes from "../modules/recipeSlice";
import recipeSlice from "../modules/recipeSlice";
import counter from "../modules/counterSlice";

const store = configureStore({
  reducer: { recipes, counter },
  recipeSlice,
  // {} μμ reviews μΆκ°
});

export default store;
