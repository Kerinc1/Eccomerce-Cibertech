import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentGateway.css';
import { FaTrashAlt } from 'react-icons/fa'; // Icono de eliminar
import PayPalButton from './paypal';

const PaymentGateway = () => {
  const location = useLocation();
  const [carrito, setCarrito] = useState(location.state?.carrito || []); // Guardamos el carrito localmente
  const totalPrice = carrito.reduce((total, item) => total + item.priceItem * item.cantidad, 0);

  const cambiarCantidad = (id, cambio) => {
    setCarrito((prevCarrito) => {
      const carritoActualizado = prevCarrito.map((item) => {
        if (item._id === id) {
          const maxCantidad = item.quantityItem; // Cantidad máxima disponible
          let nuevaCantidad = item.cantidad + cambio;

          // Verificamos que no sobrepasemos el límite
          if (nuevaCantidad < 1) nuevaCantidad = 1; // No permitir menos de 1
          if (nuevaCantidad > maxCantidad) nuevaCantidad = maxCantidad; // No permitir más que el stock disponible

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

  return (
    <div className="payment-gateway">
      <h1>Pasarela de Pagos</h1>

      <div className="content">
        {/* Columna Izquierda: Resumen de compra y productos en el carrito */}
        <div className="left-column">
          <div className="receipt">
            <h2>Resumen de Compra</h2>
            <p><strong>Total: ${totalPrice.toLocaleString()}</strong></p>
          </div>

          {/* Productos en el carrito */}
          <div className="products">
            <h2>Productos en tu carrito</h2>
            {carrito.map((item) => (
              <div key={item._id} className="product">
                <h3>{item.nameItem}</h3>
                <p>Precio: ${item.priceItem.toLocaleString()}</p>
                <div className="quantity-container">
                  <button
                    className="btn-quantity"
                    onClick={() => cambiarCantidad(item._id, -1)}
                  >
                    -
                  </button>
                  <span className="quantity-number">{item.cantidad}</span>
                  <button
                    className="btn-quantity"
                    onClick={() => cambiarCantidad(item._id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn-remove"
                    onClick={() => eliminarDelCarrito(item._id)}
                  >
                    <FaTrashAlt /> {/* Ícono de eliminar */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Información de envío y método de pago */}
        <div className="right-column">
          {/* Información de Envío */}
          <div className="user-info">
            <h2>Información de Envío</h2>
            <form>
              <div className="form-group">
                <div>
                  <label htmlFor="first-name">Nombre</label>
                  <input type="text" id="first-name" name="firstName" placeholder="Nombre" required />
                </div>
                <div>
                  <label htmlFor="last-name">Apellido</label>
                  <input type="text" id="last-name" name="lastName" placeholder="Apellido" required />
                </div>
                <div>
                  <label htmlFor="email">Correo Electrónico</label>
                  <input type="email" id="email" name="email" placeholder="Correo Electrónico" required />
                </div>
                <div>
                  <label htmlFor="city">Ciudad</label>
                  <input type="text" id="city" name="city" placeholder="Ciudad" required />
                </div>
                <div>
                  <label htmlFor="country">País</label>
                  <input type="text" id="country" name="country" placeholder="País" required />
                </div>
                <div>
                  <label htmlFor="address">Dirección</label>
                  <input type="text" id="address" name="address" placeholder="Dirección" required />
                </div>
                <div>
                  <label htmlFor="cellphone">Telefono</label>
                  <input type="number" id="celphone" name="cellphone" placeholder="Telefono" required  />
                </div>
              </div>
            </form>
          </div>

          {/* Método de pago */}
          <div className="payment-method">
            <h2>Método de Pago</h2>
            <PayPalButton price={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
