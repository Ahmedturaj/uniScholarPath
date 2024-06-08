import { Link } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import Banner from "../Banner/Banner";
import TopScholarships from "../TopScholarships/TopScholarships";
import { FaEye } from "react-icons/fa6";
import StudentReview from "../StudentReview/StudentReview";
import SpeakToRepresentative from "../SpeakToRepresentative/SpeakToRepresentative";
import ContactUs from "../ContuctUs/ContactUs";
import FAQFile from "../FAQFile/FAQFile";

const Home = () => {
    return (
        <section className="container mx-auto">
            <PageTitle title={'Home'}></PageTitle>
            <div className="relative -top-[96px] md:-top-[250px] lg:-top-[99px]"> <Banner></Banner></div>
            {/* ------------- */}
            <div className="container mx-auto">
                <div data-aos="zoom-in-up" data-aos-duration="1000" className="flex items-center justify-center w-full">
                    <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                        Top Scholarships
                    </h2>
                </div>
                <div className="md:max-w-6xl mx-auto">
                    <TopScholarships></TopScholarships>

                    <div className="w-full flex items-center justify-center">
                        <button data-aos="fade-up" data-aos-duration="500" className=" text-center border-2 border-blue-500 p-4 rounded-se-3xl rounded-es-3xl hover:rounded-s-3xl text-blue-500 duration-700">
                            <Link className="flex gap-2 items-center justify-center" to={'/all-scholarship'}>
                                <FaEye /> View All Scholarship
                            </Link>
                        </button>
                    </div>

                </div>
            </div>
            {/* ----------- */}

            <div className="mt-20">
                <SpeakToRepresentative></SpeakToRepresentative>
            </div>
            <div className=" my-24">
                <ContactUs></ContactUs>
            </div>
            <div className="mt-20">
                <div data-aos="zoom-in-up" data-aos-duration="900" className="flex items-center justify-center w-full">
                    <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                        Students Review
                    </h2>
                </div>
                <div className="my-10">
                    <StudentReview />
                </div>
            </div>
            {/* FAQ */}
            <div className="my-24">
                <FAQFile></FAQFile>
            </div>
        </section>
    );
};

export default Home;