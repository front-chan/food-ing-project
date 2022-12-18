// action -> dispatch -> thunk(서버랑 통신, 데이터) -> reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  todos: [],
  isLoading: false,
  error: {},
  detailTodo: {},
  comment: [
    { title: "제목1", content: "ddd" },
    { title: "제목2", content: "d2dd" },
    { title: "제목3", content: "d3dd" },
  ],
};
// thunk 함수
export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      // await axios.get("http://localhost:3001/todos");
      const data = await axios.get("http://localhost:3001/todos");
      console.log({ data });
      return thunkAPI.fulfillWithValue(data.data); // 서버 응답 받기 성공
    } catch (error) {
      return thunkAPI.rejectWithValue(error); // 서버 응답 받기 실패(서버 측 에러, 우리(요청) 측 잘못)
    }
  }
);
// export const __getState = createAsyncThunk("getState",
// async(payload, thunkAPI)=>{
//     try{
//         const data = await axios.get("http://localhost:3001/todos")  --> response
//     }catch(error){
//     }
// })
export const __addTodos = createAsyncThunk(
  "addTodos",
  async (payload, thunkAPI) => {
    try {
      console.log({ payload });
      const data = await axios.post("http://localhost:3001/todos", {
        ...payload,
        isDone: false,
      });
      console.log({ data });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __deleteTodos = createAsyncThunk(
  "deleteTodos",
  async (payload, thunkAPI) => {
    try {
      console.log({ payload });
      const data = await axios.delete(`http://localhost:3001/todos/${payload}`);
      console.log({ data });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __toggleStatusTodo = createAsyncThunk(
  "toggleStatusTodo",
  async (payload, thunkAPI) => {
    try {
      console.log({ payload });
      payload = {
        id: 2,
        title: "rhdq",
        content: "dkdk",
        isDone: false,
      };
      const data = await axios.put(
        `http://localhost:3001/todos/${payload.id}`,
        {
          ...payload,
          isDone: !payload.isDone,
        }
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getTodoById = createAsyncThunk(
  "getTodoById",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:3001/todos/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __addComment = createAsyncThunk(
  "addComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`http://localhost:3001/comment`, {
        todoId: payload.id,
        content: payload.content,
        title: payload.title,
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getComment = createAsyncThunk(
  "getComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/comment?todoId=${payload}`
      );
      return thunkAPI.fulfillWithValue(data.data); // 서버 응답 받기 성공
    } catch (error) {
      return thunkAPI.rejectWithValue(error); // 서버 응답 받기 실패(서버 측 에러, 우리(요청) 측 잘못)
    }
  }
);
export const __editComment = createAsyncThunk(
  "editComment",
  async (payload, thunkAPI) => {
    try {
      console.log({ payload });
      const data = await axios.patch(
        `http://localhost:3001/comment/${payload.id}`,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// createSlice api 이용해서 action value, action creator, reducer 하나로!!
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      console.log({ action });
      state.isLoading = false;
      state.todos = action.payload;
      //   console.log("fullfilled 상태", { state }, action); // Promise가 fullfilled일 때 dispatch
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__addTodos.fulfilled]: (state, action) => {
      console.log({ action });
      state.isLoading = false;
      state.todos.push(action.payload);
    },
    [__addTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodos.fulfilled]: (state, action) => {
      console.log({ action });
      state.isLoading = false;
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    [__deleteTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__toggleStatusTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__toggleStatusTodo.fulfilled]: (state, action) => {
      console.log({ action });
      state.isLoading = false;
      state.todos = state.todos.map((t) => {
        if (t.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return t;
        }
      });
    },
    [__toggleStatusTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodoById.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodoById.fulfilled]: (state, action) => {
      console.log({ action });
      state.isLoading = false;
      state.detailTodo = action.payload;
    },
    [__getTodoById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = state.comment.map((c) => {
        if (c.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return c;
        }
      });
    },
    [__editComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {} = todosSlice.actions;
export default todosSlice.reducer;
