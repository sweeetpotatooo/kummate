import React from 'react';
import RoommateArticle from "../components/RoommateArticle";
import Header from "../components/Header";
import Footer from "../components/Footer";
const RoommateArticlePage: React.FC = () => {
  return (
    <div>
      <Header/>
      <RoommateArticle />
      <Footer/>
    </div>
  );
};

export default RoommateArticlePage;
