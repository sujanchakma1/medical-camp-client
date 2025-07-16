import React from 'react';
import Banner from '../Banner/Banner';
import PopularCamp from '../PopularCamp/PopularCamp';
import HealthTips from '../HealthTips/HealthTips';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularCamp></PopularCamp>
      <HealthTips></HealthTips>
    </div>
  );
};

export default Home;