import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './pages/theme';
import StartPage from './pages/start-page.jsx';
import BookingPage from './Pages/booking-page.jsx';
import PortfolioPage from './pages/portfolio-page.jsx';
import AdminPage from './pages/admin-page.jsx';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
