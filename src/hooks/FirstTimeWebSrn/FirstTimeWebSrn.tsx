import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { WebSrnStorage, WebHost } from './Websrn';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { User_Data } from '../Requests/localStroagedata';
import { checklogin } from '../../redux/actions/loginauth';

export const FirstTimeWebSrn = (props) => {
  const webSrnApi = useSelector((state) => state.Api.FirstTimeWebSrn);
  const dispatch = useDispatch();
  const WebSrn = window.location.hostname;
  const getWebSrnStorage = WebSrnStorage();
  const getWebHost = WebHost();
 // //console.log('OneTime calling  --'+ getWebHost.localeCompare(window.location.hostname))
  // //console.log( getWebHost + '---OneTime calling  --'+ window.location.hostname)
  useEffect(() => {//|| (getWebHost == null || getWebHost.localeCompare(window.location.hostname) != 0 )
    if(getWebSrnStorage == null ){
      console.error("working")
      if(webSrnApi){
      console.error("working")
      dispatch({ type: "SHOW_LOADER", Seconds: "1000" });
    const data = axios.post(webSrnApi , {WebSrn})
    .then((res)=>{
      localStorage.setItem("WebSrn",res.data.WebSrnId)
      localStorage.setItem("Host",window.location.hostname)
      dispatch({ type: "SHOW_LOADER", Seconds: "0" });
    })
  }
}

console.log(User_Data)
if(User_Data != null){
  dispatch(checklogin())
}


  }, [webSrnApi, WebSrn]); // Add dependencies if needed

  return (
    <div>
     
    </div>
  );
};
