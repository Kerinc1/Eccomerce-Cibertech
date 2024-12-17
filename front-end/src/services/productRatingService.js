const BASE_URL = 'https://cibertech.onrender.com/api/rating';

// Obtener el promedio de calificación
export const fetchAverageRating = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/average-rating/${productId}`);
    const data = await response.json();
    return data.averageRating || 0;
  } catch (error) {
    console.error('Error al obtener la calificación promedio:', error);
    return 0;
  }
};

// Enviar calificación del producto
export const submitProductRating = async (productId, userId, rating) => {
  try {
    const response = await fetch(`${BASE_URL}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId: productId, userId, rating }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al añadir la calificación');
    }

    return await response.json(); // Devuelve los datos actualizados (por ejemplo, promedio)
  } catch (error) {
    console.error('Error al enviar la calificación:', error);
    throw error;
  }
};
