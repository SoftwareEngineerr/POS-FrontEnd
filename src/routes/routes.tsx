import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Outlet } from "react-router";
import { RouteHeader } from "../constant/routeAndHeader";
import FullLayout from "../layouts/full/FullLayout";
import Login from "../veiws/website/Login/login";

import { Navigate } from "react-router-dom";

export const useAppRoutes = () => {
  const role = useSelector((state: any) => state.LoginState?.data?.user?.role);
  
  return useMemo(() => {
    const routesData = RouteHeader();
    console.log(role , routesData.router?.Menu?.[role?.toUpperCase()])

    return [
      // 🔥 PUBLIC ROUTES (ALWAYS AVAILABLE)
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/",
        element: <Navigate to="/login" />
      },

      // 🔥 PRIVATE ROUTES (ROLE BASED)
      {
        path: "/Private/",
        element: <FullLayout />,
        children: role
          ? routesData.router?.Menu?.[role?.toUpperCase()] || []
          : []
      }
    ];
  }, [role]);
};