import './index.css';
import React, { useState, useEffect } from 'react';
import { getItemsPageMain } from './services/itemServices';
import Carrito from './shoppingCart';
import { efectoAgregarProducto } from './services/efectoCarrito';
import SignOut from './sign';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';


const MyComponent = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Inicializamos useNavigate


  const fetchProducts = async () => {
    try {
      const data = await getItemsPageMain();
      setItems(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (item) => {
    navigate(`/products/${item._id}`, { state: item }); // Usamos navigate con el state
  };

  const handleAddToCartClick = (e, item) => {
    e.stopPropagation(); // Evita que el clic en el botón propague el evento
    addToCart(item);
    efectoAgregarProducto();
  };

  return (
    <div>
      <ul className="ul-inventory">
        {items.map((item) => (
          <li key={item._id} className="item"  id="item-store"onClick={() => {handleProductClick(item);}} >
            <div className="container-img" id="container-img-store">
              {item.image && <img src={item.image} alt={item.nameItem}  className="img-product-store" />}
            </div>  
            <div className="description-item">
              <h3 className="name-item">{item.nameItem}</h3>
              <p className="price-item">Precio: ${item.priceItem.toLocaleString('es-ES')}</p>
              <p className="quantity-item">Cantidad disponible: {item.quantityItem}</p>
              <button className="button-add-cart" onClick={(e) => {handleAddToCartClick(e, item); }}>
                Añadir al Carrito
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ComponentGamerStore() {
  const [carrito, setCarrito] = useState([]);

  // Función para añadir productos al carrito
  const addToCart = (item) => {
    setCarrito((prevCarrito) => {
      const itemExistente = prevCarrito.find((producto) => producto._id === item._id);
      if (itemExistente) {
        // Si el producto ya existe, aumentamos la cantidad
        return prevCarrito.map((producto) =>
          producto._id === item._id
            ? { ...producto, cantidad: producto.cantidad + 1 }
            : producto
        );
      } else {
        // Si el producto no existe, lo añadimos al carrito
        return [...prevCarrito, { ...item, cantidad: 1 }];
      }
    });
  };

  return (
    <div>
      <header className="header-container">
        <nav id="nav-container">
          <a href='/'>
            <img src="../public/images/CIBERTECH01.png" alt="Cibertech" className="image-logo" />
          </a>
          <div className='nav-middle'>
            <div className="div-products-container" id="container-in-header">
              <a href="#products" className="a-products">Productos</a>
            </div>
            <div className="div-about-us-container" id="container-in-header">
              <a href="#about-us" className="a-about-us">Acerca de nosotros</a>
            </div>
          </div>
          <SignOut/>
        </nav>
      </header>
      <main className="flex-grow">
        <section>
          <Carousel/>
        </section>
        <Carrito carrito={carrito} setCarrito={setCarrito} />
        <section className="products" id="products">
          <h1 className='title-inventory' id="title-main-products">PRODUCTOS</h1>
          <MyComponent addToCart={addToCart} />
        </section>

        <section className="about-us" id="about-us">
          <div className="left-side">
            <img className="img-about-us" src="https://img.freepik.com/premium-photo/man-administrator-data-storage-information-technology-center-with-servers-generative-ai_118086-10656.jpg" alt="Floristeria1" />
            <img className="img-about-us" src="https://media.gq.com.mx/photos/5cbf8c609277d8857be23c04/16:9/w_1920,c_limit/GettyImages-956550532.jpg" alt="Floristeria2" />
            <img className="img-about-us" src="https://img.freepik.com/fotos-premium/escritorio-computadora-computadora-vista-futurista_833658-17.jpg" alt="floristeria3" />
            <img className="img-about-us" src="https://img.freepik.com/premium-photo/double-explosure-medical-technology-concept-working-remote-medicine-electronic-medical_662214-320316.jpg" alt="Floristeria4" />
            <img className="img-about-us" src="https://bysafeonline.com/wp-content/uploads/2023/01/digtial-business-2022-12-15-22-57-50-utc-1.jpg" alt="Floristeria5" />
          </div>
          <div className="right-side">
            <h1 className="title-about-us"> ¿QUIENES SOMOS?</h1>
            <p className="content-right">Cibertech es tu tienda en línea de tecnología de vanguardia. Ofrecemos computadoras, accesorios y equipos de gaming seleccionados por su calidad y rendimiento. Con productos innovadores y soluciones personalizadas, mejoramos tu experiencia tecnológica para trabajo y entretenimiento. ¡Visítanos y descubre lo último en tecnología!
            </p>
          </div>
        </section>


      </main>
      <footer className="footer">
        <div className="container">
          <div className="section">
            <h3 className="title">Cibertech</h3>
            <p className="description">
              Innovación y tecnología en un solo lugar. Encuentra los mejores
              equipos y accesorios para tus necesidades tecnológicas.
            </p>
          </div>
          <div className="section">
            <h4 className="title">Enlaces Útiles</h4>
            <ul className="links">
              <li><a href="#nav-container" className="link">Inicio</a></li>
              <li><a href="#products" className="link">Productos</a></li>
              <li><a href="#about-us" className="link">Sobre Nosotros</a></li>
            </ul>
          </div>
          <div className="section">
            <h4 className="title">Contacto</h4>
            <p className="description">Email: contacto@cibertech.com</p>
            <p className="description">Teléfono: +57 123 456 7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Cibertech. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
