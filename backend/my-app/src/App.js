import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store'; // ✅ Default import
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";


import './App.css';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken);

  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) 
  {
    //logout user
     store.dispatch(logoutUser);

     //Clear the current profile

     //redirect to login
     window.location.href = '/login'
  }
}


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
