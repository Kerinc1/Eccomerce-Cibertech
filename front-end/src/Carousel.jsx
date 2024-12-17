import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const CustomCarousel = () => {
  useEffect(() => {
    // Dinámicamente agrega el archivo CSS de Bootstrap
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    bootstrapCSS.id = 'bootstrap-styles'; // Opcional para referencia
    document.head.appendChild(bootstrapCSS);

    // Limpia el CSS después de que el componente se desmonte
    return () => {
      document.getElementById('bootstrap-styles')?.remove();
    };
  }, []);

  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner3.jpg"
          alt="Bienvenido a Cibertech"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner1.gif"
          alt="Cibertech la mejor opción"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner2.gif"
          alt="Grandes descuentos esta temporada"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
