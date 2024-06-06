import { useContext, useState } from 'react';
import contactPhoto from '../../../assets/SitReadingDoodle.svg'
import { AuthContext } from '../../../Provider/AuthProvider';
import { Tilt } from 'react-tilt';
import { ImSpinner9 } from 'react-icons/im';
import { axiosCommon } from '../../../Hooks/Common/useAxiosCommon';
import toast from 'react-hot-toast';
const ContactUs = () => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const bounceStyle = {
        animation: 'bounce 1s infinite',
    };

    const keyframes = `
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `;

    //   handle Message
    const handleMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const messageData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        }
        const { data } = await axiosCommon.post('/message', messageData)
        if (data.insertedId) {
            form.reset()
            toast.success('Your Message has taken,We will mail you back.')
        }
        setLoading(false)
    }

    return (
        <div className="w-11/12 m-auto">
            <div data-aos="zoom-in-up" data-aos-duration="1000" className="flex items-center my-24 justify-center w-full">
                <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                    Contact Us
                </h2>
            </div>
            <div className='flex flex-col md:flex-row'>
                <div className="flex-1">
                    <style>
                        {keyframes}
                    </style>
                    <Tilt className="background-stripes duration-200 parallax-effect-glare-scale"
                        perspective={500}
                        glareEnable={true}
                        glareMaxOpacity={0.45}
                        scale={1.02} > <img data-aos="zoom-in-right" data-aos-duration="1000" style={bounceStyle} src={contactPhoto} className='w-full' alt="" /></Tilt>
                </div>
                <div className=" flex-1">
                    <div data-aos="zoom-in-left" data-aos-duration="1000" className="container flex flex-col gap-y-6 items-center justify-center min-h-screen px-6 mx-auto border-2 border-blue-400 rounded-se-3xl rounded-es-3xl">
                        <h2 data-aos="zoom-in-up" data-aos-duration="1000" className='md:text-2xl font-bold mb-12 text-blue-600 text-center'>Message</h2>
                        <form onSubmit={handleMessage} className="w-full max-w-md">
                            <input type="text" placeholder="Your Name" defaultValue={user?.displayName} name='name' className="input input-bordered input-primary w-full mb-5" required />
                            <input type="email" name='email' defaultValue={user?.email} placeholder="Your Email" className="mb-5 input input-bordered input-primary w-full" required />

                            <textarea name='message' className="textarea textarea-primary my-6 w-full" placeholder="Text Your Message" required></textarea>

                            <div className="my-6">
                                <button disabled={loading} className="w-full border-2 rounded-se-3xl rounded-es-3xl hover:rounded-s-3xl px-6 py-3 text-sm font-medium tracking-wide text-blue-500 capitalize transition-colors transform border-blue-500  hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 duration-1000  focus:ring-opacity-50">
                                    {loading ? <ImSpinner9 className='animate-spin m-auto text-blue-600' /> : 'Message'}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;