import React from 'react';
import Banner from '../Banner/Banner';
import PopularCamp from '../PopularCamp/PopularCamp';
import HealthTips from '../HealthTips/HealthTips';
import HomepageFeedback from '../HomepageFeedback/HomepageFeedback';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularCamp></PopularCamp>
      <HealthTips></HealthTips>
      <HomepageFeedback></HomepageFeedback>
    </div>
  );
};

export default Home;