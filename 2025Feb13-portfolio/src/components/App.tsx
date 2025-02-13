import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'
import './App.css'
import Main from './Main'
import Uses from './Uses.tsx'
import Projects from './Projects.tsx'
import About from './About.tsx'

function App() {

  return (
    
  <div className="relative">
      <BrowserRouter>
      <Navbar/>
       <Routes>
        <Route path="home" element={<Main />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="uses" element={<Uses />} />
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App
