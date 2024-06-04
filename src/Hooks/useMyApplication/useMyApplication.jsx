import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const useMyApplication = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: myApplication, isLoading: isMyApplicationLoading, refetch } = useQuery({
        queryKey: ['my-application'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/applied-scholarships/${user?.email}`)
            return data;
        }
    })
    return { myApplication, isMyApplicationLoading, refetch }
};

export default useMyApplication;