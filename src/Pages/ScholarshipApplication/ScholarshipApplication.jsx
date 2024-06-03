import { useParams } from "react-router-dom";
import PageTitle from "../../Components/PageTitle/PageTitle";

const ScholarshipApplication = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <div className="mt-14">
            <PageTitle title={'Scholarship Application'}></PageTitle>
            <div className="flex items-center justify-center w-full">
                <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                    Application form 
                </h2>
            </div>
        </div>
    );
};



export default ScholarshipApplication;