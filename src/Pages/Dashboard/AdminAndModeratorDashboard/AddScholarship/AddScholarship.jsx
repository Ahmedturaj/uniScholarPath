/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AuthContext } from '../../../../Provider/AuthProvider';
import PageTitle from '../../../../Components/PageTitle/PageTitle';
import { ImSpinner9 } from 'react-icons/im';

const AddScholarship = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload Image');
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    //   const { mutateAsync } = useMutation({
    //     mutationFn: async (scholarshipData) => {
    //       const { data } = await axios.post('/scholarships', scholarshipData);
    //       return data;
    //     },
    //     onSuccess: () => {
    //       toast.success('Scholarship Added Successfully!');
    //       navigate('/dashboard/scholarships');
    //       setLoading(false);
    //     },
    //   });

    const handleDates = (item) => {
        setDates(item.selection);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const scholarshipName = form.scholarshipName.value;
        const universityName = form.universityName.value;
        const universityCountry = form.universityCountry.value;
        const universityCity = form.universityCity.value;
        const universityRank = form.universityRank.value;
        const subjectCategory = form.subjectCategory.value;
        const scholarshipCategory = form.scholarshipCategory.value;
        const degree = form.degree.value;
        const tuitionFees = form.tuitionFees.value;
        const applicationFees = form.applicationFees.value;
        const serviceCharge = form.serviceCharge.value;
        const postedUserEmail = form.postedUserEmail.value;
        const image = form.image.files[0];

        
            const image_url = await uploadImage(image);
            const scholarshipData = {
                scholarshipName,
                universityName,
                universityCountry,
                universityCity,
                universityRank,
                subjectCategory,
                scholarshipCategory,
                degree,
                tuitionFees,
                applicationFees,
                serviceCharge,
                applicationDeadline: dates.endDate,
                postDate: new Date(),
                postedUserEmail,
                universityLogo: image_url,
            };
            console.table(scholarshipData);
            setLoading(false);
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
            <PageTitle title={'Add scholarship'}></PageTitle>
            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Add New Scholarship</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Scholarship Name</label>
                            <input type="text" name="scholarshipName" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2">University Name</label>
                            <input type="text" name="universityName" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2">University Country</label>
                            <input type="text" name="universityCountry" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2">University City</label>
                            <input type="text" name="universityCity" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2">University World Rank</label>
                            <input type="number" name="universityRank" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2">Subject Category</label>
                            <select name="subjectCategory" className="select select-bordered w-full">
                                <option>Agriculture</option>
                                <option>Engineering</option>
                                <option>Doctor</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Scholarship Category</label>
                            <select name="scholarshipCategory" className="select select-bordered w-full">
                                <option>Full fund</option>
                                <option>Partial</option>
                                <option>Self-fund</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Degree</label>
                            <select name="degree" className="select select-bordered w-full">
                                <option>Diploma</option>
                                <option>Bachelor</option>
                                <option>Masters</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Tuition Fees</label>
                            <input type="number" name="tuitionFees" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="block mb-2">Application Fees</label>
                            <input type="number" name="applicationFees" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2">Service Charge</label>
                            <input type="number" name="serviceCharge" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2">Application Deadline</label>
                            <DateRange
                                editableDateInputs={true}
                                onChange={handleDates}
                                moveRangeOnFirstSelection={false}
                                ranges={[dates]}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">University Logo</label>
                            <input type="file" name="image" onChange={(e) => handleImage(e.target.files[0])} className="file-input file-input-bordered w-full" required />
                            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-20" />}
                        </div>
                        <div>
                            <label className="block mb-2">Posted User Email</label>
                            <input type="email" name="postedUserEmail" value={user?.email} readOnly className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <ImSpinner9 className='animate-spin m-auto' /> : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddScholarship;
