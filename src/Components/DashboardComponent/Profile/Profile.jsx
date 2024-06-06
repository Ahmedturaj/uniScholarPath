import PropTypes from 'prop-types';

const Profile = ({ name, photo, email, role }) => {
    return (
        <div data-aos="zoom-in-right" data-aos-duration="1000" className="hero min-h-screen">
            <div className="hero-content flex-col">
                <img src={photo} className="w-24 rounded-full shadow-2xl" />
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
