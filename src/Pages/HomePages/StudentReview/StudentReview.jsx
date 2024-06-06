import { GiVibratingBall } from "react-icons/gi";
import useReviews from "../../../Hooks/useReviews/useReviews";
import { Tilt } from "react-tilt";

const StudentReview = () => {
    const { reviews } = useReviews();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    // Sort the reviews by reviewDate in descending order
    const sortedReviews = [...reviews].slice().sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));

    // Get the latest three reviews
    const latestReviews = sortedReviews.slice(0, 6);

    return (
        <div className="text-black">
            <div data-aos='zoom-in-up' data-aos-duration='1000' className="text-center w-11/12 m-auto">
                <h1 className="mb-10 text-gray-400 text-center">Our students have shared their experiences and feedback about the scholarship program. These reviews provide valuable insights into how the scholarship has impacted their educational journey and personal growth. Read on to discover what they have to say about the support, opportunities, and overall experience provided by our scholarship program.</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-6xl w-11/12 mx-auto">
                {latestReviews.map((review) => (
                    <div key={review._id} data-aos="zoom-in-right" data-aos-duration="1000" className="w-full px-8 py-4 hover:rounded-se-3xl hover:rounded-es-3xl bg-blue-200 bg-opacity-55 shadow-md" style={{ transition: 'all .6s' }}>
                        <Tilt>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-light">{formatDate(review.reviewDate)}</span>
                                <button className="px-3 py-1 text-sm font-bold transition-colors duration-300 transform rounded cursor-pointer flex gap-2">
                                    <span className="flex gap-2"><GiVibratingBall className="text-blue-500 text-xl" /> Rating point:</span>{review.reviewRating}
                                </button>
                            </div>

                            <div className="mt-2">
                                <p className="text-xl font-bold hover:underline">
                                    {review.universityName}
                                </p>
                                <p className="mt-2">
                                    <span className="text-blue-500">Review Comment </span> : {review.reviewComment}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={review.reviewerImage} alt="Reviewer" />
                                    <p className="font-bold cursor-pointer">
                                        {review.reviewer}
                                    </p>
                                </div>
                            </div>
                        </Tilt>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentReview;
