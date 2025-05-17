import React, { useState, useRef } from 'react';
import '../styles/portfolio-page.css';

const Lightbox = ({ image, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const imgRef = useRef(null);

  if (!image) return null;

  const shareImage = () => {
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">✖</button>
        <div className="lightbox-image-container">
          <div
            className={`zoom-scroll-container ${isZoomed ? 'zoomed' : ''}`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              ref={imgRef}
              src={image.imageUrl}
              alt={image.title}
            />
          </div>
          {navigator.share && (
            <button className="lightbox-share" onClick={shareImage} title="Dela" aria-label="Share Image">📤</button>
          )}
        </div>
        <div className="lightbox-info">
          <h3>{image.title}</h3>
          <p>{image.description}</p>
          <p className="lightbox-artist">Artist: {image.artist}</p>
          <div className="lightbox-categories">
            {image.categories.map((cat) => (
              <span key={cat} className="category-tag">{cat}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
