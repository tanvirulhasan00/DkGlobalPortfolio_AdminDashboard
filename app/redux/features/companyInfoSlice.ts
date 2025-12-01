import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/route-components/data";

import { apiRequest } from "~/redux/data/GetData";

export type CompanyProfile = {
  id: number;
  name: string;
  quote: string;
  shortTitle: string;
  description: string;
  email: string;
  phoneNumber: string;
  location: string;
  mapLink: string;
  secondMapLink: string;
  facebookLink: string;
  youtubeLink: string;
  linkedInLink: string;
  instagramLink: string;
  twitterLink: string;
  mission: string;
  vision: string;
  annualTurnover: number;
  numberOfEmployees: number;
  numberOfSewingPlants: number;
  numberOfSewingLines: number;
  productionCapacity: number;
  primaryMarkets: string;
  profileImages: string | null;
};

interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: CompanyProfile;
}
interface StateType {
  loading: boolean;
  data: Data | null;
  error: string | null;
  refresh: boolean;
  statusChange: boolean;
  editingField: string | null;
}
const initialState: StateType = {
  loading: false,
  data: null,
  error: null,
  refresh: false,
  statusChange: false,
  editingField: null,
};

export const getAllCompanyProfile = createAsyncThunk(
  "profile/getAllCompanyProfile",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/company-info/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get profile data"
      );
    }
  }
);

export const createCompanyProfile = createAsyncThunk(
  "profile/createCompanyProfile",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/company-info/create`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create profile"
      );
    }
  }
);
export const updateCompanyProfile = createAsyncThunk(
  "profile/updateCompanyProfile",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "put",
        `${baseUrl}/api/company-info/update`,
        token,
        "multipart/form-data",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

const companyProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setEditingField: (state, action: PayloadAction<string | null>) => {
      state.editingField = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCompanyProfile.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCompanyProfile.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
          state.refresh = !state.refresh;
        }
      )
      .addCase(createCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      })
      .addCase(updateCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCompanyProfile.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
          state.refresh = !state.refresh;
        }
      )
      .addCase(updateCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      });
  },
});

export const { setEditingField } = companyProfileSlice.actions;
export default companyProfileSlice.reducer;
