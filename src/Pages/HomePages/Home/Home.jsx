import PageTitle from "../../../Components/PageTitle/PageTitle";
import Banner from "../Banner/Banner";


const Home = () => {
    return (
        <section>
            <PageTitle title={'Home'}></PageTitle>
            <div className="relative -top-[96px] md:-top-[250px] lg:-top-[99px]"> <Banner></Banner></div>
        </section>
    );
};

export default Home;