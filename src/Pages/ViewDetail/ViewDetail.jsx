import { useQuery } from "@tanstack/react-query";
import { FaBookOpen, FaDollarSign } from "react-icons/fa";
import { FaCity, FaHourglassEnd, FaHourglassStart, FaLocationDot, FaPersonChalkboard, FaSackDollar } from "react-icons/fa6";
import { GoMoveToStart } from "react-icons/go";
import { ImHappy2 } from "react-icons/im";
import { MdOutlineCategory } from "react-icons/md";
import { RiEmotionHappyFill } from "react-icons/ri";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { GiVibratingBall } from "react-icons/gi";
import PageTitle from "../../Components/PageTitle/PageTitle";

const ViewDetail = () => {
    const data = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { universityName, universityLogo, universityCountry, universityCity, tuitionFees, subjectCategory, serviceCharge, _id, scholarshipName, scholarshipCategory, postDate, degree, applicationstart, applicationFees, applicationDeadline, } = data;

    const { data: reviews = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/${_id}`)
            return data;
        }
    });

    const tuitionFeesFloat = parseFloat(tuitionFees) || 0;
    const serviceChargeFloat = parseFloat(serviceCharge) || 0;
    const applicationFeesFloat = parseFloat(applicationFees) || 0;

    const totalFees = tuitionFeesFloat + serviceChargeFloat + applicationFeesFloat;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div className="w-full overflow-hidden bg-blue-300 bg-opacity-50 rounded-lg shadow-md">
            <PageTitle title={`detail of ${scholarshipName}`}></PageTitle>
            <img
                className="object-cover w-full h-64"
                src={universityLogo}
                alt="Article"
            />
            <div className="p-6">
                <div>
                    <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{formatDate(postDate)}</span>
                    <h2 className="block mt-2 text-xl font-semibold text-black transition-colors duration-300 transform hover:text-blue-600 hover:underline">
                        {scholarshipName}
                    </h2>
                    <h2 className="text-xl my-2 text-blue-500">{universityName}</h2>
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                        <p className="flex items-center justify-center gap-2 ">
                            <span className="text-blue-400">Location:</span>{universityCountry} <FaLocationDot />
                        </p>
                        <p className="flex  items-center justify-center gap-2">
                            <span className="text-blue-400">City:</span>{universityCity} <FaCity />
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                        <p className="flex items-center justify-center gap-2 ">
                            <span className="text-blue-400">Subject Category:</span>{subjectCategory} <FaBookOpen />
                        </p>
                        <p className="flex items-center justify-center gap-2">
                            <span className="text-blue-400">Degree:</span>{degree} <FaPersonChalkboard />
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                        <p className="flex items-center justify-center gap-2">
                            <span className="text-blue-400">Scholarship Category:</span>{scholarshipCategory} <MdOutlineCategory />
                        </p>
                        {tuitionFees !== 0 ? (
                            <p className="flex items-center justify-center gap-2">
                                <span className="text-blue-400">Tuition Fees:</span>{tuitionFees} <RiEmotionHappyFill />
                            </p>
                        ) : (
                            <p className="flex items-center justify-center gap-2">
                                <span className="text-blue-400">Tuition Fees:</span>Full Funded <ImHappy2 />
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                        <p className="flex items-center justify-center gap-2 ">
                            <span className="text-blue-400">Application Start:</span>{formatDate(applicationstart)} <FaHourglassStart />
                        </p>
                        <p className="flex  items-center justify-center gap-2">
                            <span className="text-blue-400">Application Deadline:</span>{formatDate(applicationDeadline)} <FaHourglassEnd />
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                        <p className="flex items-center justify-center gap-2 ">
                            <span className="text-blue-400">Application Fees:</span>{applicationFees} <FaDollarSign />
                        </p>
                        <p className="flex items-center justify-center gap-2 ">
                            <span className="text-blue-400">Service Charge:</span>{serviceCharge} <FaSackDollar />
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Link to={`/payment/${_id}`} className=" border-blue-500 border-2 p-2 rounded-se-3xl rounded-es-3xl hover:rounded-s-3xl my-5">
                            <span className="text-blue-500">Total Fees</span>
                            <div className="badge badge-secondary gap-2">{totalFees} <FaSackDollar /></div>
                        </Link>
                        <p className="flex items-center gap-2">
                            <GoMoveToStart className="text-4xl animate-bounce text-blue-400" />  Click To Apply
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex items-center my-5 justify-center w-full">
                        <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                            Reviews {reviews.length}
                        </h2>
                    </div>
                    {
                        reviews.length != 0 ? <div className="flex items-center">
                            <div className="carousel w-full">
                                {reviews.map((review, index) => (
                                    <div key={review._id} id={`slide${index}`} className="carousel-item relative w-full">
                                        <div className="w-full px-8 py-4 rounded-lg shadow-md bg-opacity-55 bg-gray-800">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-light text-gray-700 dark:text-gray-300">{formatDate(review.reviewDate)}</span>
                                                <button className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500 flex gap-2">
                                                    <span className="flex gap-2"><GiVibratingBall className="text-blue-500 text-xl" /> Rating point:</span>{review.reviewRating}
                                                </button>
                                            </div>

                                            <div className="mt-2">
                                                <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
                                                    {review.universityName}
                                                </a>
                                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                                    <span className="text-blue-500">Review Comment </span> : {review.reviewComment}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center">
                                                    <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={review.reviewerImage} alt="Reviewer" />
                                                    <a href="#" className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                                                        {review.reviewer}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                            <a href={`#slide${index - 1 >= 0 ? index - 1 : reviews.length - 1}`} className="text-blue-600">❮</a>
                                            <a href={`#slide${index + 1 < reviews.length ? index + 1 : 0}`} className="text-blue-600">❯</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> :
                            <div className="text-center">
                                <h2 className="text-center text-blue-500 md:text-2xl">
                                    No review Added yet
                                </h2>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewDetail;
