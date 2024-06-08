import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../../Components/PageTitle/PageTitle";
import Profile from "../../../../Components/DashboardComponent/Profile/Profile";
import { ImSpinner9 } from "react-icons/im";


const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: student, isLoading: isStudentLoading } = useQuery({
        queryKey: ['student-user'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`)
            return data;
        }
    })

    return (
        <>
            {isStudentLoading ? <div className="flex flex-col items-center justify-center mt-24 space-y-4">
                <ImSpinner9 className="animate-spin text-4xl text-blue-600" />
            </div> : <div className="flex items-center justify-center">
                <PageTitle title={`Student ~ ${user?.displayName}`}></PageTitle>
                <Profile photo={student?.[0].photo} name={student?.[0].name} email={student?.[0].email} role={student?.[0].role}></Profile>
            </div>
            }
        </>
    );
};

export default MyProfile;