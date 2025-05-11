import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store'; // ✅ Default import

import './App.css';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';




function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Container><Register /></Container>} />
            <Route path="/login" element={<Container><Login /></Container>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}


function Container({ children }) {
  return <div className='container'>{children}</div>;
}

export default App;
