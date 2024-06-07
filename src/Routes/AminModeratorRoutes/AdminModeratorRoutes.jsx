
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import { AuthContext } from '../../Provider/AuthProvider';
import { useContext } from 'react';
import useModerator from '../../Hooks/useModerator/useModerator';
import { ImSpinner9 } from 'react-icons/im';
import useStudent from '../../Hooks/useStudent/useStudent';

const AdminModeratorRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { isStudent } = useStudent()
    const { isModerator, isModeratorLoading } = useModerator();
    const { isAdmin, isAdminLoading } = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading || isModeratorLoading) {
        return <div className="flex items-center justify-center my-32">
            <ImSpinner9 className='animate-spin text-blue-600 font-bold text-4xl m-auto' />
        </div>
    }

    if (user && !isStudent && isAdmin || isModerator) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>

};

AdminModeratorRoutes.propTypes = {
    children: PropTypes.node
};

export default AdminModeratorRoutes;