import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useUser = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], isLoading:isUserLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            return data;
        }
    })
    return { users, isUserLoading, refetch }
};

export default useUser;