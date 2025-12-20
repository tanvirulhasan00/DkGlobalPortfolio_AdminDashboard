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

export const createAuthor = createAsyncThunk(
  "blog/createAuthor",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/blogs/author/create`,
        token,
        "multipart/form-data",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create author"
      );
    }
  }
);

export const updateAuthor = createAsyncThunk(
  "blog/updateAuthor",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "put",
        `${baseUrl}/api/blogs/author/update`,
        token,
        "multipart/form-data",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update author"
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
      })
      .addCase(createAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAuthor.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      })
      .addCase(updateAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAuthor.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      });
  },
});

export default blogSlice.reducer;
