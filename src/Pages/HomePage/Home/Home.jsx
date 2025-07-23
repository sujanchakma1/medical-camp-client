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
      <PopularCamp></PopularCamp>
      <HealthTips></HealthTips>
      <HomepageFeedback></HomepageFeedback>
    </div>
  );
};

export default Home;
