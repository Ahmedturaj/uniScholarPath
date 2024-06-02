import PropTypes from 'prop-types';

const Profile = ({ name, photo, email, role }) => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <img src={photo} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{name}</h1>
                    <p className="py-6">Email: {email}</p>
                    <button className="badge badge-primary">Role: {role}</button>
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
};

export default Profile;
