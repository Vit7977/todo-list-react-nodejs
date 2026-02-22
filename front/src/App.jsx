import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Pages/Login.jsx';
import ProtectedRoute from './Pages/ProtectedRoute.jsx';
import Home from './Pages/Home.jsx';
import Cadastrar from './Pages/Cadastrar.jsx';
import NotFound from './Pages/NotFound.jsx';

function App() {

  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  return (

    <BrowserRouter>

      <Routes>

        <Route path="*" element={<NotFound />} />

        <Route
          path='/login'
          element={<Login setIsAuth={setIsAuth} />}
        />

        <Route
          path='/cadastrar'
          element={<Cadastrar />}
        />

        <Route
          path='/'
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;