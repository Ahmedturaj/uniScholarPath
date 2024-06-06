import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useContext, useState } from "react";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { ImSpinner9 } from "react-icons/im";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import PageTitle from "../../../../Components/PageTitle/PageTitle";

const MyReview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [selectedMyReview, setSelectedMyReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: myReviews = [], isLoading: isMyReviewLoading, refetch } = useQuery({
    queryKey: ['myReviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/review/${user?.email}`);
      return data;
    }
  });

  const openUpdateModal = (myReview) => {
    setSelectedMyReview(myReview);
    document.getElementById('edit_modal').showModal();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reviewRating = form.reviewRating.value;
    if (reviewRating > 10 || reviewRating <= 0) {
      return toast.error('please rate us in 10 or enter a valid int positive-number')
    }

    setLoading(true);
    const updatedReview = {
      universityName: form.universityName.value,
      scholarshipName: form.scholarshipName.value,
      reviewer: form.reviewer.value,
      reviewRating: reviewRating,
      reviewerEmail: form.reviewerEmail.value,
      reviewComment: form.reviewComment.value
    };

    try {
      await axiosSecure.patch(`/reviews/${selectedMyReview._id}`, updatedReview)
      refetch();
      setLoading(false);
      document.getElementById('edit_modal').close();
      form.reset()
      toast.success('Thank you. Review have been updated.')

    }
    catch (error) {
      toast.error(error.message)
    }

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


  if (myReviews.length === 0) {
    return <h2>No Reviews have been added yet..</h2>;
  }

  return (
    <>
      <PageTitle title={'My Review'}></PageTitle>
      {isMyReviewLoading ? (
        <div className="flex items-center justify-center my-32">
          <ImSpinner9 className="animate-spin text-blue-600 font-bold text-4xl m-auto" />
        </div>
      ) : (
        <div className="">

          <div className="flex items-center justify-center w-full">
            <h2 className="text-2xl my-12 border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
              My Reviews: {myReviews?.length}
            </h2>
          </div>
          <div className="overflow-x-auto border-2 border-blue-400 p-4 rounded-se-3xl rounded-es-3xl">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Scholarship name</th>
                  <th>University name</th>
                  <th>Review comments</th>
                  <th>Review date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myReviews.map((myReview, index) => (
                  <tr key={myReview._id}>
                    <th>{index + 1}</th>
                    <td>{myReview.scholarshipName}</td>
                    <td>{myReview.universityName}</td>
                    <td>{myReview.reviewComment}</td>
                    <td>{new Date(myReview.reviewDate).toLocaleDateString()}</td>
                    <td className="flex items-center gap-2">
                      <button onClick={() => openUpdateModal(myReview)} className="btn btn-ghost btn-lg">
                        <MdOutlineSystemUpdateAlt className="text-blue-600" />
                      </button>
                      <button onClick={() => handleDelete(myReview._id)} className="btn btn-ghost btn-lg">
                        <FaTrashAlt className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box rounded-3xl border-2 border-blue-500">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Update Your Review</h3>
          <form onSubmit={handleUpdateSubmit}>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <input type="text" name="universityName" defaultValue={selectedMyReview?.universityName} className="input input-bordered input-primary w-full max-w-xs" readOnly />
              <input type="text" name="scholarshipName" defaultValue={selectedMyReview?.scholarshipName} className="input my-5 input-bordered input-primary w-full max-w-xs" readOnly />
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <input type="text" name="reviewer" defaultValue={selectedMyReview?.reviewer} className="input my-5 input-bordered input-primary w-full max-w-xs" required />
              <input type="number" name="reviewRating" defaultValue={selectedMyReview?.reviewRating} className="input my-5 input-bordered input-primary w-full max-w-xs" required />
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <input type="email" name="reviewerEmail" defaultValue={selectedMyReview?.reviewerEmail} className="input my-5 input-bordered input-primary w-full max-w-xs" readOnly />
              <div>
                <textarea name="reviewComment" className="textarea textarea-primary" defaultValue={selectedMyReview?.reviewComment} required></textarea>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <ImSpinner9 className="animate-spin w-5 h-5" /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default MyReview;
