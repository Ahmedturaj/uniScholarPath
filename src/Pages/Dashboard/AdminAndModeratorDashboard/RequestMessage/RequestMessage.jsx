import PageTitle from "../../../../Components/PageTitle/PageTitle";
import useMessage from "../../../../Hooks/useMessage/useMessage";
import RequestMessageTable from "./RequestMessageTable";

const RequestMessage = () => {
    const { messages, isMessageLoading, refetch } = useMessage();
    return (
        <>
            {
                isMessageLoading ? (<p>loading........</p>) : (
                    <div className="lg:max-w-4xl md:max-w-2xl max-w-[360px] mx-auto p-4">
                        <PageTitle title={'Manage Requested Scholarships'} />
                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">All Requested Scholarships</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Degree Type</th>
                                        <th className="py-2 px-4 border-b">Country of Residence</th>
                                        <th className="py-2 px-4 border-b">Nationality</th>
                                        <th className="py-2 px-4 border-b">Study Areas of Interest</th>
                                        <th className="py-2 px-4 border-b">Request Messages</th>
                                        <th className="py-2 px-4 border-b">Contact&Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        messages.map(message => <RequestMessageTable key={message._id} message={message} refetch={refetch}></RequestMessageTable>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>)
            }
        </>
    );
};

export default RequestMessage;