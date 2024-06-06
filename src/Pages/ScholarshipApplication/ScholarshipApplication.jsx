import { useContext, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import PageTitle from '../../Components/PageTitle/PageTitle';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';

const ScholarshipApplication = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState();
    // eslint-disable-next-line no-unused-vars
    const [imageText, setImageText] = useState('Upload Image');
    const navigate = useNavigate()
    const { data: prePaidScholarship, isLoading: isPrePaidScholarshipLoading } = useQuery({
        queryKey: ['payment-data', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/scholarships/${id}`);
            return data;
        }
    });

    const {
        universityName, postedUserEmail, tuitionFees, subjectCategory, serviceCharge, _id, scholarshipName, scholarshipCategory, degree, applicationstart, applicationFees, applicationDeadline,
    } = prePaidScholarship || {};



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const tuitionFeesFloat = parseFloat(tuitionFees) || 0;
    const serviceChargeFloat = parseFloat(serviceCharge) || 0;
    const applicationFeesFloat = parseFloat(applicationFees) || 0;

    // Calculate the total fees
    const totalFees = tuitionFeesFloat + serviceChargeFloat + applicationFeesFloat;

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const image = form.image.files[0];
        const image_url = await uploadImage(image);
        const applicationData = {
            phoneNumber: form.phoneNumber.value,
            photo: image_url,
            address: form.address.value,
            gender: form.gender.value,
            applyingDegree: form.applyingDegree.value,
            sscResult: form.sscResult.value,
            hscResult: form.hscResult.value,
            studyGap: form.studyGap.value,
            universityName,
            scholarshipCategory,
            subjectCategory,
            degree,
            tuitionFees,
            serviceCharge,
            applicationFees,
            totalFees,
            scholarshipName,
            applicationstart,
            applicationDeadline,
            scholarshipPosterEmail: postedUserEmail,
            userName: user.displayName,
            userEmail: user.email,
            scholarshipId: _id,
            applicationDate: new Date(),
            confirmationStatus: 'pending'
        };
        console.table(applicationData);
        try {
            await axiosSecure.post('/applied-scholarships', applicationData);
            Swal.fire({
                icon: 'success',
                title: 'Application Submitted Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            form.reset();
            navigate('/dashboard/my-application')
            setImagePreview('');
            setImageText('Upload Image');
        } catch (error) {
            console.error("Error submitting application", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Submit Application',
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };



    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('image', image);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_API}`, formData);
        return res.data.data.url;
    };

    const handleImage = (image) => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name);
    };





    return (
        <>

            {isPrePaidScholarshipLoading ? <div className="flex items-center justify-center my-32">
                <ImSpinner9 className='animate-spin text-blue-600 font-bold text-4xl m-auto' />
            </div>

                : <div className="my-14">
                    <PageTitle title={'Scholarship Application'} />
                    <div data-aos='zoom-in' data-aos-duration='1000' className="flex items-center justify-center w-full">
                        <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                            Applying for {scholarshipName}
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 p-4 border-2 border-blue-500 rounded-se-3xl rounded-es-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">Phone Number</label>
                            <input type="number" name="phoneNumber" className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Photo</label>
                            <input type="file" name="image" onChange={(e) => handleImage(e.target.files[0])} className="w-full px-3 py-2 border rounded" required />
                            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-20" />}
                        </div>
                        <div className="mb-4 col-span-1 md:col-span-2">
                            <label className="block text-gray-700">Address</label>
                            <input type="text" name="address" className="w-full px-3 py-2 border rounded" placeholder="Village, District, Country" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Gender</label>
                            <select name="gender" className="w-full px-3 py-2 border rounded" required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Applying Degree</label>
                            <select name="applyingDegree" className="w-full px-3 py-2 border rounded" required>
                                <option value="">Select Degree</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">SSC Result Point</label>
                            <input type="number" name="sscResult" className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">HSC Result Point</label>
                            <input type="number" name="hscResult" className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Applying Start date</label>
                            <input type="text" name="applicationstart" value={formatDate(applicationstart)} className="w-full px-3 py-2 border rounded" readOnly />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Applying last date</label>
                            <input type="text" name="applicationDeadline" className="w-full px-3 py-2 border rounded" value={formatDate(applicationDeadline)} readOnly />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Study Gap (optional)</label>
                            <select name="studyGap" className="w-full px-3 py-2 border rounded">
                                <option value="">No Study Gap</option>
                                <option value="1 year">1 year</option>
                                <option value="2 years">2 years</option>
                                <option value="3 years">3 years</option>
                            </select>
                        </div>
                        <div className="mb-4 col-span-1 md:col-span-2">
                            <label className="block text-gray-700">University Name</label>
                            <input type="text" value={universityName} readOnly className="w-full px-3 py-2 border rounded bg-gray-200" />
                        </div>
                        <div className="mb-4 col-span-1 md:col-span-2">
                            <label className="block text-gray-700">Scholarship Category</label>
                            <input type="text" value={scholarshipCategory} readOnly className="w-full px-3 py-2 border rounded bg-gray-200" />
                        </div>
                        <div className="mb-4 col-span-1 md:col-span-2">
                            <label className="block text-gray-700">Subject Category</label>
                            <input type="text" value={subjectCategory} readOnly className="w-full px-3 py-2 border rounded bg-gray-200" />
                        </div>
                        <div className="mb-4 col-span-1 md:col-span-2">
                            <label className="block text-gray-700">Degree</label>
                            <input type="text" value={degree} readOnly className="w-full px-3 py-2 border rounded bg-gray-200" />
                        </div>
                        <div className="text-center col-span-1 md:col-span-2">
                            <button type="submit" className="px-4 py-2 border-2 border-blue-500 text-blue-500 duration-700 rounded-se-3xl rounded-es-3xl hover:rounded-s-3xl" disabled={loading}>
                                {loading ? <ImSpinner9 className='animate-spin m-auto' /> : 'Submit/Apply'}
                            </button>
                        </div>
                    </form>
                </div>}
        </>
    );
};

export default ScholarshipApplication;
