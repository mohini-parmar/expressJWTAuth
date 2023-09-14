import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <div>
      <ToastContainer />
    </div>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
