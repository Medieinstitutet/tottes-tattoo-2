import React, { useState, useEffect } from 'react';
//import '../styles/portfolio-page.css';
import '../styles/portfolio/portfolio-page.css';

import Navigation from '../Components/NavBar';
import Footer from '../Components/Footer';

import DropdownFilter from '../Components/portfolio/DropdownFilter';
import Lightbox from '../Components/portfolio/Lightbox';
import PortfolioGrid from '../Components/portfolio/PortfolioGrid';

// images
import fantasyWarrior from '../assets/portfolio-page-images/Fantasy-Warrior.webp';
import dragonTattoo from '../assets/portfolio-page-images/Dragon-Tattoo.webp';
import realistisktPorträtt from '../assets/portfolio-page-images/Realistiskt-Porträtt.webp';
import fantasyRealism from '../assets/portfolio-page-images/Fantasy-Realism.webp';
import mythologicalGoddess from '../assets/portfolio-page-images/Mythological-Goddess.webp';
import colorfulPhoenix from '../assets/portfolio-page-images/Colorful-Phoenix.webp';
import biomechanicalSkull from '../assets/portfolio-page-images/Biomechanical-Skull.webp';
import tribalShoulderDesign from '../assets/portfolio-page-images/Tribal-Shoulder-Design-tattoo.webp';
import akvarellEye from '../assets/portfolio-page-images/Akvarell-Eye.webp';
import abstractFlow from '../assets/portfolio-page-images/Abstract-Flow.webp';
//finished images
const PortfolioPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArtist, setSelectedArtist] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = [
    { id: 'all', name: 'Alla Stilar' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'drakar', name: 'Drakar' },
    { id: 'magiska', name: 'Magiska Väsen' },
    { id: 'realism', name: 'Realism' },
    { id: 'porträtt', name: 'Porträtt' },
    { id: 'neotraditional', name: 'Neo-Traditional' },
    { id: 'mytologi', name: 'Mytologi' },
    { id: 'färg', name: 'Färg' },
    { id: 'tribal', name: 'Tribal' },
    { id: 'biomekanisk', name: 'Biomekanisk' },
    { id: 'akvarell', name: 'Akvarell' },
    { id: 'abstrakt', name: 'Abstrakt' },
  ];

  const artists = [
    'all',
    'Totte Lindström',
    'Anders Lindström',
    'Erik Sandberg',
    'Marcus Diaz',
    'Amanda Berg',
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Fantasy Warrior',
      description: 'Fantasymotiv med svärd och magi',
      imageUrl: fantasyWarrior,
      categories: ['fantasy', 'magiska'],
      artist: 'Totte Lindström',
    },
    {
      id: 2,
      title: 'Dragon Tattoo',
      description: 'Drake med blå detaljer i fantasy-stil',
      imageUrl: dragonTattoo,
      categories: ['fantasy', 'drakar'],
      artist: 'Totte Lindström',
    },
    {
      id: 3,
      title: 'Realistiskt Porträtt',
      description: 'Grayscale realistiskt ansikte',
      imageUrl: realistisktPorträtt,
      categories: ['realism', 'porträtt'],
      artist: 'Anders Lindström',
    },
    {
      id: 4,
      title: 'Fantasy Realism',
      description: 'Porträtt med fantasy-touch i realistisk stil',
      imageUrl: fantasyRealism,
      categories: ['realism', 'porträtt', 'fantasy'],
      artist: 'Anders Lindström',
    },
    {
      id: 5,
      title: 'Mythological Goddess',
      description: 'Neo-traditionellt färgmotiv med mytologi',
      imageUrl: mythologicalGoddess,
      categories: ['neotraditional', 'mytologi', 'färg'],
      artist: 'Erik Sandberg',
    },
    {
      id: 6,
      title: 'Colorful Phoenix',
      description: 'Färgstark fenix i rörelse',
      imageUrl: colorfulPhoenix,
      categories: ['färg', 'mytologi'],
      artist: 'Erik Sandberg',
    },
    {
      id: 7,
      title: 'Biomechanical Skull',
      description: 'Biomekaniskt motiv med metallstruktur',
      imageUrl: biomechanicalSkull,
      categories: ['färg', 'biomekanisk'],
      artist: 'Marcus Diaz',
    },
    {
      id: 8,
      title: 'Tribal Shoulder Design',
      description: 'Tribal-stil på axel med skuggning',
      imageUrl: tribalShoulderDesign,
      categories: ['tribal'],
      artist: 'Marcus Diaz',
    },
    {
      id: 9,
      title: 'Akvarell Eye',
      description: 'Öga målat i akvarellstil',
      imageUrl: akvarellEye,
      categories: ['akvarell'],
      artist: 'Amanda Berg',
    },
    {
      id: 10,
      title: 'Abstract Flow',
      description: 'Abstrakta färger och former i flyt',
      imageUrl: abstractFlow,
      categories: ['färg', 'abstrakt', 'akvarell'],
      artist: 'Amanda Berg',
    },
  ];

  const filteredItems = portfolioItems.filter((item) => {
    const categoryMatch =
      selectedCategory === 'all' || item.categories.includes(selectedCategory);
    const artistMatch =
      selectedArtist === 'all' || item.artist === selectedArtist;
    return categoryMatch && artistMatch;
  });

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    //setTimeout(() => setIsLoading(false), 1000);
    setIsLoading(false);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Navigation />
      <div className='portfolio-page'>
        <div className='portfolio-background'></div>
        <div className='portfolio-container'>
          <h1 className='portfolio-heading'>Våra Arbeten</h1>
          <p className='portfolio-intro'>
            Utforska konstnärernas olika stilar och uttryck.
          </p>

          <div className='dropdown-filters-container'>
            <DropdownFilter
              label='Stilar'
              options={categories.map((c) => c.id)}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <DropdownFilter
              label='Artister'
              options={artists}
              selected={selectedArtist}
              onSelect={setSelectedArtist}
            />
          </div>

          <PortfolioGrid
            items={filteredItems}
            isLoading={isLoading}
            onSelectImage={setSelectedImage}
          />
        </div>
      </div>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />

      {showScrollTop && (
        <button
          className='scroll-top-button'
          onClick={scrollToTop}
          aria-label='Scroll to top'>
          ↑
        </button>
      )}

      <Footer />
    </>
  );
};

export default PortfolioPage;
