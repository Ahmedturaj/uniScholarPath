import PropTypes from 'prop-types';

const Profile = ({ name, photo, email, role }) => {
    return (
        <div>
            <div className="">
                <img className="object-cover w-16 h-16 rounded-full ring ring-gray-300 dark:ring-gray-600" src={photo} alt="" />
            </div>
        </div>
    );
};

Profile.propTypes = {
photo:PropTypes.element
};

export default Profile;