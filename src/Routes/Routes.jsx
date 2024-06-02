import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/MainLayout/Main";
import Home from "../Pages/HomePages/Home/Home";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import DashBoard from "../layout/Dashboard/Dashboard";
import AdminProfile from "../Pages/Dashboard/AdminAndModeratorDashboard/AdminProfile/AdminProfile";
import AddScholarship from "../Pages/Dashboard/AdminAndModeratorDashboard/AddScholarship/AddScholarship";
import ManageScholarship from "../Pages/Dashboard/AdminAndModeratorDashboard/ManageScholarship/ManageScholarship";
import ManageApplied from "../Pages/Dashboard/AdminAndModeratorDashboard/ManageApplied/ManageApplied";
import ManageReview from "../Pages/Dashboard/AdminAndModeratorDashboard/Managereview/ManageReview";
import ManageUser from "../Pages/Dashboard/AdminAndModeratorDashboard/ManageUser/ManageUser";
import PrivateRoutes from "./PrivateRoutes";
import MyProfile from "../Pages/Dashboard/StudentDashboard/MyProfile/MyProfile";
import MyApplication from "../Pages/Dashboard/StudentDashboard/MyApplication/MyApplication";
import MyReview from "../Pages/Dashboard/StudentDashboard/MyReview/MyReview";
import ModeratorProfile from "../Pages/Dashboard/AdminAndModeratorDashboard/ModeratorProfile/ModeratorProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            { path: '/', element: <Home></Home> },
            {
                path: '/all-scholarship',
                element: <AllScholarship></AllScholarship>
            },
            {
                path: '/signIn',
                element: <SignIn></SignIn>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            // admin paths
            {
                path: 'adminProfile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: 'users',
                element: <ManageUser></ManageUser>
            },
            {
                path: 'add-scholarship',
                element: <AddScholarship></AddScholarship>
            },
            {
                path: 'manage-scholarship',
                element: <ManageScholarship></ManageScholarship>
            },
            {
                path: 'manage-applied',
                element: <ManageApplied></ManageApplied>
            },
            {
                path: 'manage-review',
                element: <ManageReview></ManageReview>
            },

            // moderator
            {
                path:'moderatorProfile',
                element:<ModeratorProfile></ModeratorProfile>
            },

            // student
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'my-application',
                element: <MyApplication></MyApplication>
            },
            {
                path: 'my-review',
                element: <MyReview></MyReview>
            }
        ]
    }
])