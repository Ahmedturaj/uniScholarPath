import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useAppliedScholarship = () => {
    const axiosSecure = useAxiosSecure();
    const { data: appliedScholarship = [], isLoading: isAppliedScholarship, refetch } = useQuery({
        queryKey: ['applied-scholarship'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/applied-scholarships')
            return data
        }
    })
    return { appliedScholarship, isAppliedScholarship, refetch }
};

export default useAppliedScholarship;