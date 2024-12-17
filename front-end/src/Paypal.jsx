import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ price }) => {
  const paypalRef = useRef();

  useEffect(() => {
    // Asegurarse de que PayPal esté disponible
    if (window.paypal && paypalRef.current) {
      // Limpiar el contenedor antes de renderizar un nuevo botón
      paypalRef.current.innerHTML = '';

      window.paypal.Buttons({
        createOrder: async () => {
          const response = await fetch('https://cibertech.onrender.com/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price }),
          });

          const data = await response.json();
          return data.id; // Devuelve el ID de la orden
        },
        onApprove: async (data) => {
          const response = await fetch(`https://cibertech.onrender.com/capture-order/${data.orderID}`, {
            method: 'POST',
          });

          const details = await response.json();
          alert('Transaction completed by ' + details.payer.name.given_name);
        },
      }).render(paypalRef.current); // Renderiza el botón en el contenedor
    }
  }, [price]);

  return <div ref={paypalRef} id="paypal-button-container"></div>;
};

export default PayPalButton;
