import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../Common/useAxiosCommon";


const useScolarship = () => {
    const axiosCommon = useAxiosCommon();
    const { data: scholarships = [], isLoading: isScholarshipLoading, refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/scholarships')
            return data;
        }
    })
    return { scholarships, isScholarshipLoading, refetch }
};

export default useScolarship;