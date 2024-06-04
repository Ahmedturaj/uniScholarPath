import PageTitle from "../../../../Components/PageTitle/PageTitle";
import useAppliedScholarship from "../../../../Hooks/useAppliedScholarship/useAppliedScholarship";
import { ImSpinner9 } from 'react-icons/im';

import AppliedTable from './AppliedTable';

const ManageApplied = () => {
    const { appliedScholarship, refetch, isAppliedScholarship } = useAppliedScholarship();
   
    

    if (isAppliedScholarship) {
        return <ImSpinner9 className='animate-spin text-blue-600 text-3xl mt-24 m-auto' />
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <PageTitle title={'Manage Applied Scholarships'} />
            <h2 className="text-2xl font-bold mb-4">All Applied Scholarships</h2>
            <div className="overflow-x-auto">
                <table className="w-96 border">
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
                        {appliedScholarship.map(scholarship =><AppliedTable key={scholarship._id} scholarship={scholarship} refetch={refetch}></AppliedTable>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageApplied;
