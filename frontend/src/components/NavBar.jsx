import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

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

const NavItem = styled.li``;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  opacity: 0.85;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
  &.active {
    color: ${({ theme }) => theme.colors.gold};
    font-weight: bold;
    opacity: 1;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    opacity: 1;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export default function Navigation() {
  return (
    <NavBar>
      <NavContent>
        <Logo>
          TOTTES <span>TATTOO</span>
        </Logo>
        <NavLinks>
          <NavItem>
            <StyledNavLink to='/' end>
              Hem
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to='/portfolio'>Portfolio</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to='/booking'>Bokning</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to='/admin'>Admin</StyledNavLink>
          </NavItem>
        </NavLinks>
      </NavContent>
    </NavBar>
  );
}
