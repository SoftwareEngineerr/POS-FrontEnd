import axios from "axios";

export const GetRequest = (
  url: string,
  token?: string,
  type?: string
) => {
  return async (dispatch: any) => {
    try {

      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });

      if (res.status === 200 || res.status === 304) {

        if (type) {
          dispatch({
            type: type,
            response: res.data
          });
        }

        return res.data;
      }

    } catch (err: any) {

      const message =
        err?.response?.data ||
        err?.message ||
        "Server Error";

      const status =
        err?.response?.status || 500;

      console.error("GET ERROR:", message);

      dispatch({
        type: "SHOW_MODAL",
        response: message,
        status: status
      });

      return null;
    }
  };
};