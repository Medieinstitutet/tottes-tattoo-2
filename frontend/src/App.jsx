import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './Pages/theme'; // Ändra sökväg om behövs
import StartPage from './pages/start-page.jsx';
import BookingPage from './Pages/booking-page.jsx';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
