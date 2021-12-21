import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Votes } from './containers/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Votes />} />
      </Routes>
    </Router>
  );
}

export default App;
