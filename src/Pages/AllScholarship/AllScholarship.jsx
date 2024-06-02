import { useState } from 'react';
import { FaRankingStar } from "react-icons/fa6";
import useScolarship from "../../Hooks/useScolarship/useScolarship";
import { FaDollarSign } from 'react-icons/fa';

const AllScholarship = () => {
    const { scholarships } = useScolarship();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const scholarshipsPerPage = 6;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
        setCurrentPage(1); // Reset to first page on search
    };

    const filteredScholarships = scholarships.filter(scholarship =>
        scholarship.scholarshipName.toLowerCase().includes(searchQuery) ||
        scholarship.universityName.toLowerCase().includes(searchQuery) ||
        scholarship.degree.toLowerCase().includes(searchQuery)
    );

    const indexOfLastScholarship = currentPage * scholarshipsPerPage;
    const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
    const currentScholarships = filteredScholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Scholarship Name or University Name Degrees"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="p-2 border border-blue-500 rounded w-full"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentScholarships.length > 0 ? (
                    currentScholarships.map(scholarship => (
                        <div key={scholarship._id} className="max-w-xs overflow-hidden bg-blue-200 bg-opacity-55 rounded-lg shadow-lg">
                            <div className="px-4 py-2 text-black">
                                <h1 className="text-xl font-bold uppercase">{scholarship.scholarshipName}</h1>
                                <p className="mt-1 text-sm ">{scholarship.universityName}</p>
                                <span className='badge badge-primary'>{formatDate(scholarship.postDate)}</span>
                                <div className="flex gap-3">
                                    <p className="mt-1 text-sm ">
                                        Scholarship category: {scholarship.scholarshipCategory}
                                    </p>

                                    <p className="mt-1 text-sm">
                                        Location: {scholarship.universityCity}
                                    </p>
                                </div>
                                <hr className='my-5' />
                                <div className="flex justify-between gap-3 mt-4">
                                    <p className="mt-1 text-sm ">
                                        Deadline: {formatDate(scholarship.applicationDeadline)}
                                    </p>
                                    <p className="mt-1 text-sm flex gap-1">
                                        Rank: {scholarship.universityRank}<FaRankingStar />
                                    </p>
                                </div>
                                {scholarship.tuitionFees != 0 ?  <p className="mt-1 text-sm flex gap-1">
                                 Tuition Fees: {scholarship.tuitionFees}<FaDollarSign />
                            </p>: <p className="mt-1 text-sm flex gap-1">
                                 Tuition Fees: Fully Funded <FaDollarSign />
                            </p>}
                            </div>
                            <img className="object-cover w-full h-48 mt-2" src={scholarship.universityLogo} alt="University Logo" />
                            <div className="flex gap-2 items-center justify-between px-4 py-2 bg-gray-900">
                                <h1 className="text-lg font-bold text-white">ApplicationFees: ${scholarship.applicationFees}</h1>
                                <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-gray-600 dark:text-gray-400">
                        <p>No scholarships available</p>
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(filteredScholarships.length / scholarshipsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded shadow`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllScholarship;
