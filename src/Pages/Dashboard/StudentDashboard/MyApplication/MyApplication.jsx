import { ImSpinner9 } from 'react-icons/im';
import useMyApplication from '../../../../Hooks/useMyApplication/useMyApplication';
import PageTitle from '../../../../Components/PageTitle/PageTitle';
import MyApplicationTable from './MyApplicationTable';

const MyApplication = () => {
    const { myApplications, isMyApplicationLoading, refetch } = useMyApplication();

    return (
        <>
            {isMyApplicationLoading ? (
                <div className="flex items-center justify-center my-32">
                    <ImSpinner9 className='animate-spin text-blue-600 font-bold text-4xl m-auto' />
                </div>
            ) : (
                <div className="max-w-4xl mx-auto p-4">
                    <PageTitle title={'My Applied Scholarship'} />
                    <h2 className="text-2xl font-bold mb-4">My Applied Scholarships</h2>
                    <div className="overflow-x-auto">
                        <table className="w-96 border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">University Name</th>
                                    <th className="py-2 px-4 border-b">University Address</th>
                                    <th className="py-2 px-4 border-b">Feedback</th>
                                    <th className="py-2 px-4 border-b">Subject Category</th>
                                    <th className="py-2 px-4 border-b">Applied Degree</th>
                                    <th className="py-2 px-4 border-b">Application Fees</th>
                                    <th className="py-2 px-4 border-b">Service Charge</th>
                                    <th className="py-2 px-4 border-b">Status</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                  { myApplications.map(myApplied => <MyApplicationTable key={myApplied._id} myApplied={myApplied} refetch={refetch}></MyApplicationTable>)}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyApplication;
