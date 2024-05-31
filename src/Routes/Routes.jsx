import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/MainLayout/Main";
import Home from "../Pages/HomePages/Home/Home";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SignIn from "../Pages/Authentication/SignIn/SignIn";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {path:'/', element:<Home></Home>},
            {
                path:'/all-scholarship',
                element:<AllScholarship></AllScholarship>
            },
            {
                path:'/signIn',
                element:<SignIn></SignIn>
            },
        {
            path:'/signUp',
            element:<SignUp></SignUp>
        }
        ]
    }
])