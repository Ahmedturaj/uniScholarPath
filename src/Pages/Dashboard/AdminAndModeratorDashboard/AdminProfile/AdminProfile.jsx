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
            const { data } = await axiosSecure.get(`/users/${user?.email}`);
            return data;
        }
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <PageTitle title={'Admin Profile'} />
            {isLoading ? (
                <div className="flex flex-col items-center justify-center mt-24 space-y-4">
                    <ImSpinner9 className="animate-spin text-4xl text-blue-600" />
                </div>
            ) : (
                <Profile 
                    photo={admin?.[0]?.photo || ''} 
                    name={admin?.[0]?.name || 'N/A'} 
                    email={admin?.[0]?.email || 'N/A'} 
                    role={admin?.[0]?.role || 'N/A'} 
                />
            )}
        </div>
    );
};

export default AdminProfile;
