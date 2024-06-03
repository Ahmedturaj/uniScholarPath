import { FaBookOpen, FaDollarSign } from "react-icons/fa";
import { FaCity, FaHourglassEnd, FaHourglassStart, FaLocationDot, FaPersonChalkboard, FaSackDollar } from "react-icons/fa6";
import { GoMoveToStart } from "react-icons/go";
import { ImHappy2 } from "react-icons/im";
import { MdOutlineCategory } from "react-icons/md";
import { RiEmotionHappyFill } from "react-icons/ri";
import { Link, useLoaderData } from "react-router-dom";

const ViewDetail = () => {
    const data = useLoaderData();
    console.log(data);
    const { universityName, universityLogo, universityCountry, universityCity, tuitionFees, subjectCategory, serviceCharge, _id, scholarshipName, scholarshipCategory, postDate, degree, applicationstar, applicationFees, applicationDeadline, } = data;

    const tuitionFeesFloat = parseFloat(tuitionFees) || 0;
    const serviceChargeFloat = parseFloat(serviceCharge) || 0;
    const applicationFeesFloat = parseFloat(applicationFees) || 0;

    // Calculate the total fees
    const totalFees = tuitionFeesFloat + serviceChargeFloat + applicationFeesFloat;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div className="w-full overflow-hidden bg-black bg-opacity-70 rounded-lg shadow-md">
            <img
                className="object-cover w-full h-64"
                src={universityLogo}
                alt="Article"
            />
            <div className="p-6">
                <div>
                    <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{formatDate(postDate)}</span>
                    <h2
                        className="block mt-2 text-xl font-semibold text-white transition-colors duration-300 transform  hover:text-blue-600 hover:underline"
                    >
                        {scholarshipName}
                    </h2>
                    <h2 className="text-xl my-2 text-blue-500">{universityName}</h2>
                    <div className="flex gap-3 items-center">
                        <p className="flex items-center justify-center gap-2 text-gray-400"><span className="text-blue-400">Location:</span>{universityCountry} <FaLocationDot /></p>
                        <p className="flex text-gray-400 items-center justify-center gap-2"><span className="text-blue-400">City:</span>{universityCity} <FaCity /></p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="flex items-center justify-center gap-2 text-gray-400"><span className="text-blue-400">Subject Category:</span>{subjectCategory} <FaBookOpen /></p>
                        <p className="flex text-gray-400 items-center justify-center gap-2"><span className="text-blue-400">Degree:</span>{degree} <FaPersonChalkboard /></p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="flex items-center justify-center gap-2 text-gray-400"><span className="text-blue-400">Subject ScholarshipCategory:</span>{scholarshipCategory} <MdOutlineCategory /></p>
                        {tuitionFees !== 0 ? <p className="flex text-gray-400 items-center justify-center gap-2"><span className="text-blue-400">TuitionFees:</span>{tuitionFees} <RiEmotionHappyFill /></p> : <p className="flex text-gray-400 items-center justify-center gap-2"><span className="text-blue-400">TuitionFees:</span>Full Funded <ImHappy2 /></p>}
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="flex items-center justify-center gap-2 text-gray-400"><span className="text-blue-400">Application Start:</span>{formatDate(applicationstar)} <FaHourglassStart /></p>
                        <p className="flex text-gray-400 items-center justify-center gap-2"><span className="text-blue-400">Application Deadline:</span>{formatDate(applicationDeadline)} <FaHourglassEnd /></p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="flex items-center justify-center gap-2 text-gray-400"><span className="text-blue-400">Application Fees:</span>{applicationFees} <FaDollarSign /></p>
                        <p className="flex text-gray-400 items-center justify-center gap-2"><span className="text-blue-400">Service Charge:</span>{serviceCharge} <FaSackDollar /></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to={`/payment/${_id}`} className="btn bg-blue-500 border-none my-5">
                            Total Fees
                            <div className="badge badge-secondary gap-2">{totalFees} <FaSackDollar /></div>
                        </Link>
                        <p className="flex text-white items-center gap-2"><GoMoveToStart className="text-4xl animate-bounce text-blue-400" />  Click To Apply</p>
                    </div>
                </div>
                {/* here will apply review by slider */}
                <div className="mt-4">
                    <div className="flex items-center  my-5 justify-center w-full">
                        <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                            Reviews
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <div className="carousel w-full">
                            <div id="slide1" className="carousel-item relative w-full">
                                <div className=" px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
                                        <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">Design</a>
                                    </div>

                                    <div className="mt-2">
                                        <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Accessibility tools for designers and developers</a>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" tabIndex="0" role="link">Read more</a>

                                        <div className="flex items-center">
                                            <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                                            <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">Khatab wedaa</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide4" className="btn btn-circle">❮</a>
                                    <a href="#slide2" className="btn btn-circle">❯</a>
                                </div>
                            </div>
                            <div id="slide2" className="carousel-item relative w-full">
                                <div className=" px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
                                        <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">Design</a>
                                    </div>

                                    <div className="mt-2">
                                        <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Accessibility tools for designers and developers</a>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" tabIndex="0" role="link">Read more</a>

                                        <div className="flex items-center">
                                            <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                                            <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">Khatab wedaa</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide1" className="btn btn-circle">❮</a>
                                    <a href="#slide3" className="btn btn-circle">❯</a>
                                </div>
                            </div>
                            <div id="slide3" className="carousel-item relative w-full">
                                <div className=" px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
                                        <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">Design</a>
                                    </div>

                                    <div className="mt-2">
                                        <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Accessibility tools for designers and developers</a>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" tabIndex="0" role="link">Read more</a>

                                        <div className="flex items-center">
                                            <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                                            <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">Khatab wedaa</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide2" className="btn btn-circle">❮</a>
                                    <a href="#slide4" className="btn btn-circle">❯</a>
                                </div>
                            </div>
                            <div id="slide4" className="carousel-item relative w-full">
                                <div className=" px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
                                        <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">Design</a>
                                    </div>

                                    <div className="mt-2">
                                        <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Accessibility tools for designers and developers</a>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" tabIndex="0" role="link">Read more</a>

                                        <div className="flex items-center">
                                            <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                                            <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">Khatab wedaa</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide3" className="btn btn-circle">❮</a>
                                    <a href="#slide1" className="btn btn-circle">❯</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetail;
