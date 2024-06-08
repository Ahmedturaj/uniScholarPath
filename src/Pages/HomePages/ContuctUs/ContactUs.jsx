import { AiOutlineHome, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import video1 from '../../../assets/video3.mp4';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <div data-aos="fade-up" data-aos-duration='700' className="relative bg-gray-900">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={video1} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative container px-6 py-12 mx-auto">
                <div className="text-center">
                    <p data-aos="zoom-in-up" data-aos-duration='700' className="font-medium text-blue-500 dark:text-blue-400">Contact us</p>

                    <h1 data-aos="zoom-in-up" data-aos-duration='800' className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Get in touch</h1>

                    <p data-aos="zoom-in-up" data-aos-duration='850' className="mt-3 text-gray-500 dark:text-gray-400">Our friendly team is always here to chat.</p>
                </div>

                <div className="grid grid-cols-1 gap-12 mt-10 sm:grid-cols-2 lg:grid-cols-3">
                    <div data-aos="zoom-in-down" data-aos-duration='1000' className="flex flex-col items-center justify-center text-center">
                        <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                            <AiOutlineMail className="w-6 h-6" />
                        </span>

                        <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">Email</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
                        <Link to={'mailto:sheikhtoukirahmedturaj013@gmail.com'} className="mt-2 text-blue-500 dark:text-blue-400">sheikhtoukirahmedturaj013@gmail.com</Link>
                    </div>

                    <div data-aos="zoom-in-up" data-aos-duration='1000' className="flex flex-col items-center justify-center text-center">
                        <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                            <AiOutlineHome className="w-6 h-6" />
                        </span>

                        <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">Office</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Come say hello at our office HQ.</p>
                        <p className="mt-2 text-blue-500 dark:text-blue-400">100 Smith Street Collingwood VIC 3066 AU</p>
                    </div>

                    <div data-aos="zoom-in-down" data-aos-duration='1000' className="flex flex-col items-center justify-center text-center">
                        <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                            <AiOutlinePhone className="w-6 h-6" />
                        </span>

                        <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">Phone</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>
                        <Link to={'tel:01877890103'} className="mt-2 text-blue-500 dark:text-blue-400">+880 187-7890103</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
