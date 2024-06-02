import { Link } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import Banner from "../Banner/Banner";
import TopScholarships from "../TopScholarships/TopScholarships";
import { FaEye } from "react-icons/fa6";


const Home = () => {
    return (
        <section>
            <PageTitle title={'Home'}></PageTitle>
            <div className="relative -top-[96px] md:-top-[250px] lg:-top-[99px]"> <Banner></Banner></div>
            <div className="container mx-auto">
                <div className="flex items-center justify-center w-full">
                    <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                        Top Scholarships
                    </h2>
                </div>
                <div className="md:max-w-6xl mx-auto">
                    <TopScholarships></TopScholarships>
 
                  <div className="w-full flex items-center justify-center">
                  <button className="btn text-center btn-primary">
                        <Link className="flex gap-2 items-center justify-center" to={'/all-scholarship'}>
                            <FaEye /> View All Scholarship
                        </Link>
                    </button>
                  </div>

                </div>
            </div>
            {/* ----------- */}
        </section>
    );
};

export default Home;