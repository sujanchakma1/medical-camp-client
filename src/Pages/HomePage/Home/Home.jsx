import React from "react";
import Banner from "../Banner/Banner";
import PopularCamp from "../PopularCamp/PopularCamp";
import HealthTips from "../HealthTips/HealthTips";
import HomepageFeedback from "../HomepageFeedback/HomepageFeedback";
import { Helmet } from "react-helmet-async";



const Home = () => {
 
  return (
    <div>
      <Helmet>
        <title>Home || MedCamp</title>
      </Helmet>
      <Banner></Banner>
      <PopularCamp ></PopularCamp>
      <HealthTips></HealthTips>
      <HomepageFeedback data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-once="false" data-aos-duration="800"></HomepageFeedback>
    </div>
  );
};

export default Home;
