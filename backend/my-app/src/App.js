import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store'; // ✅ Default import
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from "./components/dashboard/Dashboard";

import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Alert from "./components/layout/Alert";
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import Posts from './components/posts/Posts';




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
     store.dispatch(logoutUser());

     //Clear the current profile

     //redirect to login
     window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app-wrapper">
            <Navbar />
            <Alert />
            
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/profile/:id" element={<Profile />} />

                {/* All private routes go under this */}
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/create-profile" element={<CreateProfile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/add-experience" element={<AddExperience />} />
                  <Route path="/add-education" element={<AddEducation />} />
                  <Route path="/posts" element={<Posts />} />
                </Route>
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
