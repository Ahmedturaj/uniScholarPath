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
import ViewDetail from "../Pages/ViewDetail/ViewDetail";
import Payment from "../Pages/Payment/Payment";
import ScholarshipApplication from "../Pages/ScholarshipApplication/ScholarshipApplication";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import AdminModeratorRoutes from "./AminModeratorRoutes/AdminModeratorRoutes";
import StudentRoutes from "./StudentRoutes/StudentRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            { path: '/', element: <Home></Home> },
            {
                path: '/all-scholarship',
                element: <AllScholarship></AllScholarship>
            },
            {
                path: '/detail/:id',
                element: <PrivateRoutes><ViewDetail></ViewDetail></PrivateRoutes>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/scholarships/${params.id}`, { credentials: 'include' })
            },
            {
                path: '/payment/:id',
                element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
            },
            {
                path: '/scholarship-application/:id',
                element: <PrivateRoutes><ScholarshipApplication></ScholarshipApplication></PrivateRoutes>
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
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // admin paths
            {
                path: 'adminProfile',
                element: <AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>
            },
            {
                path: 'users',
                element: <AdminRoutes><ManageUser></ManageUser></AdminRoutes>
            },
            {
                path: 'add-scholarship',
                element: <AdminModeratorRoutes><AddScholarship></AddScholarship></AdminModeratorRoutes>
            },
            {
                path: 'manage-scholarship',
                element: <AdminModeratorRoutes><ManageScholarship></ManageScholarship></AdminModeratorRoutes>
            },
            {
                path: 'manage-applied',
                element: <AdminModeratorRoutes><ManageApplied></ManageApplied></AdminModeratorRoutes>
            },
            {
                path: 'manage-review',
                element: <AdminModeratorRoutes><ManageReview></ManageReview></AdminModeratorRoutes>
            },

            // moderator
            {
                path: 'moderatorProfile',
                element: <AdminModeratorRoutes><ModeratorProfile></ModeratorProfile></AdminModeratorRoutes>
            },

            // student
            {
                path: 'my-profile',
                element: <StudentRoutes><MyProfile></MyProfile></StudentRoutes>
            },
            {
                path: 'my-application',
                element: <StudentRoutes><MyApplication></MyApplication></StudentRoutes>
            },
            {
                path: 'my-review',
                element: <StudentRoutes><MyReview></MyReview></StudentRoutes>
            }
        ]
    }
])