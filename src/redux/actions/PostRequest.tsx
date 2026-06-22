import axios from "axios";

export const PostRequest = (url : any, header : any, payload : object , status :  string) => {
  return async (dispatch : any) => {
    try {
      //console.log(url , header , payload)
      dispatch({ type: "SHOW_LOADER", Seconds: "getdata" });

      const res = await axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${header}`
        }
      });

      if (res.status === 200 || res.status === 201) {
        //console.log(res);
        dispatch({
          type: 'SHOW_MODAL',
          response: res.data,
          severity: 'Success'
        });
        

        setTimeout(() => {
          dispatch({ type: "SHOW_LOADER", Seconds: '0' });
        }, 1000);

        if(status){
          return res
        }
        else{
          return res.data
        }

      }
    } catch (err : any) {
      console.error(err.response); // Log the error response for debugging
      dispatch({
        type: 'SHOW_MODAL',
        response: err.response.data || err.message,
        status: err.response ? err.response.status : '404'
      });
      setTimeout(() => {
        dispatch({ type: "SHOW_LOADER", Seconds: '0' });
      }, 1000);
    }
  };
};
