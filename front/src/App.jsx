import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Pages/Login.jsx';
import ProtectedRoute from './Pages/ProtectedRoute.jsx';
import Home from './Pages/Home.jsx';
import Cadastrar from './Pages/Cadastrar.jsx';

function App() {

  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path='/'
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path='/login'
          element={<Login setIsAuth={setIsAuth} />}
        />

        <Route
          path='/cadastrar'
          element={<Cadastrar />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;