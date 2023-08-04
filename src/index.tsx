import { createTheme, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

const root = createRoot(document.getElementById('root') as Element);

root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={createTheme()}>
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
