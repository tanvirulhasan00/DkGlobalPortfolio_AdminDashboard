import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/route-components/data";

import { apiRequest } from "~/redux/data/GetData";

export type ProductImage = {
  id: number;
  title: string;
  searchText: string | null;
  imageUrl: string;
  isActive: boolean;
  productId: number;
};

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  result: ProductImage[] | ProductImage; // Can be an array or single object
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

export const getAllProductImages = createAsyncThunk(
  "productImage/getAllProductImages",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/product-images/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get product image data"
      );
    }
  }
);

export const createProductImage = createAsyncThunk(
  "productImage/createProductImage",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/product-images/create`,
        token,
        "multipart/form-data",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create product image"
      );
    }
  }
);

export const updateProductImage = createAsyncThunk(
  "productImage/updateProductImage",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "put",
        `${baseUrl}/api/product-images/update-by-productid`,
        token,
        "multipart/form-data",
        {},
        formPayload
      );
      console.log(res);
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update product image"
      );
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "productImage/deleteProductImage",
  async (
    { token, id }: { token: string | null; id: number },
    { rejectWithValue }
  ) => {
    console.log(typeof id, id);
    try {
      const res = await apiRequest(
        "delete",
        // `${baseUrl}/api/product-images/delete`,
        `https://localhost:7274/api/product-images/delete?id=${id}`,
        token,
        "application/json",
        {},
        null
      );
      console.log("delete", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete product image"
      );
    }
  }
);

const productImageSlice = createSlice({
  name: "productImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllProductImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProductImages.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllProductImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductImage.fulfilled, (state) => {
        state.loading = false;
        state.refresh = !state.refresh;
      })
      .addCase(createProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductImage.fulfilled, (state) => {
        state.loading = false;
        state.refresh = !state.refresh;
      })
      .addCase(updateProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductImage.fulfilled, (state) => {
        state.loading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productImageSlice.reducer;
