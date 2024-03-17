import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
 
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivatRoute";
import ErrorPage from "../pages/shared/ErrorPage";
 
 

  const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayOut></MainLayOut>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        // {
        //     path:'/',
        //     element:<Home></Home>
        // },
        // {
        //   path:'login',
        //   element:<Login></Login>
        // },
        // {
        //   path:'singup',
        //   element:<SingUp></SingUp>
        // },
        // {
        //   path:'about',
        //   element:<AboutUs></AboutUs>
        // },
        // {
        //   path:'services',
        //   element:<Services></Services>
        // },
        // {
        //   path:'contact',
        //   element:<Contact></Contact>
        // },
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // {
        //   path: 'users',
        //   element: <AllUsers></AllUsers>
        // },
        // {
        //   path: 'details/:id',  
        //   element: <Details></Details>,
        //   loader:({params})=>fetch(`https://assingment-12-backend.vercel.app/users/${params.id}`)
        // },
        // {
        //   path: 'employee',
        //   element: <AllEmployee></AllEmployee>,
          
        // },
      ]
    },
  ]);

  export default router;