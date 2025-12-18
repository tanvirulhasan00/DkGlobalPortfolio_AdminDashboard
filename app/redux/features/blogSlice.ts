import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/route-components/data";

import { apiRequest } from "~/redux/data/GetData";

export type Author = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  posts: any[];
};

interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: Author[];
}

interface StateType {
  loading: boolean;
  data: Data | null;
  error: string | null;
  refresh: boolean;
}

const initialState: StateType = {
  loading: false,
  data: null,
  error: null,
  refresh: false,
};

export const getAllAuthors = createAsyncThunk(
  "blog/getAllAuthors",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/blogs/author/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get author data"
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllAuthors.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;
