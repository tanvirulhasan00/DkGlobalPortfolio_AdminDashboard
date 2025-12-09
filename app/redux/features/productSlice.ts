import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/route-components/data";

import { apiRequest } from "~/redux/data/GetData";

export type Product = {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  isActive: boolean;
};

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  result: Product[]; // Can be an array or single object
}

interface StateType {
  loading: boolean;
  data: ApiResponse | null;
  error: string | null;
  refresh: boolean;
}

const initialState: StateType = {
  loading: false,
  data: null,
  error: null,
  refresh: false,
};

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/products/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get product data"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/products/create`,
        token,
        "application/json",
        {},
        formPayload
      );
      console.log("p create", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "put",
        `${baseUrl}/api/products/update`,
        token,
        "application/json",
        {},
        formPayload
      );
      console.log("p update", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (
    { token, id }: { token: string | null; id: number },
    { rejectWithValue }
  ) => {
    console.log(typeof id, id);
    try {
      const res = await apiRequest(
        "delete",
        `${baseUrl}/api/products/delete`,
        token,
        "application/json",
        { id },
        null
      );
      console.log("delete", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "productImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProduct.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.refresh = !state.refresh;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.refresh = !state.refresh;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
