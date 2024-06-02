import { Link, NavLink } from "react-router-dom";
import './nav.css'
import logo from '../../../assets/logo.png'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin/useAdmin";
import useModerator from "../../../Hooks/useModerator/useModerator";
import useStudent from "../../../Hooks/useStudent/useStudent";
const NavBar = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const { isAdmin } = useAdmin();
    const { isModerator } = useModerator();
    const { isStudent } = useStudent()
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isChecked, setIsChecked] = useState(theme === "dark");
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);
    const handleTheme = (e) => {
        const newTheme = e.target.checked ? "dark" : "light";
        setTheme(newTheme);
        setIsChecked(e.target.checked);
    }

    const navOptions = <>
        <li><NavLink to={'/'} className={({ isActive }) => isActive ? 'text-blue-600 border-b-2 border-blue-600 rounded-none' : 'text-neutral-content hover:border-t-2 hover:border-r-2 border-blue-600 rounded-none'}>Home</NavLink></li>
        <li><NavLink to={'/all-scholarship'} className={({ isActive }) => isActive ? 'text-blue-600 border-b-2 border-blue-600 rounded-none' : 'text-neutral-content hover:border-t-2 hover:border-l-2 border-blue-600 rounded-none'}>All ScholarShip</NavLink></li>
        {
            user && !isStudent && !isModerator && isAdmin && <li><NavLink to="/dashboard/adminProfile" className={({ isActive }) => isActive ? 'text-blue-600 border-b-2 border-blue-600 rounded-none' : 'text-neutral-content hover:border-t-2 hover:border-l-2 border-blue-600 rounded-none'}>Dashboard</NavLink></li>
        }
        {
            user && !isAdmin && !isStudent && isModerator && <li><NavLink to="/dashboard/moderatorProfile" className={({ isActive }) => isActive ? 'text-blue-600 border-b-2 border-blue-600 rounded-none' : 'text-neutral-content hover:border-t-2 hover:border-l-2 border-blue-600 rounded-none'}>Dashboard</NavLink></li>
        }
        {
            user && !isAdmin && !isModerator && isStudent && <li><NavLink to="/dashboard/my-profile" className={({ isActive }) => isActive ? 'text-blue-600 border-b-2 border-blue-600 rounded-none' : 'text-neutral-content hover:border-t-2 hover:border-l-2 border-blue-600 rounded-none'}>Dashboard</NavLink></li>
        }

    </>

    return (
        <>
            <div className="navbar max-w-[1270px] mx-auto fixed z-10 bg-opacity-30  bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost normal-case md:text-xl text-xs -left-6 lg:-left-0 relative gap-0">
                        <img src={logo} alt="" className="w-5  md:w-8 mr-2 hover:animate-spin" />
                        <span className="text-blue-600 md:text-2xl text-xs">U</span>ni<span className="text-blue-600 md:text-2xl text-xs">S</span>cholar<span className="text-blue-600 md:text-2xl text-xs">Path</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <label className="cursor-pointer w-0 grid place-items-center mr-12 md:mr-12 lg:mr-12">
                        <input onChange={handleTheme} type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" checked={isChecked} />
                        <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label>
                    {loading ? <progress className="progress w-40 md:w-56 bg-blue-600"></progress> : <div className="flex items-center">
                        {
                            user &&
                            <div tabIndex={0} role="button" className="btn btn-ghost w-6 md:w-12 lg:w-14 btn-circle avatar md:mr-5">
                                <div className="w-10 rounded-full">
                                    <img alt={`picture of ${user.displayName}`} src={user.photoURL ? user.photoURL : 'https://i.ibb.co/Y36ZBDD/blank-avatar-photo-place-holder-600nw-1095249842.jpg'} title={user.displayName} />
                                </div>
                            </div>
                        }
                        {
                            user ? <>
                                <button onClick={logOut} className="p-1 cursor-pointer rounded md:btn lg:btn text-[#f2f2f2f2] md:text-[#f2f2f2f2] lg:text-[#f2f2f2f2]  bg-blue-600 md:bg-blue-600 lg:bg-blue-600 hover:bg-blue-600 text-xs md:text-base">LogOut</button>
                            </> :
                                <>
                                    <Link to={'/signIn'}>  <button className="p-1 cursor-pointer rounded md:btn lg:btn text-[#f2f2f2f2] md:text-[#f2f2f2f2] lg:text-[#f2f2f2f2] text-xs mr-2 ml-2 md:text-xl bg-blue-600 md:bg-blue-600 lg:bg-blue-600 hover:bg-blue-600">SignIn</button></Link>
                                </>
                        }
                    </div>}
                </div>
            </div>
        </>
    );
};

export default NavBar;