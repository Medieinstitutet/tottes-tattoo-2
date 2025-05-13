import React from 'react';
import styled from 'styled-components';
import tattooHero from '../assets/tattoo-Hero.jpg'; // adjust path/filename if needed

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  min-height: 100vh;
`;

const NavBar = styled.nav`
  width: 100%;
  background: #2a1a13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 3rem 1.2rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: linear-gradient(rgba(24, 23, 22, 0.8), rgba(24, 23, 22, 0.8)),
    url(${(props) => props.bg}) center/cover;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gold};
  padding-top: 6.5rem;
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.gold};
  font-size: 3rem;
  letter-spacing: 2px;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 1.3rem;
  margin-bottom: 2rem;
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
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem 2rem 1rem;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gold};
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 2.2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gold};
  display: inline-block;
`;

const StudioGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
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
`;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const TeamCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAccent};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 8px;
  padding: 2rem 1.5rem;
  width: 250px;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  margin-bottom: 1rem;
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
`;

export default function StartPage() {
  return (
    <Wrapper>
      <NavBar>
        <Logo>
          TOTTES <span>TATTOO</span>
        </Logo>
        <NavLinks>
          <NavLink>Hem</NavLink>
          <NavLink>Portfolio</NavLink>
          <NavLink>Bokning</NavLink>
        </NavLinks>
      </NavBar>
      <Hero bg={tattooHero}>
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
      </Hero>

      <Section>
        <StudioGrid>
          <StudioImage src={tattooHero} alt='Tottes Tattoo studio interior' />
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
        <SectionTitle>Vårt Team</SectionTitle>
        <TeamGrid>
          <TeamCard>
            <TeamImg src={tattooHero} alt='Totte Lindström' />
            <TeamName>Totte Lindström</TeamName>
            <TeamRole>Grundare & Konstnärlig ledare</TeamRole>
            <TeamDesc>
              15+ års erfarenhet av tatueringskonst och passion för
              fantasy-motiv. Specialiserad på detaljrika drakar och magiska
              väsen.
            </TeamDesc>
          </TeamCard>
          <TeamCard>
            <TeamImg src={tattooHero} alt='Amanda Berg' />
            <TeamName>Amanda Berg</TeamName>
            <TeamRole>Senior tatuerare</TeamRole>
            <TeamDesc>
              Expert på realistiska porträtt med fantasyinslag. Perfektion i
              detaljer och kreativa motiv.
            </TeamDesc>
          </TeamCard>
          <TeamCard>
            <TeamImg src={tattooHero} alt='Erik Sandberg' />
            <TeamName>Erik Sandberg</TeamName>
            <TeamRole>Tatuerare & Designer</TeamRole>
            <TeamDesc>
              Specialist på neo-traditionella design med fokus på mytologiska
              figurer och färgstarka motiv.
            </TeamDesc>
          </TeamCard>
          <TeamCard>
            <TeamImg src={tattooHero} alt='Julia Chen' />
            <TeamName>Julia Chen</TeamName>
            <TeamRole>Akvarell & Abstrakt Expert</TeamRole>
            <TeamDesc>
              Unik stil med flytande former och mjuka färgövergångar. Fantasy
              och akvarell i kombination.
            </TeamDesc>
          </TeamCard>
          <TeamCard>
            <TeamImg src={tattooHero} alt='Marcus Diaz' />
            <TeamName>Marcus Diaz</TeamName>
            <TeamRole>Tribal & Biomekanisk Expert</TeamRole>
            <TeamDesc>
              Mästare på tribal och biomekaniska tatueringar med fantasy-inslag
              och detaljerade mönster.
            </TeamDesc>
          </TeamCard>
        </TeamGrid>
      </Section>

      <Footer>
        <b>Tottes Tattoo</b> &copy; 2024. Alla rättigheter förbehållna.
        <br />
        Din väg till unika fantasy-tatueringar.
      </Footer>
    </Wrapper>
  );
}
