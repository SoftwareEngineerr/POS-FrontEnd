import { useState } from 'react'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { Themefunc } from './theme/DefaultColors'; 
import { useRoutes } from 'react-router-dom';
import { Routering } from './routes/routes';
import './assets/css/index.scss'
import { FirstTimeWebSrn } from './hooks/FirstTimeWebSrn/FirstTimeWebSrn';
import Popup from './components/popup/popup';
import ErrorBoundary from './components/errorboundries/errorboundries';

function App() {
  const theme = Themefunc();
  const routing = useRoutes(Routering);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>

        <FirstTimeWebSrn />
        <Popup />
        {routing}

      </ErrorBoundary>


    </ThemeProvider>
  )
}

export default App
