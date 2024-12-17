import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProductList from './ProductList';
import ComponentGamerStore from './gaming-store';
import ProductDetails from './product';
import PaymentGateway from './PaymentGateway';


const App = () => {
    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario

    // Efecto para cargar el usuario desde localStorage al montar el componente
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser); // Establece el usuario si está en localStorage
        }
    }, []);

    const handleRegister = (newUser) => {
        console.log('Usuario registrado:', newUser);
        setUser(newUser); // Actualiza el estado con el nuevo usuario
    };

    const handleLogin = (loggedInUser) => {
        console.log('Usuario inició sesión:', loggedInUser);
        if (loggedInUser && loggedInUser.email) {
            setUser(loggedInUser); // Actualiza el estado con el usuario que inicia sesión
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register onRegister={handleRegister} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/items" element={user ? <ProductList user={user} /> : <Navigate to="/login" replace />}/>
                <Route path="/payment" element={<PaymentGateway />} />
                <Route path="/products/:id" element={<ProductDetails />} /> {/* Ruta corregida */}

                {/* Si el usuario no está autenticado, lo redirige a login */}
                <Route path="/" element={<ComponentGamerStore />} />
            </Routes>
        </Router>
    );
};

export default App;
