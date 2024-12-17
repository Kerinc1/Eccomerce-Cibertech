import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Carrito = ({ carrito, setCarrito }) => {
  const [mostrar, setMostrar] = useState(false);
  const navigate = useNavigate();

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.priceItem * item.cantidad, 0);
  };

  const cambiarCantidad = (id, cambio) => {
    setCarrito((prevCarrito) => {
      const carritoActualizado = prevCarrito.map((item) => {
        if (item._id === id) {
          const maxCantidad = item.quantityItem; // Cantidad máxima disponible
          let nuevaCantidad = item.cantidad + cambio;

          // Verificamos que no sobrepasemos el límite
          if (nuevaCantidad < 1) nuevaCantidad = 1;
          if (nuevaCantidad > maxCantidad) nuevaCantidad = maxCantidad;

          return { ...item, cantidad: nuevaCantidad };
        }
        return item;
      });

      return carritoActualizado;
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item._id !== id));
  };

  const irAPasarelaDePagos = () => {
    navigate('/payment', { state: { carrito } });
  };

  return (
    <section className="bar">
      <button id="carrito" onClick={() => setMostrar(!mostrar)}>
        <img src="/images/cart-black2.png" id="carrito" alt="Carrito de Compras" />
      </button>

      {mostrar && (
        <div className="cart-container">
          <h1>Carrito de Compras</h1>
          <div id="cart-items">
            {carrito.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="product-info">
                  <h3>{item.nameItem}</h3>
                  <p>${item.priceItem.toLocaleString()}</p>
                </div>
                <div className="quantity">
                  <button
                    className="btn-quantity-1"
                    onClick={() => cambiarCantidad(item._id, -1)}
                  >
                    -
                  </button>
                  <span className="quantity-number">{item.cantidad}</span>
                  <button
                    className="btn-quantity-2"
                    onClick={() => cambiarCantidad(item._id, 1)}
                  >
                    +
                  </button>
                </div>
                <button className="btn-remove" onClick={() => eliminarDelCarrito(item._id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <p className="totalProducto">
              Total: $<span id="cart-total">{calcularTotal().toLocaleString()}</span>
            </p>
            <button className="btn-purchase" onClick={irAPasarelaDePagos}>
              Comprar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Carrito;
