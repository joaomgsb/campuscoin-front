import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { AuthProvider } from '../src/AuthContext';
import PrivateRoute from '../src/PrivateRoute';
import TestPage from './pages/Teste';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<PrivateRoute />}>
            <Route path='home' element={<Home />} />
            <Route path='teste' element={<TestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;