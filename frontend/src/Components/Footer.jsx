import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #2a1a13;
  color: #fff;
  padding: 2rem 0 1.5rem 0;
  text-align: center;
  border-top: 2px solid #d4af37;
  font-family: ${({ theme }) => theme.fonts.main};
  margin-top: auto;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <b style={{ color: '#d4af37' }}>Tottes Tattoo</b> &copy; 2024. Alla
      rättigheter förbehållna.
      <br />
      <span style={{ color: '#b8c6d1' }}>
        Din väg till unika fantasy-tatueringar.
      </span>
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
        }}>
        <a
          href='#'
          aria-label='Instagram'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: '#d4af37', fontSize: '2rem' }}>
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
        </a>
        <a
          href='#'
          aria-label='Facebook'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: '#d4af37', fontSize: '2rem' }}>
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
        </a>
        <a
          href='#'
          aria-label='YouTube'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: '#d4af37', fontSize: '2rem' }}>
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
        </a>
        <a
          href='#'
          aria-label='X'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: '#d4af37', fontSize: '2rem' }}>
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
        </a>
      </div>
    </FooterWrapper>
  );
}
