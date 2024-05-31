import logInImg from '../../../assets/others/authentication2.png'
import logo from '../../../assets/icon/logo.png'
import { useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ImSpinner9 } from "react-icons/im";
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosCommon from '../../../Hooks/Common/useAxiosCommon';
import SocialLogIn from '../../../Components/SocialLogIn/SocialLogIn';




function SignUp() {
    const { createUser, setLoading, updateUserProfile, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosCommon = useAxiosCommon();
    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append('image', image);
        if (password.length < 6) {
            toast.warning('You have to put 6 character In Your Password');
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.warning('You have to use at least one Uppercase character In Your Password');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            toast.warning('You have to use at least one lowercase character In Your Password');
            return;
        }

        else if (!/[0-9]/.test(password)) {
            toast.warning('You have to use at least one numeric character In Your Password');
            return;
        }
        try {
            setLoading(true);
            // ____________upload Image to image bb______________
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_API}`, formData);

            await createUser(email, password);
            await updateUserProfile(name, data.data.display_url);
            const usersInfo = { name: name, email: email };
            const { data: users } = await axiosCommon.post('/users', usersInfo);
            if (users.insertedId) {
                navigate('/');
                toast.success('SignUp Successfully');
            }
        }
        catch (error) {
            console.log(error);
        }

    };
    return (
        <div className="my-10 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: `url(${logInImg})` }}></div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
                </div>

                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                    Welcome! Please, Sign Up.
                </p>
                <div className="my-5">
                    <SocialLogIn title={'SignUp'}></SocialLogIn>
                </div>
                <form onSubmit={handleSignUp}>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Your Name</label>
                        <input name='name' placeholder='Your full name' className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
                    </div>
                    <label className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>

                        <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                        <input name='image' id="dropzone-file" type="file" className="hidden" />
                    </label>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Email Address</label>
                        <input name='email' className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Password</label>
                            <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
                        </div>

                        <input name='password' className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
                    </div>

                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            {loading ? <ImSpinner9 className='animate-spin m-auto' /> : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                    <Link to={'/logIn'} className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>

                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
            </div>
        </div>
    );
}

export default SignUp;