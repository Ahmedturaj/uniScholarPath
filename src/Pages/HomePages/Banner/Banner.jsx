import { useEffect, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";
import video1 from '../../../assets/video1.mp4';
import video2 from '../../../assets/video2.mp4';
import video3 from '../../../assets/video3.mp4';

const Banner = () => {
    const videoRefs = [useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        videoRefs.forEach(videoRef => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        });
    }, []);

    return (
        <div className='w-full container'>
            <div className="carousel w-full relative">
                <div id="slide1" className="carousel-item relative w-full">
                    <video ref={videoRefs[0]} src={video1} className='lg:h-[715px]' loop muted></video>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="text-blue-600 md:text-2xl">❮</a>
                        <a href="#slide2" className="text-blue-600 md:text-2xl">❯</a>
                    </div>
                    <div className="absolute md:bottom-44 bg-gray-500 bottom-5 left-0 w-full bg-opacity-40 py-4">
                        <Fade cascade damping={0.5}>
                            <h2 className="md:text-2xl text-xs text-white text-center font-bold">
                            University of California:<span className="text-blue-600">
                                    <Typewriter words={["Global Study Award, UC Davis Scholarships for International Students."]} loop={0} />
                                </span>
                            </h2>
                        </Fade>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <video ref={videoRefs[1]} src={video2} className='w-full md:h-[715px]' loop muted></video>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="text-blue-600 md:text-2xl">❮</a>
                        <a href="#slide3" className="text-blue-600 md:text-2xl">❯</a>
                    </div>
                    <div className="absolute md:bottom-44 bg-gray-500 bottom-5 left-0 w-full bg-opacity-40 py-4">
                        <Fade cascade damping={0.5}>
                            <h2 className="md:text-2xl text-xs text-white text-center font-bold">
                            Harvard University:<span className="text-blue-600">
                                    <Typewriter words={['Harvard Medical School Financial Aid, various grants and fellowships.']} loop={0} />
                                </span>
                            </h2>
                        </Fade>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <video ref={videoRefs[2]} src={video3} className='w-full md:h-[715px]' loop muted></video>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="text-blue-600 md:text-2xl">❮</a>
                        <a href="#slide1" className="text-blue-600 md:text-2xl">❯</a>
                    </div>
                    <div className="absolute md:bottom-44 bg-gray-500 bottom-5 left-0 w-full bg-opacity-40 py-4">
                        <Fade cascade damping={0.5}>
                            <h2 className="md:text-2xl text-xs text-white text-center font-bold">
                            Stanford University: <span className="text-blue-600">
                                    <Typewriter words={['Knight-Hennessy Scholars Program, Stanford Financial Aid.']} loop={0} />
                                </span>
                            </h2>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
