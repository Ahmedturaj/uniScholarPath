import { useContext, useState } from 'react';
import contactPhoto from '../../../assets/SitReadingDoodle.svg';
import { Tilt } from 'react-tilt';
import { ImSpinner9 } from 'react-icons/im';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Provider/AuthProvider';
import { axiosCommon } from '../../../Hooks/Common/useAxiosCommon';

const SpeakToRepresentative = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const bounceStyle = {
        animation: 'bounce 1s infinite',
    };

    const keyframes = `
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
    `;

    const handleMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const messageData = {
            name: form.name.value,
            email: form.email.value,
            phoneNumber: form.phoneNumber.value,
            degree: form.degree.value,
            residenceCountry: form.residenceCountry.value,
            nationality: form.nationality.value,
            interestAreas: form.interestAreas.value,
            requestMessage: form.requestMessage.value
        };
        const { data } = await axiosCommon.post('/message', messageData);
        if (data.insertedId) {
            form.reset();
            form.degree.value = '';
            form.residenceCountry.value = '';
            form.nationality.value = '';
            form.interestAreas.value = '';
            toast.success('Your message has been sent. We will get back to you via email.');
        }
        setLoading(false);
    };

    const countries = ["USA", "Bangladesh", "Canada", "Australia", "UK", "Germany", "France", "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Switzerland", "Japan"];
    const nationalities = ["American", "Bangali", "Canadian", "Australian", "British", "German", "French", "Italian", "Spanish", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish", "Swiss", "Japanese"];
    const studyAreas = ["Agriculture", "Engineering", "Doctor", "Business", "Arts", "Law", "Science", "Technology", "Education", "Health", "Social Sciences", "Environment", "Mathematics", "Architecture", "Philosophy"];

    return (
        <div className="w-11/12 m-auto">
            <div data-aos="zoom-in-up" data-aos-duration="1000" className="flex items-center my-24 justify-center w-full">
                <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                    Speak to a representative
                </h2>
            </div>
            <div className='flex flex-col items-center justify-center md:flex-row'>
                <div className="flex-1">
                    <style>
                        {keyframes}
                    </style>
                    <Tilt className="background-stripes duration-200 parallax-effect-glare-scale"
                        perspective={500}
                        glareEnable={true}
                        glareMaxOpacity={0.45}
                        scale={1.02} >
                        <img data-aos="zoom-in-up" data-aos-duration="1000" style={bounceStyle} src={contactPhoto} className='w-full' alt="" />
                    </Tilt>
                </div>
                <div className="flex-1">
                    <div data-aos="zoom-in-up" data-aos-duration="1000" className="container flex flex-col gap-y-6 items-center justify-center min-h-screen px-6 mx-auto border-2 border-blue-400 rounded-se-3xl rounded-es-3xl">
                        <h2 data-aos="zoom-in-up" data-aos-duration="1000" className='md:text-2xl font-bold mb-12 text-blue-600 text-center'>Message</h2>
                        <form onSubmit={handleMessage} className="w-full max-w-md">
                            <input type="text" placeholder="Your Name" defaultValue={user?.displayName} name='name' className="input input-bordered input-primary w-full mb-5" required />
                            <input type="email" name='email' defaultValue={user?.email} placeholder="Your Email" className="mb-5 input input-bordered input-primary w-full" required />
                            <input type="number" name='phoneNumber' placeholder="Your Contact Number" className="mb-5 input input-bordered input-primary w-full" required />
                            <div>
                                <label className="block mb-2">Degree</label>
                                <select name="degree" className="select select-bordered select-primary w-full" required defaultValue="">
                                    <option value="" disabled>Select degree</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Masters">Masters</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">Country of Residence</label>
                                <select name="residenceCountry" className="select select-bordered select-primary w-full" required defaultValue="">
                                    <option value="" disabled>Select country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">Nationality</label>
                                <select name="nationality" className="select select-bordered select-primary w-full" required defaultValue="">
                                    <option value="" disabled>Select nationality</option>
                                    {nationalities.map((nationality, index) => (
                                        <option key={index} value={nationality}>{nationality}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">Study Areas of Interest</label>
                                <select name="interestAreas" className="select select-bordered select-primary w-full" required defaultValue="">
                                    <option value="" disabled>Select area of interest</option>
                                    {studyAreas.map((area, index) => (
                                        <option key={index} value={area}>{area}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mt-2 mb-1">Enquiry Message</label>
                                <textarea name='requestMessage' className="textarea textarea-primary my-6 w-full" placeholder="Text Your Message"></textarea>
                            </div>
                            <div className="my-6">
                                <button disabled={loading} className="w-full border-2 rounded-se-3xl rounded-es-3xl hover:rounded-s-3xl px-6 py-3 text-sm font-medium tracking-wide text-blue-500 capitalize transition-colors transform border-blue-500  hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 duration-1000  focus:ring-opacity-50">
                                    {loading ? <ImSpinner9 className='animate-spin m-auto text-blue-600' /> : 'Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeakToRepresentative;
