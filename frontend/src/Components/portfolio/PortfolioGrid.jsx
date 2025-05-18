import React from 'react';
import PortfolioCard from './PortfolioCard';
//import '../styles/portfolio-page.css';
import '../../styles/portfolio/PortfolioGrid.css';


const PortfolioGrid = ({ items, isLoading, onSelectImage }) => {
  return (
    <div className="portfolio-grid">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="portfolio-card skeleton" />
          ))
        : items.map((item) => (
            <PortfolioCard key={item.id} item={item} onClick={onSelectImage} />
          ))}
    </div>
  );
};

export default PortfolioGrid;
