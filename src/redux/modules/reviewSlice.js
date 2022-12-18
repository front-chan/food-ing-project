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

// review 불러오기
export const __getReviews = createAsyncThunk(
  "getReviews",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `http://localhost:3002/reviews?postId=${payload}`
      );
      console.log("payload: ", payload);
      console.log("data: ", data.data);
      // const getId = data.data.filter((review) => review.postId === payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// review 추가
export const __addReviews = createAsyncThunk(
  "addReviews",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`http://localhost:3002/reviews`, payload);
      console.log("payload: ", payload);
      console.log("data: ", data.data);
      // const getId = data.data.filter((review) => review.postId === payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// review 삭제
export const __deleteReviews = createAsyncThunk(
  "deleteReviews",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `http://localhost:3002/reviews/${payload}`
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

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: {
    // 리뷰 데이터 불러오기
    [__getReviews.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getReviews.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.reviews = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getReviews.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    // 리뷰 추가
    [__addReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [__addReviews.fulfilled]: (state, action) => {
      // 액션으로 받은 값 = payload 추가해준다.
      console.log("action: ", action.payload);
      state.isLoading = false;
      state.reviews = [...state.reviews, action.payload];
    },
    [__addReviews.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 리스트 삭제 ------------------
    [__deleteReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteReviews.fulfilled]: (state, action) => {
      // 미들웨어를 통해 받은 action값이 무엇인지 항상 확인한다
      console.log("action: ", action.payload);
      state.isLoading = false;
      state.reviews = state.reviews.filter(
        (review) => review.id !== action.payload
      );
    },
    [__deleteReviews.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = recipesSlice.actions;
export default reviewSlice.reducer;
