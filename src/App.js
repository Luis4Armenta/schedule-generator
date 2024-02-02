import React from 'react'
import { Route, Routes} from 'react-router-dom'
import HomePage from "./pages/homepage/homepage";
import Generator from './pages/generator/Generator';
import { HashRouter } from 'react-router-dom';

import './app.css'

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path='/' exact Component={HomePage}/>
          <Route path='/generator' Component={Generator} />
        </Routes>
      </HashRouter>
  );
}

export default App;
