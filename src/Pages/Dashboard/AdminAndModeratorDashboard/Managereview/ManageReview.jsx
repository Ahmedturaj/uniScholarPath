import { ImSpinner9 } from "react-icons/im";
import useReviews from "../../../../Hooks/useReviews/useReviews";
import { BsPersonBadgeFill } from "react-icons/bs";
import { GiVibratingBall } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import PageTitle from "../../../../Components/PageTitle/PageTitle";
import useAdmin from "../../../../Hooks/useAdmin/useAdmin";

const ManageReview = () => {
    const { isAdmin } = useAdmin()
    const { reviews, isReviewLoading, refetch } = useReviews();
    const axiosSecure = useAxiosSecure();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    // handle delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reviews/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Review has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }

    if (!reviews) {
        <h2>No Reviews have added yet..</h2>
    }
    return (
        <>

            {isReviewLoading ? <div className="flex items-center justify-center my-32">
                <ImSpinner9 className='animate-spin text-blue-600 font-bold text-4xl m-auto' />
            </div> : <>
                <div data-aos="flip-up" data-aos-duration="1000" className="flex items-center justify-center w-full">
                    {isAdmin ? <PageTitle title={'All Reviews'}></PageTitle> : <PageTitle title={'Manage Reviews'}></PageTitle>}
                    <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15 mb-14">
                        All reviews
                    </h2>
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        reviews.map(review => <div data-aos="zoom-in-up" data-aos-duration="1000" key={review._id} className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg bg-blue-300 bg-opacity-55">
                            <img className="object-cover object-center w-full h-56" src={review.reviewerImage} alt="avatar" />

                            <div className="flex items-center px-6 py-3 bg-gray-900">
                                <BsPersonBadgeFill className="text-blue-400" />

                                <h1 className="mx-3 text-lg text-white font-semibold">{review.reviewer}</h1>
                            </div>

                            <div className="px-6 py-4">
                                <h1 className="text-xl font-semibold">{review.universityName}</h1>

                                <p className="py-2"><span className="text-blue-500">Review</span> : {review.reviewComment}</p>

                                <div className="flex items-center mt-4">
                                    <h3 className="flex gap-2"><GiVibratingBall className="text-blue-500 text-xl" /> Rating point:</h3>

                                    <h1 className="px-2 text-sm">{review.reviewRating}</h1>
                                </div>

                                <div className="flex items-center mt-4">
                                    <MdCategory className="text-blue-500 text-xl" />

                                    <h1 className="px-2 text-sm">{review.scholarshipName}</h1>
                                </div>

                                <div className="flex items-center mt-4">
                                    <CgCalendarDates className="text-blue-500 text-xl" />

                                    <h1 className="px-2 text-sm">{formatDate(review.reviewDate)}</h1>
                                </div>
                            </div>
                            <div className=" p-4">
                                <button onClick={() => handleDelete(review._id)} className="flex gap-2 p-2 rounded-se-3xl rounded-es-3xl border-2 border-blue-500 hover:rounded-ss-3xl" style={{ transition: 'all .5s' }}>
                                    <AiFillDelete className="text-blue-500 text-xl" />
                                    <p className="text-blue-500"> Delete</p>
                                </button>
                            </div>
                        </div>)
                    }
                </div>
            </>}
        </>
    );
};

export default ManageReview;