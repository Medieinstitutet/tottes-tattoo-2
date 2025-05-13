import { ThemeProvider } from 'styled-components';
import { theme } from './Pages/theme'; // eller "./theme" om theme.js ligger direkt i src
import StartPage from './Pages/start-page';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StartPage />
    </ThemeProvider>
  );
}

export default App;
