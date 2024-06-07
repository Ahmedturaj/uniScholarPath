import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useStudent from '../../Hooks/useStudent/useStudent';
import useModerator from '../../Hooks/useModerator/useModerator';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';

const ModeratorRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { isStudent } = useStudent()
    const { isModerator, isModeratorLoading } = useModerator();
    const { isAdmin, isAdminLoading } = useAdmin();
    const location = useLocation();
    const navigate = useNavigate();

    if (loading || isAdminLoading || isModeratorLoading) {
        return <div className="flex items-center justify-center my-32">
            <ImSpinner9 className='animate-spin text-blue-600 font-bold text-4xl m-auto' />
        </div>
    }
    if (isStudent || isAdmin) {
        return (navigate('/'))
    }

    if (user && !isStudent && !isAdmin && isModerator) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>
};

ModeratorRoutes.propTypes = {
    children: PropTypes.node
};

export default ModeratorRoutes;