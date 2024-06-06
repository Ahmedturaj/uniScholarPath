import { FaReddit, FaFacebook, FaGithub } from 'react-icons/fa';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';
import { FaRightLong } from 'react-icons/fa6';
function Footer() {
    return (
        <footer data-aos="fade-up"
            data-aos-anchor-placement="top-bottom" data-aos-duration='1000' className="bg-blue-300 bg-opacity-55 text-black">
            <div className="container p-6 mx-auto">
                <div className="flex flex-col text-center md:text-justify  md:flex-row justify-between">
                    <div className="w-full -mx-6 lg:w-2/5">
                        <div className="px-6">
                            <Link to={'/'} className="btn btn-ghost normal-case md:text-xl text-xs -left-6 lg:-left-0 relative gap-0">
                                <img src={logo} alt="" className="w-5  md:w-8 mr-2 hover:animate-spin" />
                                <span className="text-blue-600 md:text-2xl text-xs">U</span>ni<span className="text-blue-600 md:text-2xl text-xs">S</span>cholar<span className="text-blue-600 md:text-2xl text-xs">Path</span></Link>
                            <p className="max-w-sm mt-2 ">
                                UniScholarPath is a platform providing insights and resources for scholarship opportunities and student reviews.
                            </p>
                            <div className="flex mt-6 -mx-2">
                                <a
                                   
                                    className="mx-2  transition-colors duration-300  hover:text-blue-500"
                                    aria-label="Reddit"
                                >
                                    <FaReddit className="w-5 h-5" />
                                </a>
                                <Link
                                    title="visit our facebook site"
                                    target="-blank"
                                    to={'https://www.facebook.com/The.Shekh.Toukir.Ahmed.Turaj'}
                                    className="mx-2  transition-colors duration-300  hover:text-blue-500"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook className="w-5 h-5" />
                                </Link>
                                <Link
                                    title="visit our gitHub repository" target="-blank" to={'https://github.com/Ahmedturaj'}
                                    className="mx-2  transition-colors duration-300  hover:text-blue-500"
                                    aria-label="Github"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <div>
                                <h3 className="uppercase ">About</h3>
                                <a  className="block mt-2 text-sm  hover:underline">Scholarships</a>
                                <a href="#" className="block mt-2 text-sm  hover:underline">Universities</a>
                                <a href="#" className="block mt-2 text-sm  hover:underline">Students</a>
                            </div>
                            <div>
                                <h3 className="uppercase ">Products</h3>
                                <a href="#" className="block mt-2 text-sm  hover:underline">Student Scholarship</a>
                                <a href="#" className="block mt-2 text-sm  hover:underline">University Facilities</a>
                                <a href="#" className="block mt-2 text-sm  hover:underline">Low TuitionFees</a>
                            </div>
                            <div className='ml-12'>
                                <h3 className="uppercase ">Contact</h3>
                                <span className="block mt-2 text-sm  hover:underline">+1 526 654 8965</span>
                                <span className="block mt-2 text-sm  hover:underline">Have any question?</span>
                                <Link to={'mailto:sheikhtoukirahmedturaj013@gmail.com'} className="flex gap-2  items-center mt-2 text-sm  hover:underline"><FaRightLong className="text-blue-600"></FaRightLong> Mail Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
                <div>
                    <p className="text-center ">©  <span className="text-blue-600 md:text-2xl text-xs">U</span>ni<span className="text-blue-600 md:text-2xl text-xs">S</span>cholar<span className="text-blue-600 md:text-2xl text-xs">Path</span> 2020 - All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
