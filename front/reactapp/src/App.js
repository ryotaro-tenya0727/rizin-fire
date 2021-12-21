import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Restaurants, Foods, Orders } from './containers/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Restaurants />} />
      </Routes>
    </Router>
  );
}

export default App;
