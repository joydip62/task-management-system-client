import { useEffect } from "react";
import Banner from "./Banner";
import TargetAudienceSection from "./TargetAudienceSection/TargetAudienceSection";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
    useEffect(() => {
      AOS.init();
    }, []);
  
    return (
      <div>
        <Banner />
        <TargetAudienceSection/>
      </div>
    );
};

export default Home;