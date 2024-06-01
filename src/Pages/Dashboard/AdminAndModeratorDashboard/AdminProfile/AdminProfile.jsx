import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Profile from "../../../../Components/DashboardComponent/Profile/Profile";


const AdminProfile = () => {
    const {user}=useContext(AuthContext)
    return (
        <div>
            <Profile photo={user?.photoURL} name={user?.displayName} email={user?.email}></Profile>
        </div>
    );
};

export default AdminProfile;