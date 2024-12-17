const express = require('express');
const { createComment, getComments, updateComment, deleteComment } = require('../controllers/commentController');
const router = express.Router();

// Ruta para obtener comentarios
router.get('/:productId', getComments);

// Ruta para crear un nuevo comentario
router.post('/', createComment);

// Ruta para actualizar un comentario
router.put('/:id', updateComment);

// Ruta para eliminar un comentario
router.delete('/:id', deleteComment);

module.exports = router;
