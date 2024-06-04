import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Profile from "../../../../Components/DashboardComponent/Profile/Profile";
import PageTitle from "../../../../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: admin, isLoading } = useQuery({
        queryKey: ['admin-user'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`)
            return data;
        }
    })
    console.log(admin);
    return (
        <div className="flex items-center justify-center">
            <PageTitle title={'Admin Profile'}></PageTitle>
            {isLoading ? <div className="animate-pulse mt-24 flex space-x-4 mb-4">
                
            <ImSpinner9 className='animate-spin text-2xl text-blue-600 m-auto' />
            </div> : <Profile photo={admin?.[0].photo} name={admin?.[0].name} email={admin?.[0].email} role={admin?.[0].role}></Profile>}
        </div>
    );
};

export default AdminProfile;