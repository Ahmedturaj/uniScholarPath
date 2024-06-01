import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

function useAxiosSecure() {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (res) => {
                return res;
            },
            (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    logOut()
                        .then(() => {
                            navigate("/signIn");
                        })
                        .catch((error) => console.error(error));
                }
            }
        );
    }, [logOut, navigate]);

    return axiosSecure;
}

export default useAxiosSecure;