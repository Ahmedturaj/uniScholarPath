import { useContext, useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaEnvelope, FaHome, FaUsers, FaWpforms, } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdFormatShapes, MdOutlinePreview, MdRateReview } from "react-icons/md";
import { SiSemanticscholar } from "react-icons/si";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useModerator from "../../Hooks/useModerator/useModerator";
import useStudent from "../../Hooks/useStudent/useStudent";

const SkeletonItem = () => (
    <div className="animate-pulse flex space-x-4 mb-4">
        <div className="rounded-full bg-gray-200 h-16 w-16"></div>
        <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);

const SkeletonMenu = () => (
    <div className="space-y-4">
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
    </div>
);

const DashBoard = () => {
    const { user, logOut } = useContext(AuthContext);
    const { isAdmin, isAdminLoading } = useAdmin();
    const { isModerator, isModeratorLoading } = useModerator();
    const { isStudent, isStudentLoading } = useStudent();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Close sidebar when navigating to a new page
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    return (
        <div className="flex min-h-full">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 w-64 min-h-full md:min-h-screen bg-blue-700 text-white transform ${isSidebarOpen ? 'translate-x-0 z-50' : '-translate-x-full'} transition-transform duration-300 lg:translate-x-0 lg:relative lg:flex-shrink-0`}
            >
                <ul className="menu p-4">
                    {isAdminLoading || isModeratorLoading || isStudentLoading ? (
                        <SkeletonMenu />
                    ) : (
                        <>
                            {user && isAdmin && !isModerator && (
                                <>
                                    <div className="flex justify-center mb-4">
                                        <img className="object-cover w-16 h-16 rounded-full" src={user?.photoURL} alt="" />
                                    </div>
                                    <li>
                                        <NavLink to="/dashboard/adminProfile" className="flex items-center">
                                            <CgProfile className="mr-2" />
                                            Your Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/add-scholarship" className="flex items-center">
                                            <IoIosAddCircleOutline className="mr-2" />
                                            Add Scholarship
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-scholarship" className="flex items-center">
                                            <SiSemanticscholar className="mr-2" />
                                            Manage Scholarship
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-applied" className="flex items-center">
                                            <MdFormatShapes className="mr-2" />
                                            Manage Applied Application
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-review" className="flex items-center">
                                            <MdOutlinePreview className="mr-2" />
                                            Manage Review
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/users" className="flex items-center">
                                            <FaUsers className="mr-2" />
                                            Manage Users
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {user && !isAdmin && isModerator && (
                                <>
                                    <div className="flex justify-center mb-4">
                                        <img className="object-cover w-16 h-16 rounded-full" src={user?.photoURL} alt="" />
                                    </div>
                                    <li>
                                        <NavLink to="/dashboard/moderatorProfile" className="flex items-center">
                                            <CgProfile className="mr-2" />
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/add-scholarship" className="flex items-center">
                                            <IoIosAddCircleOutline className="mr-2" />
                                            Add Scholarship
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-scholarship" className="flex items-center">
                                            <SiSemanticscholar className="mr-2" />
                                            Manage Scholarship
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-applied" className="flex items-center">
                                            <MdFormatShapes className="mr-2" />
                                            Manage Applied Application
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-review" className="flex items-center">
                                            <MdOutlinePreview className="mr-2" />
                                            Manage Review
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {user && isStudent && !isAdmin && !isModerator && (
                                <>
                                    <div className="flex justify-center mb-4">
                                        <img className="object-cover w-16 h-16 rounded-full" src={user?.photoURL} alt="" />
                                    </div>
                                    <li>
                                        <NavLink to="/dashboard/my-profile" className="flex items-center">
                                            <CgProfile className="mr-2" />
                                            My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/my-application" className="flex items-center">
                                            <FaWpforms />
                                            My Application
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/my-review" className="flex items-center">
                                            <MdRateReview />
                                            My Review
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </>
                    )}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/" className="flex items-center">
                            <FaHome className="mr-2" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={logOut} className="flex items-center">
                            <FaEnvelope className="mr-2" />
                            LogOut
                        </button>
                    </li>
                </ul>
            </div>

            {/* Dashboard content */}
            <div className="flex-1 p-8 lg:max-w-4xl md:max-w-2xl max-w-[360px] m-auto">
                <div className="lg:hidden fixed top-0 right-0 p-4 z-10">
                    <button onClick={toggleSidebar}>
                        <FaBars size={24} />
                    </button>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
