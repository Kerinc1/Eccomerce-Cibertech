import React, { useState } from 'react';
import { registerUser } from './services/itemServices';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '', accountType: 'comprador' });
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Reset error on form submit
        try {
            const response = await registerUser(form);
    
            if (response.success) {
                onRegister(response.user); // Pasar los datos del usuario al componente padre
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                navigate('/login');
            } else {
                setError(response.message || 'No se recibió una respuesta exitosa. Inténtalo nuevamente.');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setError('Hubo un problema con el registro. Inténtalo de nuevo.');
        }
    };
    

    return (
        <div>
            <header className="header-container" >
        
                <nav  id="nav-container">
            
                    <a href='/'>
                        <img src="../public/images/CIBERTECH01.png"  alt="Cibertech"  className="image-logo" />
                    </a>

                    <a href="/login" className="a-login" id="container-in-header">
                        <button className="button-login">
                            <p>Iniciar Sesion</p>
                        </button>
                    </a>

                </nav>
            </header>

            <div className='div-container-login-register'>
                <img src='https://e1.pxfuel.com/desktop-wallpaper/572/71/desktop-wallpaper-yellow-purple-purple-and-yellow.jpg' className='background-login-register'/>
                <form onSubmit={handleSubmit} className='form-login-register'>
                    <h1 className='title-form'>REGISTRO</h1>
                
                    <h3 className='subtitle-form'>INGRESA UN NOMBRE DE USUARIO</h3>
                    <input
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <h3 className='subtitle-form'>INGRESA UN CORREO ELECTRONICO</h3>
                    <input
                        name="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        type='email'
                        required
                    />
                    <h3 className='subtitle-form'>CREA UNA CONTRASEÑA</h3>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    {/* Selector para tipo de cuenta */}
                    <h3 className='subtitle-form'>INGRESA TU TIPO DE CUENTA</h3>
                    <select
                        name="accountType"
                        value={form.accountType}
                        onChange={handleChange}
                    > 
                        <option value="comprador">Comprador</option>
                        <option value="vendedor">Vendedor</option>
                    </select>

                    <button type="submit" className='form-button'>Registrarse</button>
            
                </form>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensajes de error */}
        </div>
    );
};

export default Register;
