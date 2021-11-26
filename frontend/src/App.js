import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Play from './pages/Play'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/playing" element={<Play/>} />
          {/* <Route component={NotFound} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
