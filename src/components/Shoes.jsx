import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ui/Nav-Bar';
import ProductCard from './ui/productImage';

export default function Shoes() {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const newArrivedProducts = products.filter(p => 
    ['PRD007', 'PRD008', 'PRD009'].includes(p.product_ID) 
  );
  
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

      {/* Hero Section - Single Poster */}
      <div style={{ width: '100%', height: '420px' }}>
        <img 
          src="/images/ShoesPoster.png" /* 👈 UPDATED IMAGE PATH */
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center' }} 
          alt="Shoes Collection Poster" 
        />
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
                  style={{ width: '100%', height: '220px', objectFit: 'contain' }}
                />
                {/* 👈 Fixed bug here: changed text color to #1a1a1a so it shows up on the light background! */}
                <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: '600', fontSize: '14px', color: '#1a1a1a' }}>
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