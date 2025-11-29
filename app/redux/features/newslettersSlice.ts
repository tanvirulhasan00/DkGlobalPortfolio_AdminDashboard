import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/route-components/data";

import { apiRequest } from "~/redux/data/GetData";

export type Newsletters = {
  id: number;
  email: string;
  isActive: string;
};
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: Newsletters[];
}
interface StateType {
  loading: boolean;
  data: Data | null;
  error: string | null;
  statusChange: boolean;
}
const initialState: StateType = {
  loading: false,
  data: null,
  error: null,
  statusChange: false,
};

export const getAllNewsletters = createAsyncThunk(
  "newsletters/getAllNewsletters",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/newsletters/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get newsletters data"
      );
    }
  }
);

export const updateNewsletters = createAsyncThunk(
  "newsletters/updateNewsletters",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "put",
        `${baseUrl}/api/newsletters/update`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update newsletters"
      );
    }
  }
);

const newslettersSlice = createSlice({
  name: "newsletters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNewsletters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllNewsletters.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllNewsletters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateNewsletters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateNewsletters.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(updateNewsletters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newslettersSlice.reducer;
