import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Fighters, Results } from './containers/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Fighters />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
