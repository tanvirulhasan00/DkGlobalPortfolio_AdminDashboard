import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/route-components/data";
import { apiRequest } from "~/redux/data/GetData";
import { Login } from "~/redux/data/LoginData";

export interface LoginReq {
  userName: string;
  password: string;
  rememberMe: boolean;
}
interface response {
  userId: string;
  role: string;
  token: string;
  tokenExpire: string;
}
interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
}
interface UserData {
  statusCode: number;
  success: boolean;
  message: string;
  result: User;
}
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: response;
}
interface StateType {
  loading: boolean;
  data: Data | null;
  userData: UserData | null;
  error: string | null;
}
const initialState: StateType = {
  loading: false,
  data: null,
  userData: null,
  error: null,
};

export const LoginRequest = createAsyncThunk(
  "auth/login",
  async (
    {
      req,
    }: {
      req: LoginReq;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await Login(req);
      return res;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const GetUser = createAsyncThunk(
  "user/getUser",
  async (
    { UserId, token }: { UserId: string | null; token: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/auth/user/get`,
        token,
        "application/json",
        { UserId }
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get user data"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    // clear token safely
    logout: (state) => {
      // clear local storage
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("tokenExpire");
      return { ...initialState, data: null }; // reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginRequest.fulfilled, (state, action: PayloadAction<Data>) => {
        state.data = action.payload;
        if (state.data?.success) {
          localStorage.setItem("userId", state.data?.result?.userId);
          localStorage.setItem("token", state.data?.result?.token);
          localStorage.setItem("userRole", state.data?.result?.role);
          localStorage.setItem("tokenExpire", state.data?.result?.tokenExpire);
        }
        state.loading = false;
      })
      .addCase(LoginRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(GetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
