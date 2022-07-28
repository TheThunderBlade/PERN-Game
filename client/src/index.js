import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/400.css';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Routes from './routes';
import history from './utils/history';
import theme from './utils/theme';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Router history={history} basename="/">
      <Routes/>
    </Router>
  </ThemeProvider>
);

reportWebVitals();
