import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { apis } from "../../lib/axios";
import axios from "axios";
//import { createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  recipes: [],
  reviews: [],
  isLoding: true,
  error: null,
};

// 데이터 불러오기
export const __getRecipe = createAsyncThunk(
  "getRecipe",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3002/recipes");
      console.log("payload: ", payload);
      console.log("data: ", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// 해당 아이디 값 데이터 불러오기 (안먹힘 필요없음)
export const __getIdRecipe = createAsyncThunk(
  "getIdRecipe",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:3002/recipes/${payload}`);
      console.log("payload: ", payload);
      console.log("data: ", data.data);
      // const getId = data.data.filter((recipe) => recipe.id === payload)[0];
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// 데이터 추가
export const __addRecipe = createAsyncThunk(
  "addRecipe",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3002/recipes", payload);
      console.log("payload: ", payload);
      console.log("data: ", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// 데이터 삭제
export const __deleteRecipe = createAsyncThunk(
  "deleteRecipe",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `http://localhost:3002/recipes/${payload}`
      );
      console.log("payload: ", payload);
      console.log("data: ", data.data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// 데이터 수정
export const __editRecipe = createAsyncThunk(
  "editRecipe",
  async (payload, thunkAPI) => {
    try {
      const [recipeId, recipe] = payload;
      const data = await axios.patch(
        `http://localhost:3002/recipes/${recipeId}`,
        recipe
      );
      console.log("payload: ", payload);
      console.log("data: ", data.data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: {
    // 리스트 불러오기 ---------------
    [__getRecipe.pending]: (state) => {
      state.isLoading = true;
      // 네트워크 요청 시작-> 로딩 true 변경합니다.
    },
    [__getRecipe.fulfilled]: (state, action) => {
      // action으로 받아온 객체를 store에 있는 값에 넣어준다
      state.isLoading = false;
      state.recipes = action.payload;
    },
    [__getRecipe.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // 에러 발생-> 네트워크 요청은 끝,false
      // catch 된 error 객체를 state.error에 넣습니다.
    },

    // 해당 id 리스트만 불러오기
    [__getIdRecipe.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getIdRecipe.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.recipes = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getIdRecipe.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    // 레시피 추가
    [__addRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [__addRecipe.fulfilled]: (state, action) => {
      // 액션으로 받은 값 = payload 추가해준다.
      console.log("action: ", action.payload);
      state.isLoading = false;
      state.recipes = [...state.recipes, action.payload];
    },
    [__addRecipe.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 레시피 삭제 ------------------
    [__deleteRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteRecipe.fulfilled]: (state, action) => {
      // 미들웨어를 통해 받은 action값이 무엇인지 항상 확인한다
      console.log("action: ", action.payload);
      state.isLoading = false;
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    [__deleteRecipe.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 레시피 수정
    [__editRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [__editRecipe.fulfilled]: (state, action) => {
      // console.log('state-store값',state.diary)
      console.log("action-서버값", action);
      state.isLoading = false;
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload[0]
      );
      state.recipes.splice(index, 1, action.payload[1]);
    },
    [__editRecipe.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = recipesSlice.actions;
export default recipesSlice.reducer;
