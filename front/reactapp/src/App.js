import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Fighters } from './containers/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Fighters />} />
      </Routes>
    </Router>
  );
}

export default App;
