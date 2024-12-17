import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Componente para el botón de cerrar sesión
const SignOutButton = ({ cerrarSesion }) => (
  <a href="/" className="a-sign-out" id="container-in-header">
    <button className="button-sign-out" onClick={cerrarSesion}>
      <p>Cerrar Sesión</p>
    </button>
  </a>
);

const SignOut = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate(); // Obtener la función navigate


  // Cargar el usuario desde el localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('user'); // Elimina el usuario del localStorage
    setUsuario(null); // Actualiza el estado a nulo
  };

  const handleGoToInventory = () => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    navigate(`/items/${userId}`);  // Navegamos al inventario del usuario
  };

  return (
    <div>
      <header className="header-container">
        <nav id="nav-container">


          {/* Mostrar el botón de Inventario solo si hay un usuario y si es vendedor */}
          {usuario && usuario.accountType === 'vendedor' && (
              <button className="button-inventory" id="container-in-header" onClick={handleGoToInventory}>
              
                <p className="inventory">Inventario</p>
              </button>
              
              )}


          {/* Mostrar el botón de Cerrar Sesión solo si hay un usuario */}
          {usuario && (
            <SignOutButton cerrarSesion={cerrarSesion} />
          )}

          {/* No mostrar los botones de Iniciar Sesión y Registrarse si hay un usuario */}
          {!usuario && (
            <>
              <a href="/login" className="a-login" id="container-in-header">
                <button className="button-login">
                  <p>Iniciar Sesión</p>
                </button>
              </a>
              <a href="/register" className="a-sign-up" id="container-in-header">
                <button className="button-sign-up">
                  <p>Registrarse</p>
                </button>
              </a>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default SignOut;
