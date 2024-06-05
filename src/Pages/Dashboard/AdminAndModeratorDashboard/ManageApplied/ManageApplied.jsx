import { useState } from "react";
import PageTitle from "../../../../Components/PageTitle/PageTitle";
import useAppliedScholarship from "../../../../Hooks/useAppliedScholarship/useAppliedScholarship";
import { ImSpinner9 } from 'react-icons/im';
import AppliedTable from './AppliedTable';

const ManageApplied = () => {
    const { appliedScholarship, refetch, isAppliedScholarship } = useAppliedScholarship();
    const [filter, setFilter] = useState("");

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const sortedScholarships = () => {
        if (filter === "appliedDate") {
            return appliedScholarship.sort((a, b) => new Date(a.applicationDate) - new Date(b.applicationDate));
        } else if (filter === "deadline") {
            return appliedScholarship.sort((a, b) => new Date(a.applicationDeadline) - new Date(b.applicationDeadline));
        } else {
            return appliedScholarship;
        }
    };

    if (!appliedScholarship) {
        return <p className="text-2xl text-blue-400 text-center mt-24">
            No Scholarship have been applied yet.
        </p>
    }

    return (
        <>
            {
                isAppliedScholarship ? (
                    <ImSpinner9 className='animate-spin text-blue-600 text-3xl mt-24 m-auto' />
                ) : (
                    <div className="lg:max-w-4xl md:max-w-2xl max-w-[360px] mx-auto p-4">
                        <PageTitle title={'Manage Applied Scholarships'} />
                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">All Applied Scholarships</h2>
                            <select 
                                className="p-2 border border-gray-300 rounded-md"
                                value={filter}
                                onChange={handleFilterChange}
                            >
                                <option value="">Sort by</option>
                                <option value="appliedDate">Applied Date</option>
                                <option value="deadline">Scholarship Deadline</option>
                            </select>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">University Name</th>
                                        <th className="py-2 px-4 border-b">Scholarship Name</th>
                                        <th className="py-2 px-4 border-b">Scholarship Category</th>
                                        <th className="py-2 px-4 border-b">Subject Category</th>
                                        <th className="py-2 px-4 border-b">Applied Degree</th>
                                        <th className="py-2 px-4 border-b">Application Fees</th>
                                        <th className="py-2 px-4 border-b">Service Charge</th>
                                        <th className="py-2 px-4 border-b">Status</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedScholarships().map(scholarship => (
                                        <AppliedTable key={scholarship._id} scholarship={scholarship} refetch={refetch} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ManageApplied;
