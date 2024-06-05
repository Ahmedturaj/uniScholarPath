import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../Common/useAxiosCommon";
const useReviews = () => {
    const axiosCommon = useAxiosCommon()
    const { data: reviews = [], isLoading: isReviewLoading, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/reviews')
            return data;
        }
    })
    return { reviews, isReviewLoading, refetch }
};

export default useReviews;