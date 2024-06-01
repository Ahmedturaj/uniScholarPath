import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
const useStudent = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isStudent, isPending: isStudentLoading } = useQuery({
        queryKey: [user?.email, 'isStudent'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is admin', user)
            const res = await axiosSecure.get(`/users/student/${user.email}`);
            return res.data?.student;
        }
    })
    return {isStudent, isStudentLoading}
};

export default useStudent;