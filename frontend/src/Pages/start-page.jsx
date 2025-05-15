import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tattooHero from '../assets/tattoo-Hero.jpg'; // adjust path/filename if needed
import mantattoo1 from '../assets/man_tatto1.jpg';
import mantattoo2 from '../assets/man_tatto2.jpg';
import mantattoo3 from '../assets/man_tatto3.jpg';
import mantattoo4 from '../assets/man_tatto4.jpg';
import womantatto from '../assets/woman_tatto.jpg';
import studio1 from '../assets/studio1.jpg';
import studio2 from '../assets/studio2.jpg';
import studio3 from '../assets/studio3.jpg';
import studio4 from '../assets/studio4.jpg';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Roboto', ${({ theme }) => theme.fonts.main};
  min-height: 100vh;
  overflow-x: hidden;
`;

const NavBar = styled.nav`
  width: 100%;
  background: #2a1a13;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.gold};
  letter-spacing: 2px;
  font-weight: bold;
  span {
    color: ${({ theme }) => theme.colors.text};
    font-weight: normal;
    font-size: 1.2rem;
    margin-left: 0.3rem;
    font-family: ${({ theme }) => theme.fonts.main};
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2.5rem;
  list-style: none;
  margin: 0;

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 0;
  }
`;

const NavLink = styled.li`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  opacity: 0.85;
  cursor: default;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    opacity: 1;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Hero = styled.section`
  width: 100vw;
  min-height: 70vh;
  background: linear-gradient(rgba(24, 23, 22, 0.8), rgba(24, 23, 22, 0.8)),
    url(${(props) => props.bg}) center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gold};
  padding-top: 6.5rem;
  margin: 0;
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.gold};
  font-size: 3rem;
  letter-spacing: 2px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 1.3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButton = styled.a`
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.background};
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.1rem;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem 2rem 1rem;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gold};
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 2.2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gold};
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StudioGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const StudioImage = styled.img`
  width: 350px;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 8px;
  background: #222;
`;

const StudioText = styled.div`
  flex: 1;
  min-width: 250px;

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 1rem;
  }
`;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const TeamCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAccent};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 8px;
  padding: 2rem 1.5rem;
  width: 220px;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const TeamImg = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  object-position: top center;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  margin-bottom: 1rem;
  background: #222;
  display: block;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const TeamName = styled.h3`
  color: ${({ theme }) => theme.colors.gold};
  font-family: ${({ theme }) => theme.fonts.accent};
  margin-bottom: 0.5rem;
`;

const TeamRole = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSoft};
  margin-bottom: 0.5rem;
`;

const TeamDesc = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundAccent};
  color: ${({ theme }) => theme.colors.textSoft};
  text-align: center;
  padding: 2rem 1rem 1rem 1rem;
  border-top: 2px solid ${({ theme }) => theme.colors.gold};
  margin-top: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem 0.5rem 1rem 0.5rem;
    font-size: 0.95rem;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 320px;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 8px;
  background: #222;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const StudioCTA = styled.a`
  display: inline-block;
  margin: 2rem 0 0 0;
  padding: 1rem 2.5rem;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.05rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.gold};
  font-size: 2rem;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.goldLight};
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CTACard = styled(TeamCard)`
  margin-top: 0;
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin-top: 1.5rem;
  }
`;

