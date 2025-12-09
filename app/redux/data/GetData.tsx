import axios from "axios";

type Params = {
  [key: string]: any;
};

export const apiRequest = async (
  method: "get" | "post" | "delete" | "put",
  url: string,
  token: string | null,
  contentType: string = "application/json",
  params: Params = {},
  formData?: any
) => {
  console.log("p", params);
  try {
    const { data } = await axios({
      method,
      url,
      params, // ✅ only for GET
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
        "Content-Type": contentType,
      },
      data: formData, // ✅ only for POST/DELETE
    });
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      }; // ✅ plain JSON
    }
    return {
      success: false,
      message: "Unexpected error",
    };
  }
};
