import { useState } from 'react';
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import PageTitle from "../../../../Components/PageTitle/PageTitle";
import useScolarship from "../../../../Hooks/useScolarship/useScolarship";
import { ImSpinner9 } from 'react-icons/im';

const ManageScholarship = () => {
    const { scholarships, refetch } = useScolarship();
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState();
    const handleEdit = (scholarship) => {
        setSelectedScholarship(scholarship);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/scholarships/${id}`);
            refetch();
            toast.success('Scholarship deleted successfully');
        } catch (error) {
            toast.error('Failed to delete scholarship');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const updatedScholarship = {
            ...selectedScholarship,
            scholarshipName: form.scholarshipName.value,
            universityName: form.universityName.value,
            universityCountry: form.universityCountry.value,
            universityCity: form.universityCity.value,
            universityRank: form.universityRank.value,
            subjectCategory: form.subjectCategory.value,
            scholarshipCategory: form.scholarshipCategory.value,
            degree: form.degree.value,
            tuitionFees: form.tuitionFees.value,
            applicationFees: form.applicationFees.value,
            serviceCharge: form.serviceCharge.value,
        };

        if (form.image.files[0]) {
            const image_url = await uploadImage(form.image.files[0]);
            updatedScholarship.universityLogo = image_url;
        }

        try {
            await axios.put(`/scholarships/${selectedScholarship._id}`, updatedScholarship);
            refetch();
            toast.success('Scholarship updated successfully');
            setIsEditing(false);
            setSelectedScholarship(null);
        } catch (error) {
            toast.error('Failed to update scholarship');
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
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <PageTitle title={'Manage Scholarships'} />
            <h2 className="text-2xl font-bold mb-4">All Scholarships</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Scholarship Name</th>
                            <th className="py-2 px-4 border-b">University Name</th>
                            <th className="py-2 px-4 border-b">Subject Category</th>
                            <th className="py-2 px-4 border-b">Applied Degree</th>
                            <th className="py-2 px-4 border-b">Application Fees</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.map(scholarship => (
                            <tr key={scholarship._id}>
                                <td className="py-2 px-4 border-b">{scholarship.scholarshipName}</td>
                                <td className="py-2 px-4 border-b">{scholarship.universityName}</td>
                                <td className="py-2 px-4 border-b">{scholarship.subjectCategory}</td>
                                <td className="py-2 px-4 border-b">{scholarship.degree}</td>
                                <td className="py-2 px-4 border-b">{scholarship.applicationFees}</td>
                                <td className="py-2 px-4 border-b flex space-x-2">
                                    {/* todo navigate to detail page */}
                                    <button className="btn btn-info">
                                        <FaInfoCircle />
                                    </button>
                                    <button className="btn btn-warning" onClick={() => handleEdit(scholarship)}>
                                        <FaEdit />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(scholarship._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Edit Modal */}
            {isEditing && selectedScholarship && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
                    <div className="bg-white p-6 rounded shadow-lg w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Edit Scholarship</h2>
                        <form onSubmit={handleSave}>
                            <div>
                                <label className="block mb-2">Scholarship Name</label>
                                <input type="text" name="scholarshipName" defaultValue={selectedScholarship.scholarshipName} className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">University Name</label>
                                <input type="text" name="universityName" defaultValue={selectedScholarship.universityName} className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">University Country</label>
                                <input type="text" name="universityCountry" defaultValue={selectedScholarship.universityCountry} className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">University City</label>
                                <input type="text" name="universityCity" defaultValue={selectedScholarship.universityCity} className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">University World Rank</label>
                                <input type="number" name="universityRank" defaultValue={selectedScholarship.universityRank} className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">Subject Category</label>
                                <select name="subjectCategory" defaultValue={selectedScholarship.subjectCategory} className="select select-bordered w-full">
                                    <option value="">Select Subject Category</option>
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Medical">Medical</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">Scholarship Category</label>
                                <select name="scholarshipCategory" defaultValue={selectedScholarship.scholarshipCategory} className="select select-bordered w-full">
                                    <option value="">Select Scholarship Category</option>
                                    <option value="Full">Full</option>
                                    <option value="Half">Half</option>
                                    <option value="Partial">Partial</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">Applied Degree</label>
                                <select name="degree" defaultValue={selectedScholarship.degree} className="select select-bordered w-full">
                                    <option value="">Select Degree</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Postgraduate">Postgraduate</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">Tuition Fees</label>
                                <input type="number" name="tuitionFees" defaultValue={selectedScholarship.tuitionFees} className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">Application Fees</label>
                                <input type="number" name="applicationFees" defaultValue={selectedScholarship.applicationFees} className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">Service Charge</label>
                                <input type="number" name="serviceCharge" defaultValue={selectedScholarship.serviceCharge} className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">University Logo</label>
                                <input type="file" name="image" className="file-input file-input-bordered w-full" onChange={(e) => handleImage(e.target.files[0])} />
                                {imagePreview && <img className='h-12' src={imagePreview} alt="Selected" />}
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? <ImSpinner9 className="animate-spin m-auto" /> : 'Save'}
                                </button>
                                <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageScholarship;
