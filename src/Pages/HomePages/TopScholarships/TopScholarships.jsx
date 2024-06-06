import { FaDollarSign, FaRankingStar } from "react-icons/fa6";
import useScolarship from "../../../Hooks/useScolarship/useScolarship";
import { Link } from "react-router-dom";

const TopScholarships = () => {
    const { scholarships } = useScolarship();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };


    const filteredScholarships = scholarships.filter(scholarship => parseFloat(scholarship.tuitionFees) < 1800);

    const sortedScholarships = filteredScholarships
        .slice()
        .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        .slice(0, 6);

    return (
        <div className="grid my-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
            {sortedScholarships.length > 0 ? (
                sortedScholarships.map(scholarship => (
                    <div data-aos="fade-down"
                    data-aos-easing="linear"
                     key={scholarship._id} className="md:max-w-xs overflow-hidden bg-blue-200 bg-opacity-55 rounded-lg  shadow-lg">
                        <div className="px-4 py-2 text-black">
                            <h1 className="text-xl font-bold uppercase">{scholarship.scholarshipName}</h1>
                            <p className="mt-1 text-sm">{scholarship.universityName}</p>
                            <span className='badge badge-primary'>{formatDate(scholarship.postDate)}</span>
                            <div className="flex gap-3">
                                <p className="mt-1 text-sm">
                                    Scholarship category: {scholarship.scholarshipCategory}
                                </p>
                                <p className="mt-1 text-sm">
                                    Location: {scholarship.universityCity}
                                </p>
                            </div>
                            <hr className='my-5' />
                            <div className="flex justify-between gap-3 mt-4">
                                <p className="mt-1 text-sm">
                                    Deadline: {formatDate(scholarship.applicationDeadline)}
                                </p>
                                <p className="mt-1 text-sm flex gap-1">
                                    Rank: {scholarship.universityRank}<FaRankingStar />
                                </p>
                            </div>
                            {scholarship.tuitionFees != 0 ? <p className="mt-1 text-sm flex gap-1">
                                Tuition Fees: {scholarship.tuitionFees}<FaDollarSign />
                            </p> : <p className="mt-1 text-sm flex gap-1">
                                Tuition Fees: Fully Funded <FaDollarSign />
                            </p>}
                        </div>
                        <img className="object-cover w-full h-48 mt-2" src={scholarship.universityLogo} alt="University Logo" />
                        <div className="flex gap-2 items-center justify-between px-4 py-2 bg-gray-900">
                            <h1 className="text-lg font-bold text-white">Application Fees: ${scholarship.applicationFees}</h1>
                            <Link to={`/detail/${scholarship._id}`} className="px-2 py-1 text-xs font-semibold border-2 border-blue-600 rounded-se-3xl text-blue-600 uppercase transition-colors duration-300 transform bg-white rounded-es-3xl hover:rounded-s-3xl hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                                Details
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-3 text-center text-gray-600 dark:text-gray-400">
                    <p>No scholarships available</p>
                </div>
            )}
        </div>
    );
};

export default TopScholarships;
