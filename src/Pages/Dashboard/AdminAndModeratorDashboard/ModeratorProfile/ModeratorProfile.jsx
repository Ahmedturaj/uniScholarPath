import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../../Components/PageTitle/PageTitle";
import Profile from "../../../../Components/DashboardComponent/Profile/Profile";
import { ImSpinner9 } from "react-icons/im";


const ModeratorProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: moderator, isLoading } = useQuery({
        queryKey: ['moderator-user'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`)
            return data;
        }
    })

    return (
        <>
            {
                isLoading ? <div className="flex flex-col items-center justify-center mt-24 space-y-4">
                    <ImSpinner9 className="animate-spin text-4xl text-blue-600" />
                </div> : <div className="flex items-center justify-center">
                    <PageTitle title={`moderator ~ ${user?.displayName}`}></PageTitle>
                    <Profile photo={moderator?.[0].photo} name={moderator?.[0].name} email={moderator?.[0].email} role={moderator?.[0].role}></Profile>
                </div>
            }
        </>
    );
};

export default ModeratorProfile;