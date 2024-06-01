import { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaEnvelope, FaHome, FaUsers, FaWpforms, } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdFormatShapes, MdOutlinePreview, MdRateReview } from "react-icons/md";
import { SiSemanticscholar } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useModerator from "../../Hooks/useModerator/useModerator";
import useStudent from "../../Hooks/useStudent/useStudent";

const DashBoard = () => {
    const { user, logOut } = useContext(AuthContext);
    const { isAdmin } = useAdmin();
    const { isModerator } = useModerator();
    const { isStudent } = useStudent();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 w-64 min-h-screen bg-blue-700 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:translate-x-0 lg:relative lg:flex-shrink-0`}
            >
                <ul className="menu p-4">
                    {user && isAdmin && !isModerator && <>
                        <div className="flex  justify-center  mb-4">
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
                    </>}

                    {user && !isAdmin && isModerator && <>
                        <div className="flex  justify-center  mb-4">
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
                    </>}

                    {user && isStudent && !isAdmin && !isModerator && <>
                        <div className="flex  justify-center  mb-4">
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
                    </>}
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
            <div className="flex-1 p-8">
                <div className="lg:hidden fixed top-0 right-0 p-4 z-10">
                    <button onClick={toggleSidebar}>
                        <FaBars size={24} />
                    </button>
                </div>
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default DashBoard;
