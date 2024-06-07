import PropTypes from 'prop-types';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { SiMinutemailer } from 'react-icons/si';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';

const RequestMessageTable = ({ message, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { name, email, requestMessage, interestAreas, nationality, residenceCountry, degree, phoneNumber, _id } = message;
    // handleDelete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/message/${id}`);
                    refetch()
                    Swal.fire({
                        title: "Delete",
                        text: "Message has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        icon: "error"
                    });
                }
            }
        });
        console.log(id);
    }
    return (
        <>
            <tr>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{name}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{degree}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{residenceCountry}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{nationality}</td>
                <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{interestAreas}</td>
                {requestMessage ? <td title={requestMessage} className="px-4 py-4 text-sm font-medium  whitespace-nowrap">{`${requestMessage.substring(0, 20)}.....`}</td> : <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">No message from the person</td>}
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-end justify-end gap-x-3">
                        <Link to={`mailto:${email}`} className="text-blue-500 transition-colors duration-200 hover:text-blue-700 focus:outline-none">
                            <SiMinutemailer className="w-5 h-5" />
                        </Link>
                        <Link to={`tel:${phoneNumber}`} className="text-blue-500 transition-colors duration-200 hover:text-blue-700 focus:outline-none">
                            <FaPhoneAlt className="w-5 h-5" />
                        </Link>
                        <button onClick={() => handleDelete(_id)} className=" duration-200 text-red-700 focus:outline-none">
                            <FaDeleteLeft className="w-5 h-5" />
                        </button>
                    </div>
                </td>
            </tr >
        </>
    );
};

RequestMessageTable.propTypes = {
    message: PropTypes.object,
    refetch: PropTypes.func
};

export default RequestMessageTable;