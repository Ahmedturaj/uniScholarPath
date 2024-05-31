import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('signIn') || location.pathname.includes('signUp');
    console.log(location.pathname);
    return (
        <div>
            {noHeaderFooter || <NavBar/>}
            <div className='pt-24 min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            {noHeaderFooter || <Footer/>}
        </div>
    );
};

export default Main;