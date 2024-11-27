import About from "../Components/fragments/landing pages/About";
import Details from "../Components/fragments/landing pages/Details";
import Footer from "../Components/fragments/landing pages/Footer";
import Hero from "../Components/fragments/landing pages/Hero";
import Navbar from "../Components/fragments/landing pages/Navbar";
import Search from "../Components/fragments/landing pages/Search";
import Team from "../Components/fragments/landing pages/Team";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Search />
      <About />
      <Details />
      <Team />
      <Footer />
    </div>
  );
};

export default Home;
