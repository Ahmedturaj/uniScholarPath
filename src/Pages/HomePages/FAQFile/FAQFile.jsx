/* eslint-disable react/no-unescaped-entities */
import { Tilt } from "react-tilt";
import FAQPoster from '../../../assets/FAQ_IMG.png'

const FAQFile = () => {
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
    return (
        <div className="my-24">
            <div data-aos="zoom-in-up" data-aos-duration="900" className="flex items-center justify-center w-full">
                <h2 className="text-2xl border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center w-80 font-extrabold text-blue-500 bg-black bg-opacity-15">
                    FAQ
                </h2>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-center gap-6 w-11/12 mx-auto'>
                <div data-aos="zoom-in-left" data-aos-duration="900" className="w-full md:w-6/12">
                    <style>
                        {keyframes}
                    </style>
                    <Tilt className="background-stripes duration-200 parallax-effect-glare-scale"
                        perspective={500}
                        glareEnable={true}
                        glareMaxOpacity={0.45}
                        scale={1.02}><img src={FAQPoster} style={bounceStyle} className='rounded-3xl w-full' /></Tilt>
                </div>
                <div data-aos="zoom-in-right" data-aos-duration="900" className="w-full  md:w-6/12">
                    <div className="collapse collapse-arrow bg-blue-300 mb-5 bg-opacity-55">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            What is our page's intension?
                        </div>
                        <div className="collapse-content">
                            <p>Our intension is to introduce Students to the wold-wide scholarship.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-blue-300 mb-5 bg-opacity-55">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Can I book scholarship from it?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, your can booked scholarship through a payment method.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-blue-300  bg-opacity-55">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            What kind of scholarship you are providing and what are the subject categories?
                        </div>
                        <div className="collapse-content">
                            <p> Currently, We are providing 3 type of scholarship : full-funded, partial, self-funded and about the subject categories : Engineering, Doctor, Phd Holders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQFile;