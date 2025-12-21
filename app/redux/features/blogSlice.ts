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

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
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

interface CategoryData {
  statusCode: number;
  success: boolean;
  message: string;
  result: Category[];
}

interface StateType {
  loading: boolean;
  data: Data | null;
  categoryData: CategoryData | null;
  error: string | null;
  refresh: boolean;
}

const initialState: StateType = {
  loading: false,
  data: null,
  categoryData: null,
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

// Categories
export const getAllCategories = createAsyncThunk(
  "blog/getAllCategories",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/blogs/category/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get category data"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "blog/createCategory",
  async (
    { token, formPayload }: { token: string | null; formPayload: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/blogs/category/create`,
        token,
        "application/json", // Typically JSON for categories unless image upload is involved
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "blog/updateCategory",
  async (
    { token, formPayload }: { token: string | null; formPayload: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "put",
        `${baseUrl}/api/blogs/category/update`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update category"
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
      })
      // Categories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCategories.fulfilled,
        (state, action: PayloadAction<CategoryData>) => {
          state.loading = false;
          state.categoryData = action.payload;
        }
      )
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<CategoryData>) => {
        state.loading = false;
        state.refresh = !state.refresh;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<CategoryData>) => {
        state.loading = false;
        state.refresh = !state.refresh;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      });
  },
});

export default blogSlice.reducer;
