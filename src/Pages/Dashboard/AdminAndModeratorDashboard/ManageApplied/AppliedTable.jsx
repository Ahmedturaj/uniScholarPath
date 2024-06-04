import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure/useAxiosSecure';

const AppliedTable = ({ scholarship, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (isModalOpen && selectedScholarship) {
            document.getElementById('scholarship_modal').showModal();
        }
    }, [isModalOpen, selectedScholarship]);

    useEffect(() => {
        if (isFeedbackModalOpen) {
            document.getElementById('feedback_modal').showModal();
        }
    }, [isFeedbackModalOpen]);

    const handleInfoClick = (scholarship) => {
        setSelectedScholarship(scholarship);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.getElementById('scholarship_modal').close();
    };

    const openFeedbackModal = () => {
        setIsFeedbackModalOpen(true);
    };

    const closeFeedbackModal = () => {
        setIsFeedbackModalOpen(false);
        document.getElementById('feedback_modal').close();
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };



    const {
        universityName, scholarshipName, scholarshipCategory, subjectCategory, degree, applicationFees,
        serviceCharge, confirmationStatus, phoneNumber, photo, address, gender, applyingDegree, sscResult,
        hscResult, studyGap, tuitionFees, totalFees, applicationstart, applicationDeadline, scholarshipPosterEmail,
        userName, userEmail, applicationDate, _id
    } = scholarship;

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
                    await axiosSecure.put(`/applied-scholarships/${id}`, { confirmationStatus: 'rejected' });
                    refetch()
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
    const handleFeedbackSubmit = async (id) => {
        try {
            await axiosSecure.patch(`/applied-scholarships/${id}`, {
                feedback,
            });
            refetch()
            Swal.fire({
                title: 'Feedback Submitted!',
                text: 'Your feedback has been successfully submitted.',
                icon: 'success',
            });
            closeFeedbackModal();
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
            });
        }
    };

    const handleStatus = async (id, confirmationStatus) => {
        try {
            await axiosSecure.put(`/applied-scholarships-status/${id}`, {
                confirmationStatus
            });
            refetch()
            Swal.fire({
                title: 'Status Submitted!',
                text: 'Your feedback has been successfully submitted.',
                icon: 'success',
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
            });
        }
    };
    return (
        <>
            <tr>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{universityName}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{scholarshipName}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{scholarshipCategory}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{subjectCategory}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{degree}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{applicationFees}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{serviceCharge}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">
                    <div>

                        {confirmationStatus == 'rejected' ? < h2 className=' text-center rounded-full bg-red-300 text-red-500'>rejected</h2> : <>
                            <label className="block mb-2">Confirmation Status</label>
                            <select name="confirmationStatus" value={confirmationStatus}
                                onChange={(e) => handleStatus(_id, e.target.value)}
                                className="select select-bordered w-full">
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </>}
                    </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                        <button className="text-gray-500 transition-colors duration-200 hover:text-gray-800 focus:outline-none" onClick={() => handleInfoClick(scholarship)}>
                            <FaInfoCircle className="w-5 h-5" />
                        </button>
                        <button disabled={confirmationStatus === 'rejected' || confirmationStatus === 'completed'} className={confirmationStatus === 'rejected' || confirmationStatus === 'completed' ? "cursor-not-allowed text-blue-500 transition-colors duration-200 hover:text-blue-700 focus:outline-none" : "text-blue-500 transition-colors duration-200 hover:text-blue-700 focus:outline-none"} onClick={openFeedbackModal}>
                            <FaEdit className="w-5 h-5" />
                        </button>
                        <button disabled={confirmationStatus === 'rejected' || confirmationStatus === 'completed'} onClick={() => handleCancel(_id)} className={confirmationStatus === 'rejected' || confirmationStatus === 'completed' ? 'text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none cursor-not-allowed' : "text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"}>
                            <FcCancel className="w-5 h-5" />
                        </button>
                    </div>
                </td>
            </tr >

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
                            <p><strong>Application Start:</strong> {applicationstart}</p>
                            <p><strong>Application Deadline:</strong> {applicationDeadline}</p>
                            <p><strong>Scholarship Poster Email:</strong> {scholarshipPosterEmail}</p>
                            <p><strong>User Name:</strong> {userName}</p>
                            <p><strong>User Email:</strong> {userEmail}</p>
                            <p><strong>Application Date:</strong> {applicationDate}</p>
                            <p><strong>Confirmation Status:</strong> {confirmationStatus}</p>
                            <p><strong>Phone Number:</strong> {phoneNumber}</p>
                            <p><strong>Photo:</strong> <img src={photo} alt="scholarship" /></p>
                            <p><strong>Address:</strong> {address}</p>
                            <p><strong>Gender:</strong> {gender}</p>
                            <p><strong>Applying Degree:</strong> {applyingDegree}</p>
                            <p><strong>SSC Result:</strong> {sscResult}</p>
                            <p><strong>HSC Result:</strong> {hscResult}</p>
                            {studyGap != '' && <p><strong>Study Gap:</strong> {studyGap}</p>}
                        </div>
                    </div>
                </dialog>
            )
            }

            {
                isFeedbackModalOpen && (
                    <dialog id="feedback_modal" className="modal">
                        <div className="modal-box">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeFeedbackModal}>✕</button>
                            <h3 className="font-bold text-lg">Provide Feedback</h3>
                            <div className="py-4">
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows="5"
                                    placeholder="Enter your feedback here..."
                                    value={feedback}
                                    onChange={handleFeedbackChange}
                                ></textarea>
                            </div>
                            <div className="modal-action">
                                <button className="btn btn-primary" onClick={() => handleFeedbackSubmit(_id)}>Submit Feedback</button>
                            </div>
                        </div>
                    </dialog>
                )
            }
        </>
    );
};

AppliedTable.propTypes = {
    scholarship: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default AppliedTable;
