import { useState } from "react";
import { RouteHeader } from "../../../constant/routeAndHeader";
import { useSelector } from "react-redux";

const Menuitems = () => {
  const role = useSelector((state: any) => state.LoginState?.data?.user?.role);

  const routesData = RouteHeader();

  const safeRole = role?.toUpperCase();

  const data = routesData.router?.Menu?.[safeRole] || [];

  return data;
};

export default Menuitems;
