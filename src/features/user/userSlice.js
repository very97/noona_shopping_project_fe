import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";
import { initialCart } from "../cart/cartSlice";

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {}
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token, { rejectWithValue }) => {}
);

export const logout = () => (dispatch) => {};
export const registerUser = createAsyncThunk(
  //createAsyncThunk 를 사용하는 이유?
  // 세가지를 반환한다. => 1. fending 2. 성공 : fulfilld 3. 실패 : rejected
  "user/registerUser",
  async (
    { email, name, password, navigate },
    { dispatch, rejectWithValue }
  ) => {
    try {
      //성공
      const response = await api.post("/user", { email, name, password });
      //1. 성공 토스트 메시지 보여주기
      dispatch(
        showToastMessage({ message: "회원가입 성공", status: "success" })
      );
      //2. 로그인 페이지 리다이렉트
      navigate("/login");
      return response.data.data;
    } catch (error) {
      //실패
      //1. 실패 토스트 메시지 보여주기
      dispatch(showToastMessage({ message: "회원가입 실패", status: "error" }));
      //2. 에러값을 저장한다
      return isRejectedWithValue(error.error);
    }
  }
);

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => {}
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
  },
  //reducer => async 없이 아이템 호출할 시에 사용
  //extraRuducer async 처럼 외부의 호출을 할 시에 사용
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending)
      .addCase(registerUser.fulfilled) // 성공
      .addCase(registerUser.rejected); // 실패
  },
});
export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
