const express = require('express');
const router = express.Router();
const Item = require('../models/products'); // Asegúrate de que la ruta del modelo sea correcta
const User = require('../models/User');     // Asegúrate de que la ruta del modelo sea correcta

// Ruta para agregar una calificación a un producto
router.post('/rate', async (req, res) => {
    try {
        const { itemId, userId, rating } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el producto existe
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar que la calificación esté entre 1 y 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'La calificación debe ser entre 1 y 5' });
        }

        // Verificar si el usuario ya calificó este producto
        const existingRating = item.ratings.find(r => r.userId.toString() === userId);
        if (existingRating) {
            return res.status(400).json({ message: 'Ya has calificado este producto' });
        }

        // Agregar la calificación al producto
        item.ratings.push({ userId, rating });

        // Guardar los cambios en el producto (el promedio se recalcula automáticamente en el middleware)
        await item.save();

        res.status(200).json({
            message: 'Calificación agregada correctamente',
            averageRating: item.averageRating // Este ya está actualizado gracias al middleware
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar la calificación' });
    }
});

// Ruta para obtener el promedio de calificación de un producto
router.get('/average-rating/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;

        // Obtener el producto
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({
            averageRating: item.averageRating
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el promedio de calificación' });
    }
});

module.exports = router;
