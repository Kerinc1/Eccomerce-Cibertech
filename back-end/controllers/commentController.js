const Comment = require('../models/comments');

// Obtener comentarios por ID de producto
const getComments = async (req, res) => {
  const { productId } = req.params;
  try {
    const comments = await Comment.find({ productId });
    res.json(comments);
  } catch (err) {
    res.status(500).send('Error al obtener los comentarios');
  }
};

// Crear un nuevo comentario
const createComment = async (req, res) => {
  const { productId, name, comment } = req.body;
  try {
    const newComment = new Comment({ productId, name, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).send('Error al publicar el comentario');
  }
};

// Actualizar un comentario
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { comment }, { new: true });
    res.json(updatedComment);
  } catch (err) {
    res.status(500).send('Error al actualizar el comentario');
  }
};

// Eliminar un comentario
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.send('Comentario eliminado');
  } catch (err) {
    res.status(500).send('Error al eliminar el comentario');
  }
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment
};
