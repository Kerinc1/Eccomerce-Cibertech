import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Comments.module.css';

const Comments = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario del localStorage
  const [editingComment, setEditingComment] = useState(null); // Almacena el comentario que se está editando
  const isAuthenticated = Boolean(user); // Verifica si el usuario está autenticado

  // Lista de palabras prohibidas
  const prohibitedWords = ["mierda", "putos", "ladrones"]; // Añade todas las palabras inapropiadas aquí

  // Función para verificar palabras prohibidas
  const containsProhibitedWords = (text) => {
    return prohibitedWords.some(word => text.toLowerCase().includes(word.toLowerCase()));
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://cibertech.onrender.com/api/comments/${productId}`);
        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          setComments([]);
          console.error('La respuesta de comentarios no es un array:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener los comentarios', error);
        setComments([]);
      }
    };
    fetchComments();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Por favor, inicia sesión para comentar.");
      return;
    }
    if (containsProhibitedWords(comment)) {
      alert("Tu comentario contiene lenguaje inapropiado. Por favor, elimínalo antes de enviar.");
      return;
    }
    try {
      const newComment = { productId, name: user.name, comment };
      const response = await axios.post('https://cibertech.onrender.com/api/comments', newComment);
      setComments([...comments, response.data]);
      setComment('');
    } catch (error) {
      console.error('Error al publicar el comentario', error);
    }
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
    setComment(comment.comment);
  };

  const handleCancel = () => {
    setEditingComment(null);
    setComment('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (containsProhibitedWords(comment)) {
      alert("Tu comentario contiene lenguaje inapropiado. Por favor, elimínalo antes de enviar.");
      return;
    }
    try {
      if (!editingComment?._id) {
        console.error('ID del comentario no encontrado');
        return;
      }
      const updatedComment = { comment };
      const response = await axios.put(`https://cibertech.onrender.com/api/comments/${editingComment._id}`, updatedComment);
      const updatedComments = comments.map(c => c._id === editingComment._id ? response.data : c);
      setComments(updatedComments);
      setEditingComment(null);
      setComment('');
    } catch (error) {
      console.error('Error al actualizar el comentario', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`https://cibertech.onrender.com/api/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error al eliminar el comentario', error);
    }
  };

  return (
    <div className={styles.commentsSection}>
      <h2>Comentarios</h2>
      {isAuthenticated ? (
        <form onSubmit={editingComment ? handleUpdate : handleSubmit} className={styles.commentForm}>
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Tu comentario" 
            required 
            className={styles.textareaField}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {editingComment ? 'Actualizar' : 'Enviar'}
            </button>
            {editingComment && (
              <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      ) : (
        <p>Por favor, inicia sesión para dejar un comentario.</p>
      )}
      <div className={styles.commentsList}>
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c._id} className={styles.comment}>
              <strong>{c.name}</strong>
              <p>{c.comment}</p>
              {user && user.name === c.name && (
                <div className={styles.commentActions}>
                  <button onClick={() => handleEdit(c)} className={styles.editButton}>Editar</button>
                  <button onClick={() => handleDelete(c._id)} className={styles.deleteButton}>Eliminar</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No hay comentarios todavía.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
