import { Navigate, Outlet } from 'react-router';
import { RouteHeader } from '../constant/routeAndHeader';
import FullLayout from '../layouts/full/FullLayout';


const func = () =>{
  const getdata = RouteHeader().router
  return getdata
}
const routesData = func();   // ← FIX: CALL ONLY ONCE\\

export const Routering = [
  {
    path: '/',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      ...routesData.SinglePage
    ]
  },
  {
    path: '/Private/',
    element: <div id="fullLayout"><FullLayout /></div>,
    children: [
      ...routesData.Menu
    ]
  }
];
