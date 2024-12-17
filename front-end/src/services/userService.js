// services/userService.js
export const getUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:5008/users/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Error obteniendo la información del usuario.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud de información del usuario:', error);
        throw error;
    }
};
