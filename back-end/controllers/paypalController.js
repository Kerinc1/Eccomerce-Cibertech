const express = require('express');
const router = express.Router();

// Aquí defines tus rutas
router.post('/capture-order/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    // Lógica para capturar la orden
    console.log(`Capturando la orden con ID: ${orderId}`);
    res.status(200).send({ success: true, message: 'Orden capturada exitosamente' });
  } catch (error) {
    console.error('Error al capturar la orden:', error);
    res.status(500).send({ success: false, message: 'Error al capturar la orden' });
  }
});

module.exports = router; // Exporta el router
