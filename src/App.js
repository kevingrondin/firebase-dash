import { Routes, Route, HashRouter  } from 'react-router-dom';
import Header from './Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import './App.css';

const App = () => (
  <>
    <HashRouter >
      <Header></Header>
      <div className="app">
        <div className="ui grid container">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  </>
)

export default App;