export default function StartPage() {
  const studioImages = [studio1, studio2, studio3, studio4];
  const [studioIndex, setStudioIndex] = useState(0);
  const nextStudio = () =>
    setStudioIndex((studioIndex + 1) % studioImages.length);
  const prevStudio = () =>
    setStudioIndex(
      (studioIndex - 1 + studioImages.length) % studioImages.length
    );

  // Autoplay: move to next image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStudioIndex((prev) => (prev + 1) % studioImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [studioImages.length]);

  return (
    <Wrapper>
      <NavBar>
        <NavContent>
          <Logo>
            TOTTES <span>TATTOO</span>
          </Logo>
          <NavLinks>
            <NavLink>
              <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
                Hem
              </Link>
            </NavLink>
            <NavLink>
              <Link
                to='/portfolio'
                style={{ color: 'inherit', textDecoration: 'none' }}>
                Portfolio
              </Link>
            </NavLink>
            <NavLink>
              <Link
                to='/booking'
                style={{ color: 'inherit', textDecoration: 'none' }}>
                Bokning
              </Link>
            </NavLink>
          </NavLinks>
        </NavContent>
      </NavBar>
      <Hero bg={tattooHero}>
        <HeroContent>
          <HeroTitle>Välkommen till Tottes Tattoo</HeroTitle>
          <HeroSubtitle>
            Din resa mot en unik tatuering börjar här i hjärtat av Kungälv
          </HeroSubtitle>
          <HeroSubtitle style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Med över 15 års erfarenhet och en passion för fantasy-motiv med hög
            detaljrikedom,
            <br />
            skapar vi tatueringar som berättar din unika historia.
          </HeroSubtitle>
          <HeroButton href='#booking'>Boka din tid</HeroButton>
        </HeroContent>
      </Hero>

      <Section>
        <StudioGrid>
          <div>
            <CarouselWrapper>
              {studioImages.map((img, i) => (
                <CarouselImage
                  key={i}
                  src={img}
                  alt={`Studio ${i + 1}`}
                  active={i === studioIndex}
                />
              ))}
            </CarouselWrapper>
            <StudioCTA href='#booking'>Boka nu</StudioCTA>
          </div>
          <StudioText>
            <SectionTitle>Vår studio</SectionTitle>
            <p>
              Vår studio i Kungälv är utrustad med modern teknik och ett team av
              erfarna tatuerare specialiserade på fantasy-motiv.
            </p>
            <p>
              Vi tar fram unika design som representerar dina idéer, drömmar och
              berättelser, allt med fokus på detaljrikedom och kvalitet som
              håller.
            </p>
            <p>
              <b>Öppettider:</b>
              <br />
              Måndag - Fredag: 09:00 - 18:00
            </p>
            <p>
              <b>Lunchstängt:</b> 12:00 - 13:00
            </p>
            <p>
              <b>Adress:</b>
              <br />
              Storgatan 123
              <br />
              442 31 Kungälv
            </p>
          </StudioText>
        </StudioGrid>
      </Section>

      <Section>
        <SectionTitle style={{ marginBottom: '2rem', textAlign: 'left' }}>
          Vårt Team
        </SectionTitle>
        <TeamGrid>
          <TeamCard>
            <TeamImg src={mantattoo1} alt='Totte Lindström' />
            <TeamName>Totte Lindström</TeamName>
            <TeamRole>Grundare & Konstnärlig ledare</TeamRole>
            <TeamDesc>
              15+ års erfarenhet av tatueringskonst och passion för
              fantasy-motiv. Specialiserad på detaljrika drakar och magiska
              väsen.
            </TeamDesc>
          </TeamCard>
          <TeamCard>
            <TeamImg src={mantattoo2} alt='Anders Lindström' />
            <TeamName>Anders Lindström</TeamName>
            <TeamRole>Senior tatuerare</TeamRole>
            <TeamDesc>
              Expert på realistiska porträtt med fantasyinslag. Perfektion i
              detaljer och kreativa motiv.
            </TeamDesc>
          </TeamCard>
          <TeamCard>
            <TeamImg src={mantattoo3} alt='Erik Sandberg' />
            <TeamName>Erik Sandberg</TeamName>
            <TeamRole>Tatuerare & Designer</TeamRole>
            <TeamDesc>
              Specialist på neo-traditionella design med fokus på mytologiska
              figurer och färgstarka motiv.
            </TeamDesc>
          </TeamCard>
          <TeamCard>
            <TeamImg src={mantattoo4} alt='Marcus Diaz' />
            <TeamName>Marcus Diaz</TeamName>
            <TeamRole>Tribal & Biomekanisk Expert</TeamRole>
            <TeamDesc>
              Mästare på tribal och biomekaniska tatueringar med fantasy-inslag
              och detaljerade mönster.
            </TeamDesc>
          </TeamCard>
          <TeamCard>
            <TeamImg src={womantatto} alt='amanda Berg' />
            <TeamName>Amanda Berg</TeamName>
            <TeamRole>Akvarell & Abstrakt Expert</TeamRole>
            <TeamDesc>
              Unik stil med flytande former och mjuka färgövergångar. Fantasy
              och akvarell i kombination.
            </TeamDesc>
          </TeamCard>
          <CTACard>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '1.1rem',
                  margin: '0 0 1rem 0',
                  color: '#fff',
                }}>
                Redo att förverkliga din vision?
              </p>
              <p
                style={{
                  fontSize: '1rem',
                  margin: '0 0 1.5rem 0',
                  color: '#fff',
                }}>
                Boka en konsultation med en av våra erfarna tatuerare idag
              </p>
              <a
                href='#booking'
                style={{
                  display: 'inline-block',
                  background: '#FFD700',
                  color: '#181716',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  padding: '0.8rem 2rem',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = '#ffe066')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = '#FFD700')
                }>
                Boka tid nu
              </a>
            </div>
          </CTACard>
        </TeamGrid>
      </Section>

      <Footer>
        <b>Tottes Tattoo</b> &copy; 2024. Alla rättigheter förbehållna.
        <br />
        Din väg till unika fantasy-tatueringar.
        <SocialIcons>
          <SocialIcon
            href='#'
            aria-label='Instagram'
            target='_blank'
            rel='noopener noreferrer'>
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
              <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
              <line x1='17.5' y1='6.5' x2='17.5' y2='6.5' />
            </svg>
          </SocialIcon>
          <SocialIcon
            href='#'
            aria-label='Facebook'
            target='_blank'
            rel='noopener noreferrer'>
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z' />
            </svg>
          </SocialIcon>
          <SocialIcon
            href='#'
            aria-label='YouTube'
            target='_blank'
            rel='noopener noreferrer'>
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <rect x='2' y='7' width='20' height='10' rx='3' ry='3' />
              <polygon points='10 9 15 12 10 15 10 9' />
            </svg>
          </SocialIcon>
          <SocialIcon
            href='#'
            aria-label='X'
            target='_blank'
            rel='noopener noreferrer'>
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M18 6L6 18M6 6l12 12' />
            </svg>
          </SocialIcon>
        </SocialIcons>
      </Footer>
    </Wrapper>
  );
}
