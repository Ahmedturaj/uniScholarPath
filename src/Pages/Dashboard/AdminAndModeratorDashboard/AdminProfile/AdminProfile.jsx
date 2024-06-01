import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Profile from "../../../../Components/DashboardComponent/Profile/Profile";
import PageTitle from "../../../../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";


const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: admin} = useQuery({
        queryKey: ['admin-user'],
        queryFn: async () => {
            const { data } =await axiosSecure.get(`/users/${user?.email}`)
            return data;
        }
    })
    console.log(admin);
    return (
        <div className="flex items-center justify-center">
            <PageTitle title={'Admin Profile'}></PageTitle>
            <Profile photo={admin?.[0].photo} name={admin?.[0].name} email={admin?.[0].email} role={admin?.[0].role}></Profile>
        </div>
    );
};

export default AdminProfile;