import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useReviews = () => {
    const axiosSecure = useAxiosSecure()
    const { data: reviews = [], isLoading: isReviewLoading, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/reviews')
            return data;
        }
    })
    return { reviews, isReviewLoading, refetch }
};

export default useReviews;