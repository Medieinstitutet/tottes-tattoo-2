import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundAccent};
  color: ${({ theme }) => theme.colors.textSoft};
  text-align: center;
  padding: 2rem 1rem 1rem 1rem;
  border-top: 2px solid ${({ theme }) => theme.colors.gold};
  margin-top: 0;
  font-family: ${({ theme }) => theme.fonts.main};

  @media (max-width: 768px) {
    padding: 1.5rem 0.5rem 1rem 0.5rem;
    font-size: 0.95rem;
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

export default function Footer() {
  return (
    <FooterWrapper>
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
    </FooterWrapper>
  );
}
