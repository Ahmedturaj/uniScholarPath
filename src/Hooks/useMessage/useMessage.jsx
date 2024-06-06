import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useMessage = () => {
    const axiosSecure = useAxiosSecure();
    const { data: messages = [], isLoading: isMessageLoading, refetch } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/message')
            return data;
        }
    })
    return { messages, isMessageLoading, refetch }
};

export default useMessage;