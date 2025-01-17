import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import useModerator from '../../Hooks/useModerator/useModerator';
import useStudent from '../../Hooks/useStudent/useStudent';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { isAdmin, isAdminLoading } = useAdmin();
    const { isModerator } = useModerator();
    const { isStudent } = useStudent()
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex items-center justify-center my-32">
            <ImSpinner9 className='animate-spin text-blue-600 font-bold text-4xl m-auto' />
        </div>
    }

    if (user && isAdmin && !isModerator && !isStudent) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>
};
AdminRoutes.propTypes = {
    children: PropTypes.node
}
export default AdminRoutes;