import { createSlice } from "@reduxjs/toolkit";

//import { createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  recipes: [
    {
      id: 1234,
      //Math.floor(Math.random() * 100000)
      title: "테서터",
      imgurl:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      recipe: "테서터",
    },
  ],
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes = [...state.recipes, action.payload];
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (list) => list.id !== action.payload
      );
    },
    changeRecipe: (state, action) => {
      state.recipes = state.recipes.map((list) => {
        // console.log(action.payload);
        return list.id === action.payload.id
          ? { ...list, done: !action.payload.done }
          : { ...list };
      });
    },
  },
});

export const { addRecipe, deleteRecipe, changeRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
