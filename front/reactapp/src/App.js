import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Fighters, Restaurants } from './containers/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Fighters />} />
        <Route path='/restaurants' element={<Restaurants />} />
      </Routes>
    </Router>
  );
}

export default App;
