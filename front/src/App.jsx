import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Login from './Pages/Login.jsx';
import ProtectedRoute from './Pages/ProtectedRoute.jsx';
import PublicRoute from './Pages/PublicRoute.jsx';
import Home from './Pages/Home.jsx';
import Cadastrar from './Pages/Cadastrar.jsx';
import NotFound from './Pages/NotFound.jsx';
import Perfil from './Pages/Perfil.jsx';
import Tarefas from './Pages/Tarefas.jsx';

function App() {

  const [isAuth, setIsAuth] = useState(false);

  const validateToken = async () => {

    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      return;
    }

    try {
      await axios.get("http://localhost:9090/api/usuario/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setIsAuth(true);

    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUsername");
      localStorage.removeItem("loggedEmail");
      window.location.reload();
    }
  }

  useEffect(() => {
    validateToken()
  }, [])

  useEffect(() => {

    const handleStorageChange = (event) => {
      if (event.key === "token") {
        console.log("Token alterado!");

        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };

  }, []);

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            isAuth
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<NotFound />} />


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

        <Route
          path="/perfil"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tarefas"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Tarefas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;