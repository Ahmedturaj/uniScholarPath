import PropTypes from 'prop-types';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure/useAxiosSecure';
import { useContext, useEffect, useState } from 'react';
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';
import { MdRateReview } from 'react-icons/md';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Provider/AuthProvider';

const MyApplicationTable = ({ myApplied, refetch }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        universityName, scholarshipName, scholarshipCategory, subjectCategory, degree, applicationFees,
        serviceCharge, confirmationStatus, phoneNumber, address, gender, applyingDegree, sscResult,
        hscResult, studyGap, tuitionFees, totalFees, applicationstart, applicationDeadline, scholarshipPosterEmail,
        userName, userEmail, applicationDate, _id, feedback, scholarshipId
    } = myApplied;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };


    useEffect(() => {
        if (isModalOpen && selectedScholarship) {
            document.getElementById('scholarship_modal').showModal();
        }
    }, [isModalOpen, selectedScholarship]);

    useEffect(() => {
        if (isEditModalOpen) {
            document.getElementById('edit_modal').showModal();
        }
    }, [isEditModalOpen]);

    useEffect(() => {
        if (isReviewModalOpen) {
            document.getElementById('review_modal').showModal();
        }
    }, [isReviewModalOpen]);

    const handleInfoClick = (scholarship) => {
        setSelectedScholarship(scholarship);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.getElementById('scholarship_modal').close();
    };

    const openUpdateModal = (scholarship) => {
        setSelectedScholarship(scholarship);
        setIsEditModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsEditModalOpen(false);
        document.getElementById('edit_modal').close();
    };
    const openReviewModal = (scholarship) => {
        setSelectedScholarship(scholarship);
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
        document.getElementById('review_modal').close();
    };
    // handle Update
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            phoneNumber: form.phoneNumber.value,
            address: form.address.value,
            gender: form.gender.value,
            applyingDegree: form.applyingDegree.value,
            sscResult: form.sscResult.value,
            hscResult: form.hscResult.value,
            studyGap: form.studyGap.value,
            userName: form.userName.value,
            applicationDate: form.applicationDate.value,
        };

        setLoading(true);

        try {
            await axiosSecure.put(`/applied-scholarships/${selectedScholarship._id}`, updatedData);
            setLoading(false);
            refetch();
            Swal.fire({
                title: "Updated!",
                text: "Scholarship details have been updated.",
                icon: "success"
            });
            closeUpdateModal();
        } catch (error) {
            setLoading(false);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error"
            });
        }
    };
    // handle cancel
    const handleCancel = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/applied-scholarships/${id}`, { confirmationStatus: 'rejected' });
                    refetch();
                    Swal.fire({
                        title: "Cancelled!",
                        text: "Application has been cancelled.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        icon: "error"
                    });
                }
            }
        });
    };
    // handle Review
    const handleReview = async (e) => {
        e.preventDefault()
        const form = e.target;
        const reviewRating = form.reviewRating.value;
        if (reviewRating > 10 || reviewRating <= 0) {
            return toast.error('please rate us in 10 or enter a valid int positive-number')
        }
        const reviewData = {
            reviewRating: reviewRating,
            reviewDate: form.reviewDate.value,
            reviewComment: form.reviewComment.value,
            scholarshipName: scholarshipName,
            universityName: universityName,
            universityId: scholarshipId,
            reviewer: user?.displayName,
            reviewerEmail: user?.email

        }
        console.log(reviewData);
    }
    return (
        <>
            <tr>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{universityName}</td>
                {feedback ? (
                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{feedback}</td>
                ) : (
                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">No Feedback from authority</td>
                )}
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{scholarshipCategory}</td>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{subjectCategory}</td>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{degree}</td>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{applicationFees}</td>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{serviceCharge}</td>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${confirmationStatus === 'pending' ? 'bg-yellow-100' : confirmationStatus === 'processing' ? 'bg-blue-100' : 'bg-green-100'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${confirmationStatus === 'pending' ? 'bg-yellow-500' : confirmationStatus === 'processing' ? 'bg-blue-500' : confirmationStatus === 'completed' ? 'bg-green-500' : 'bg-red-600'}`}></span>
                        <h2 className={`text-sm font-normal ${confirmationStatus === 'pending' ? 'text-yellow-500' : confirmationStatus === 'processing' ? 'text-blue-500' : confirmationStatus === 'completed' ? 'text-green-500' : 'text-red-600'}`}>{confirmationStatus}</h2>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                        <button className="text-gray-500 transition-colors duration-200 hover:text-gray-800 focus:outline-none" onClick={() => handleInfoClick(myApplied)}>
                            <FaInfoCircle className="w-5 h-5" />
                        </button>
                        <button onClick={() => openReviewModal(myApplied)} className="text-blue-300 transition-colors duration-200 hover:text-blue-500 focus:outline-none">
                            <MdRateReview className="w-5 h-5" />
                        </button>
                        <button onClick={() => openUpdateModal(myApplied)} disabled={confirmationStatus === 'rejected' || confirmationStatus === 'completed' || confirmationStatus === 'processing'} className={confirmationStatus === 'rejected' || confirmationStatus === 'completed' || confirmationStatus === 'processing' ? "cursor-not-allowed text-blue-500 transition-colors duration-200 hover:text-blue-700 focus:outline-none" : "text-blue-500 transition-colors duration-200 hover:text-blue-700 focus:outline-none"}>
                            <FaEdit className="w-5 h-5" />
                        </button>
                        <button disabled={confirmationStatus === 'rejected'} onClick={() => handleCancel(_id)} className="text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none">
                            <FcCancel className="w-5 h-5" />
                        </button>
                    </div>
                </td>
            </tr>
            {/* detail modal */}
            {isModalOpen && (
                <dialog id="scholarship_modal" className="modal">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                        <h3 className="font-bold text-lg">{scholarshipName}</h3>
                        <div className="py-4">
                            <p><strong>University Name:</strong> {universityName}</p>
                            <p><strong>Scholarship Category:</strong> {scholarshipCategory}</p>
                            <p><strong>Subject Category:</strong> {subjectCategory}</p>
                            <p><strong>Degree:</strong> {degree}</p>
                            <p><strong>Application Fees:</strong> {applicationFees}</p>
                            <p><strong>Service Charge:</strong> {serviceCharge}</p>
                            <p><strong>Tuition Fees:</strong> {tuitionFees}</p>
                            <p><strong>Total Fees:</strong> {totalFees}</p>
                            <p><strong>Application Start Date:</strong> {applicationstart}</p>
                            <p><strong>Application Deadline:</strong> {applicationDeadline}</p>
                            <p><strong>Application Deadline:</strong> {applicationDate}</p>
                        </div>
                    </div>
                </dialog>
            )}
            {/* update modal */}
            {isEditModalOpen && (
                <dialog id="edit_modal" className="modal">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeUpdateModal}>✕</button>
                        <h3 className="font-bold text-lg mb-4">Update Scholarship Details</h3>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">University Name</label>
                                    <input type="text" name="universityName" defaultValue={universityName} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="scholarshipName" className="block text-sm font-medium text-gray-700">Scholarship Name</label>
                                    <input type="text" name="scholarshipName" defaultValue={scholarshipName} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="scholarshipCategory" className="block text-sm font-medium text-gray-700">Scholarship Category</label>
                                    <input type="text" name="scholarshipCategory" defaultValue={scholarshipCategory} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="subjectCategory" className="block text-sm font-medium text-gray-700">Subject Category</label>
                                    <input type="text" name="subjectCategory" defaultValue={subjectCategory} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" name="phoneNumber" defaultValue={phoneNumber} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input type="text" name="address" defaultValue={address} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select name="gender" defaultValue={gender} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="applyingDegree" className="block text-sm font-medium text-gray-700">Applying Degree</label>
                                    <select name="applyingDegree" defaultValue={applyingDegree} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm">
                                        <option value="Bachelor">Bachelor</option>
                                        <option value="Masters">Master</option>
                                        <option value="Diploma">Diploma</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="sscResult" className="block text-sm font-medium text-gray-700">SSC Result</label>
                                    <input type="number" step="0.01" name="sscResult" defaultValue={sscResult} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="hscResult" className="block text-sm font-medium text-gray-700">HSC Result</label>
                                    <input type="number" step="0.01" name="hscResult" defaultValue={hscResult} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="studyGap" className="block text-sm font-medium text-gray-700">Study Gap</label>
                                    <select name="studyGap" defaultValue={studyGap} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm">
                                        <option value="None">None</option>
                                        <option value="1 year">1 year</option>
                                        <option value="2 years">2 years</option>
                                        <option value="3 years">3 years</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="totalFees" className="block text-sm font-medium text-gray-700">Total Fees</label>
                                    <input type="number" name="totalFees" defaultValue={totalFees} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="applicationstart" className="block text-sm font-medium text-gray-700">Application Start Date</label>
                                    <input type="text" name="applicationstart" defaultValue={formatDate(applicationstart)} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">Application Deadline</label>
                                    <input type="text" name="applicationDeadline" defaultValue={formatDate(applicationDeadline)} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="scholarshipPosterEmail" className="block text-sm font-medium text-gray-700">Scholarship Poster Email</label>
                                    <input type="email" name="scholarshipPosterEmail" defaultValue={scholarshipPosterEmail} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                                    <input type="text" name="userName" defaultValue={userName} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">User Email</label>
                                    <input type="email" name="userEmail" defaultValue={userEmail} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700">Applying Date</label>
                                    <input type="date" name="applicationDate" defaultValue={new Date().toISOString().split('T')[0]} className="mt-1 block w-full border-gray-500 border-2 rounded-md shadow-sm" readOnly />
                                </div>
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? <ImSpinner9 className="animate-spin w-5 h-5" /> : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}

            {/* review modal */}
            {
                <dialog id="review_modal" className="modal">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeReviewModal}>✕</button>
                        <h2 className='text-xl my-5'>Review the scholarship</h2>
                        <form onSubmit={handleReview}>
                            <div className=" flex gap-3 flex-row">
                                <input type="number" name='reviewRating' placeholder="give us rate in 10" className="input input-bordered w-full max-w-xs" />
                                <input defaultValue={new Date().toISOString().split('T')[0]} type="date" name='reviewDate' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Your Comment</span>
                                </div>
                                <textarea name='reviewComment' className="textarea textarea-bordered h-24" placeholder="Comment Please"></textarea>
                            </label>
                            <input type="submit" value='Review' className='btn btn-primary btn-block text-center my-5' />
                        </form>
                    </div>
                </dialog>
            }

        </>
    );
};

MyApplicationTable.propTypes = {
    myApplied: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default MyApplicationTable;
