import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/route-components/data";

import { apiRequest } from "~/redux/data/GetData";

export type Report = {
  id: number;
  title: string;
  description: string;
  icon: string;
  pdfLink: string;
  reportCategoryId: number;
  isActive: boolean;
};
export type ReportCategory = {
  id: number;
  name: string;
  description: string;
  icon: string;
  link: string;
  isActive: boolean;
};
interface CategoryData {
  statusCode: number;
  success: boolean;
  message: string;
  result: ReportCategory[];
}
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: Report[];
}
interface StateType {
  loading: boolean;
  data: Data | null;
  categoryData: CategoryData | null;
  error: string | null;
  refresh: boolean;
  statusChange: boolean;
}
const initialState: StateType = {
  loading: false,
  data: null,
  categoryData: null,
  error: null,
  refresh: false,
  statusChange: false,
};

export const getAllReport = createAsyncThunk(
  "report/getAllReport",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/reports/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get report data"
      );
    }
  }
);

export const createReport = createAsyncThunk(
  "report/createReport",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/reports/create`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create report"
      );
    }
  }
);
export const updateReport = createAsyncThunk(
  "report/updateReport",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "put",
        `${baseUrl}/api/reports/update`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update report"
      );
    }
  }
);

// report category
export const getAllReportCategory = createAsyncThunk(
  "report-category/getAllReportCategory",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/report-category/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get report-category data"
      );
    }
  }
);

export const getReportCategory = createAsyncThunk(
  "report-category/getReportCategory",
  async (
    { token, CatId }: { token: string | null; CatId: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/report-category/get`,
        token,
        "application/json",
        { CatId },
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get report-category data"
      );
    }
  }
);

export const createReportCategory = createAsyncThunk(
  "report-category/createReportCategory",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/report-category/create`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create report-category"
      );
    }
  }
);
export const updateReportCategory = createAsyncThunk(
  "report-category/updateReportCategory",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "put",
        `${baseUrl}/api/report-category/update`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update report-category"
      );
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReport.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllReportCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllReportCategory.fulfilled,
        (state, action: PayloadAction<CategoryData>) => {
          state.loading = false;
          state.categoryData = action.payload;
        }
      )
      .addCase(getAllReportCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      })
      .addCase(updateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReport.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      });
  },
});

export default reportSlice.reducer;
