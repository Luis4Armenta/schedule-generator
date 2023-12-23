import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from "./pages/homepage/homepage";
import Generator from './pages/generator/Generator';
import './app.css'

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' exact Component={HomePage}/>
          <Route path='/generator' Component={Generator} />
        </Routes>
      </Router>
  );
}

export default App;
