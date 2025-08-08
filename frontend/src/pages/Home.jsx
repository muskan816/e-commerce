import FeatureProducts from "../components/FeatureProducts";
import LandingPage from "../components/LandingPage";
import Services from "../components/Services";
import Trusted from "../components/Trusted";

const Home = () => {
  const name = "Shoporia";
  return (
    <>
      <LandingPage name={name} />
      <FeatureProducts/>
      <Services />
      <Trusted/>
    </>
  );
};

export default Home;
