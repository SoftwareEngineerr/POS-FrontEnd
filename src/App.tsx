import { useState } from 'react'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { Themefunc } from './theme/DefaultColors'; 
import { useRoutes } from 'react-router-dom';
import './assets/css/index.scss'
import { FirstTimeWebSrn } from './hooks/FirstTimeWebSrn/FirstTimeWebSrn';
import Popup from './components/popup/popup';
import ErrorBoundary from './components/errorboundries/errorboundries';

import { useAppRoutes } from './routes/routes'


function App() {
   const theme = Themefunc()

  // 🔥 NOW ROUTES ARE DYNAMIC (based on Redux role)
  const routes = useAppRoutes()
  const routing = useRoutes(routes)

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>

        <FirstTimeWebSrn />
        <Popup />

        {/* 🔥 dynamic routes */}
        {routing}

      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
