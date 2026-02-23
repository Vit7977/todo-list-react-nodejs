import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './Pages/Login.jsx';
import ProtectedRoute from './Pages/ProtectedRoute.jsx';
import PublicRoute from './Pages/PublicRoute.jsx';
import Home from './Pages/Home.jsx';
import Cadastrar from './Pages/Cadastrar.jsx';
import NotFound from './Pages/NotFound.jsx';

function App() {

  const lastAccess = localStorage.getItem('lastaccess');

  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  return (

    <BrowserRouter>

      <Routes>

        <Route path="*" element={<NotFound />} />

        <Route
          path="/"
          element={
            isAuth
              ? <Navigate to={lastAccess || "/home"} replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute isAuth={isAuth}>
              <Login setIsAuth={setIsAuth} />
            </PublicRoute>
          }
        />

        <Route
          path="/cadastrar"
          element={
            <PublicRoute isAuth={isAuth}>
              <Cadastrar />
            </PublicRoute>
          }
        />

        <Route
          path="/home"
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