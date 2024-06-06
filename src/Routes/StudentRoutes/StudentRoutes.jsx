import PropTypes from 'prop-types';
import { ImSpinner9 } from 'react-icons/im';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import useModerator from '../../Hooks/useModerator/useModerator';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useStudent from '../../Hooks/useStudent/useStudent';

const StudentRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { isStudent, isStudentLoading } = useStudent()
    const { isModerator, isModeratorLoading } = useModerator()
    const { isAdmin, isAdminLoading } = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading || isModeratorLoading || isStudentLoading) {
        return <div className="flex items-center justify-center my-32">
            <ImSpinner9 className='animate-spin text-blue-600 font-bold text-4xl m-auto' />
        </div>
    }

    if (user && !isAdmin && !isModerator && isStudent) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>
};

StudentRoutes.propTypes = {
    children: PropTypes.node
};

export default StudentRoutes;