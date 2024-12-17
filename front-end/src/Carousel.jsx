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
          src="/multimedia/Purple and White Modern E-sport Tournament Instagram Post.jpg"
          alt="Sunset Over the City"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/multimedia/Purple and Blue Futuristic Gaming Youtube Banner (1).gif"
          alt="Canyon at Night"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/multimedia/Banner de YouTube Gamer Neon Violeta.gif"
          alt="Cliff Above a Stormy Sea"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
