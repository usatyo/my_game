import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Play from './pages/Play'
import AppContextProvider from './contexts/AppContext';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/playing' element={<Play />} />
          {/* <Route component={NotFound} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const AppContainer = () => {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )
}

export default AppContainer
