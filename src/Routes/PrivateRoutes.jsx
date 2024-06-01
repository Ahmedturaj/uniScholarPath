import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import { AuthContext } from '../Provider/AuthProvider';



const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className="flex items-center justify-center my-32">
            <ImSpinner9 className='animate-spin text-blue-600 font-bold text-4xl m-auto' />
        </div>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/signIn" state={{ from: location }} replace ></Navigate>;
};
PrivateRoutes.propTypes = {
    children: PropTypes.node
}

export default PrivateRoutes;