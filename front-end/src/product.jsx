import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SignOut from './sign';
import Comments from './Comments';
import { fetchAverageRating, submitProductRating } from './services/productRatingService';

const StarRating = ({ currentRating, onRatingSubmit }) => {
  const [hover, setHover] = useState(0); // Estado para el hover
  const [rating, setRating] = useState(currentRating); // Estado para la calificación seleccionada

  const handleStarClick = (star) => {
    setRating(star); // Establece la calificación seleccionada
    onRatingSubmit(star); // Llama a la función para enviar la calificación
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
      {/* Mostrar el promedio de la calificación del producto */}
      <span style={{ fontSize: '18px', color: '#333' }}>
        Promedio: {(typeof currentRating === 'number' && !isNaN(currentRating) ? currentRating : 0).toFixed(1)} / 5
      </span>

      {/* Estrellas de calificación */}
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)} // Asigna la calificación seleccionada al hacer clic
          onMouseEnter={() => setHover(star)} // Hover sobre la estrella
          onMouseLeave={() => setHover(0)} // Restaurar al salir del hover
          style={{
            cursor: 'pointer',
            fontSize: '30px',
            color: star <= (hover || rating) ? 'orange' : '#9d2bca', // Naranja si está seleccionada o en hover
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [product, setProduct] = useState(state || null);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!product) {
          const response = await fetch(`/api/products/${id}`);
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };

    const loadAverageRating = async () => {
      const rating = await fetchAverageRating(id);
      setAverageRating(rating);
    };

    fetchProduct();
    loadAverageRating();
  }, [id, product]);

  const handleRatingSubmit = async (rating) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      alert('Debes iniciar sesión para calificar el producto');
      return;
    }

    try {
      const result = await submitProductRating(id, userData._id, rating);
      alert('Calificación añadida con éxito');
      setAverageRating(result.averageRating);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleBuyClick = () => {
    navigate('/payment', { state: { carrito: [{ ...product, cantidad: 1 }] } });
  };

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div>
      <header className="header-container">
        <nav id="nav-container">
          <a href='/'>
            <img src="../public/images/CIBERTECH.png" alt="Cibertech" className="image-logo" />
          </a>
          <div className='nav-middle'>
            <div className="div-products-container" id="container-in-header">
              <a href="/" className="a-products">Productos</a>
            </div>
            <div className="div-about-us-container" id="container-in-header">
              <a href="/" className="a-about-us">Acerca de nosotros</a>
            </div>
          </div>
          <SignOut />
        </nav>
      </header>

      <main className="product-details">
        <div className='container-img-item'>
          <img src={product.image} alt={product.nameItem} className='img-product-item' />
        </div>
        <div className='container-product'>
          <h1 className='title-product'>{product.nameItem}</h1>
          <p className='description-product'>{product.descriptionItem}</p>
          <div className='divider'></div>
          <p className='price-product'>Precio: {new Intl.NumberFormat('es-CO').format(product.priceItem)}</p>
          <p className='quantity-product'>Cantidad disponible: {product.quantityItem}</p>

          {/* Estrellas */}
          <div className="rating-section">
            <h3>Calificación:</h3>
            <StarRating currentRating={averageRating} onRatingSubmit={handleRatingSubmit} />
          </div>

          {/* Botón Comprar */}
          <button className='buy-product' onClick={handleBuyClick}>Comprar</button>
        </div>
      </main>
      <Comments productId={id} />
    </div>
  );
};

export default ProductDetails;
