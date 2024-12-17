const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Modelo de usuario

const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, accountType } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Este correo ya está registrado.' });
        }

        // Hashear la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            accountType 
        });

        await newUser.save(); // Guarda el nuevo usuario en la base de datos

        // Responder con éxito
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error registrando al usuario.', error });
    }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) { // Comparar usando bcrypt
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }

        // Aquí podrías generar y devolver un token, si fuera necesario

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error iniciando sesión.', error });
    }
});



module.exports = router;
