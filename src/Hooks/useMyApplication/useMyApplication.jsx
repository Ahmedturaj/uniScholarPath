import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const useMyApplication = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: myApplications, isLoading: isMyApplicationLoading, refetch } = useQuery({
        queryKey: ['my-application'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/applied-scholarships/${user?.email}`)
            return data;
        }
    })
    return { myApplications, isMyApplicationLoading, refetch }
};

export default useMyApplication;