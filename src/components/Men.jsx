import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ui/Nav-Bar';
import ProductCard from './ui/productImage';

export default function Men() {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [products, setProducts] = useState([]);


  // --- NEW STEP 1 CODE STARTS HERE ---
  const heroImages = [
    'http://localhost:5173/images/m1.png',
    'http://localhost:5173/images/m2.png',
    'http://localhost:5173/images/m3.png',
    'http://localhost:5173/images/m4.png',
    'http://localhost:5173/images/m5.png'
  ];

  const displayImages = [...heroImages, ...heroImages]; 

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // 1. The main timer that slides the images every 4 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIsTransitioning(true); // Make sure the sliding animation is ON
      setCurrentHeroIndex((prevIndex) => prevIndex + 1);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, []);

  // 2. The "Seamless Snap" effect
  useEffect(() => {
    // If we have slid all the way through the first set of 5 images...
    if (currentHeroIndex === heroImages.length) {
      // Wait exactly 1 second (the time it takes for the CSS slide animation to finish)
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false); // Turn OFF the animation temporarily
        setCurrentHeroIndex(0); // Silently snap back to the very first image
      }, 1000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentHeroIndex, heroImages.length]);
  // --- NEW STEP 1 CODE ENDS HERE ---

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  // First 3 products → new arrivals carousel
  const newArrivedProducts = products.slice(0, 3);
  // Rest → seasonal section (or all if fewer than 4)
  const seasonalProducts = products.length > 3 ? products.slice(3) : products;

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + Math.max(newArrivedProducts.length, 1)) % Math.max(newArrivedProducts.length, 1));
  };

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.max(newArrivedProducts.length, 1));
  };

  const productImage = (p) =>
    p.product_image ||
    `https://placehold.co/300x400/111111/c9a22a?text=${encodeURIComponent(p.product_name)}`;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Navbar title="HERCULES" />

      {/* Hero Section - 5 Block Infinite Conveyor Belt */}
      <div style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          transform: `translateX(-${currentHeroIndex * 20}%)`,
          // Turn off the transition during the hidden snap back to 0
          transition: isTransitioning ? 'transform 1s ease-in-out' : 'none'
        }}>
          {displayImages.map((imgSrc, index) => (
            <img 
              key={index}
              src={imgSrc} 
              alt={`Hercules Men Collection ${index}`} 
              style={{ 
                // flex: '0 0 20%' forces every single image to be exactly 1/5th of the screen width
                flex: '0 0 20%', 
                height: '100%',
                objectFit: 'cover'
              }} 
            />
          ))}
        </div>
      </div>

      {/* NEW ARRIVED Section */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '60px 40px' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            marginBottom: '50px',
            textTransform: 'uppercase',
            color: '#1a1a1a',
          }}
        >
          NEW ARRIVED
        </h2>

        {/* Carousel */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          <button
            onClick={handlePrevCarousel}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
            }}
          >
            <ChevronLeft size={32} color="#1a1a1a" strokeWidth={1.5} />
          </button>

          {/* Product Display */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', overflow: 'hidden' }}>
            {newArrivedProducts.map((product, index) => (
              <div
                key={product.product_ID || index}
                onClick={() => navigate(`/products/${product.product_ID}`)}
                style={{
                  opacity: index === carouselIndex ? 1 : 0.5,
                  transform: `scale(${index === carouselIndex ? 1 : 0.9})`,
                  transition: 'all 0.3s ease',
                  minWidth: '200px',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={productImage(product)}
                  alt={product.product_name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: '600', fontSize: '14px' }}>
                  {product.product_name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleNextCarousel}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
            }}
          >
            <ChevronRight size={32} color="#1a1a1a" strokeWidth={1.5} />
          </button>
        </div>

        {/* Carousel Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '30px',
          }}
        >
          {newArrivedProducts.map((_, index) => (
            <div
              key={index}
              onClick={() => setCarouselIndex(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: index === carouselIndex ? '#1a1a1a' : '#ccc',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* SEASONAL PRODUCTS Section */}
      <div
        style={{
          backgroundColor: '#7a7a46',
          padding: '60px 40px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            marginBottom: '50px',
            textTransform: 'uppercase',
            color: 'white',
          }}
        >
          SEASONAL PRODUCTS
        </h2>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            justifyContent: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {seasonalProducts.map((product, index) => (
            <div key={product.product_ID || index} style={{ display: 'flex', justifyContent: 'center' }}>
              <ProductCard
                id={product.product_ID}
                image={productImage(product)}
                title={product.product_name}
                originalPrice={product.product_price}
                rating={4.8}
                ratingCount={128}
                badge="LIMITED EDITION"
                onClick={() => navigate(`/products/${product.product_ID}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  }