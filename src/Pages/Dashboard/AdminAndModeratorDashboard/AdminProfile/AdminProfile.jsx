import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Profile from "../../../../Components/DashboardComponent/Profile/Profile";
import PageTitle from "../../../../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LabelList, Cell, ResponsiveContainer } from "recharts";
import useAppliedScholarship from "../../../../Hooks/useAppliedScholarship/useAppliedScholarship";
import useReviews from "../../../../Hooks/useReviews/useReviews";
import useScolarship from "../../../../Hooks/useScolarship/useScolarship";
import useMessage from "../../../../Hooks/useMessage/useMessage";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { appliedScholarship = [] } = useAppliedScholarship();
    const { scholarships = [] } = useScolarship();
    const { reviews = [] } = useReviews();
    const { messages = [] } = useMessage();

    const { data: admin, isLoading } = useQuery({
        queryKey: ['admin-user'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`);
            return data;
        }
    });

    const barChartData = [
        { name: 'Messages', value: messages.length },
        { name: 'Scholar', value: scholarships.length },
        { name: 'Applied', value: appliedScholarship.length },
        { name: 'Reviews', value: reviews.length },
    ];

    return (
        <div className="flex gap-4 flex-col lg:flex-row bg-blue-200 bg-opacity-55 p-3 justify-center items-center">
            <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <PageTitle title={`Admin ~ ${user?.displayName}`} />
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center mt-24 space-y-4">
                        <ImSpinner9 className="animate-spin text-4xl text-blue-600" />
                    </div>
                ) : (
                    <div>
                        <Profile
                            photo={admin?.[0]?.photo || ''}
                            name={admin?.[0]?.name || 'N/A'}
                            email={admin?.[0]?.email || 'N/A'}
                            role={admin?.[0]?.role || 'N/A'}
                        />
                    </div>
                )}
            </div>
            <div data-aos="zoom-in-left" data-aos-duration="1000" className="flex justify-center mt-10 w-full">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value">
                            {barChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            <LabelList dataKey="value" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminProfile;
