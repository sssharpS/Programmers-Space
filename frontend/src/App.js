import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/shared/navigation/Navbar';
import Home from './pages/Home/Home';
import Authenticate from './pages/Authenticate/Authenticate';


function App() {
  return (
    <div>
        <Router>
           <Navbar />
          <Routes>
             <Route exact path='/' element={<Home />}/>
             <Route path='/authenticate' element={<Authenticate />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
