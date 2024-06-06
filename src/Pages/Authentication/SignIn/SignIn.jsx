import logInImg from '../../../assets/LogIn.png';
import logo from '../../../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../../Provider/AuthProvider';
import SocialLogIn from '../../../Components/SocialLogIn/SocialLogIn';
import PageTitle from '../../../Components/PageTitle/PageTitle';
const SignIn = () => {
    const { signIn, loading } = useContext(AuthContext);
    const captchaRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        try {
            const result = await signIn(email, password);
            if (result) {
                toast.success('SignIn Successfully');
                navigate(location?.state ? location.state.from.pathname : '/');
                e.target.reset();
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Failed to sign in');
        }
    }




    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    return (
        <div className="my-10 flex w-full max-w-sm mx-auto overflow-hidden  rounded-lg shadow-lg lg:max-w-4xl">
            <PageTitle title={'SignIn'} />
            <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: `url(${logInImg})` }}></div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-7 sm:h-8" src={logo} alt="Logo" />
                </div>

                <p className="mt-3 text-xl text-center">
                    Welcome back!
                </p>

                <SocialLogIn title={'LogIn'}></SocialLogIn>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b border-blue-600 lg:w-1/4"></span>

                    <a href="#" className="text-xs text-center  uppercase hover:underline">or login
                        with email</a>

                    <span className="w-1/5 border-b border-blue-400 lg:w-1/4"></span>
                </div>

                <form onSubmit={handleSignIn}>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium " >Email Address</label>
                        <input
                            name='email'
                            id="LoggingEmailAddress"
                            className="block w-full px-4 py-2  border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                            type="email"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium " >Password</label>

                        <input name='password' id="loggingPassword" className="block w-full px-4 py-2 border rounded-lg
                         focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <LoadCanvasTemplate />
                        </label>
                        <input onBlur={handleValidateCaptcha} type="text" name="captcha" ref={captchaRef} placeholder="type the captcha above" className="input input-bordered" />

                    </div>
                    <div disabled={disabled} className="mt-6">
                        <button disabled={disabled} className="w-full px-6 py-3 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform border-2 hover:rounded-s-3xl cursor-pointer border-blue-600 rounded-se-3xl rounded-es-3xl text-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                            {loading ? <ImSpinner9 className='animate-spin m-auto text-blue-500' /> : 'Sign In'}
                        </button>
                    </div>
                </form>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                    <Link to={'/signUp'} className="text-xs text-blue-600 uppercase hover:underline">or sign up</Link>

                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
