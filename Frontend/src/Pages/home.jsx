import About from "../Components/fragments/landing pages/About";
import Choose from "../Components/fragments/landing pages/Choose";
import Details from "../Components/fragments/landing pages/Details";
import Dream from "../Components/fragments/landing pages/Dream";
import FindBestRealEstate from "../Components/fragments/landing pages/FindBestRealEstate";
import Footer from "../Components/fragments/landing pages/Footer";
import Hero from "../Components/fragments/landing pages/Hero";
import Navbar from "../Components/fragments/landing pages/Navbar";
import Residences from "../Components/fragments/landing pages/Residences";
import Search from "../Components/fragments/landing pages/Search";
import Service from "../Components/fragments/landing pages/Service";
import Team from "../Components/fragments/landing pages/Team";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Search />
      <About />
      <Details />
      <Service />
      <Residences />
      <FindBestRealEstate />
      <Choose />
      <Team />
      <Dream />
      <Footer />
    </div>
  );
};

export default Home;
