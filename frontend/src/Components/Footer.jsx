import styled from 'styled-components';

const FooterWrapper = styled.footer`
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

const Footer = ({ children }) => <FooterWrapper>{children}</FooterWrapper>;

export default Footer;
