import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home  />} />
      <Route path="/chat/:chatId" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
