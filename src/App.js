import { Routes, Route, HashRouter  } from 'react-router-dom';

import "./App.css";

import Header from './Header';

import ProfileRedirect from "./router/ProfileRedirect";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Users from "./pages/Users";

const App = () => (
  <>
    <HashRouter>
      <Header></Header>
      <div className="app">
        <div className="ui grid container">
          <Routes>
            <ProfileRedirect path="/signup" element={<Signup />} />
            <ProfileRedirect path="/login" element={<Login />} />
            <AdminRoute path="/users" element={<Users />} />
            <PrivateRoute path="/profile/:id" element={<Profile />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  </>
);

export default App;
