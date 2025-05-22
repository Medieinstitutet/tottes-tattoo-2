import React, { useState } from 'react';
import '../../styles/portfolio/PortfolioCard.css';

const PortfolioCard = ({ item, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="portfolio-card"
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
    >
      <div className="portfolio-image-container">
        {!imageLoaded && <div className="image-skeleton" />}
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`portfolio-image ${imageLoaded ? 'loaded' : ''}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="portfolio-overlay">
          <h3 className="portfolio-title">{item.title}</h3>
          <p className="portfolio-description">{item.description}</p>
          <p className="portfolio-artist">Artist: {item.artist}</p>

          <div className="portfolio-categories">
            {item.categories.map((cat) => (
              <span key={cat} className="category-tag">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
