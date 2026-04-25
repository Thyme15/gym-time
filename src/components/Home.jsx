import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from './ui/Nav-Bar';
import ProductCard from './ui/productImage';

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Sample products for "NEW ARRIVED" carousel
  const newArrivedProducts = [
    {
      image: 'https://via.placeholder.com/300x300?text=Product+1',
      title: 'Hercules Gold Shoes',
      originalPrice: 2500,
    },
    {
      image: 'https://via.placeholder.com/300x300?text=Product+2',
      title: 'Hercules Silver Shoes',
      originalPrice: 2800,
    },
    {
      image: 'https://via.placeholder.com/300x300?text=Product+3',
      title: 'Hercules Gold Shoes 2',
      originalPrice: 3000,
    },
  ];

  // Sample products for "SEASONAL PRODUCTS" grid
  const seasonalProducts = [
    {
      image: 'https://via.placeholder.com/300x400?text=Compression+Tee',
      title: 'Hercules Compression Tee',
      category: 'UNISEX',
      sizes: 'XS–3XL',
      originalPrice: 2500,
      rating: 4.8,
      ratingCount: 128,
      badge: 'LIMITED EDITION',
      colors: [
        { label: 'White Gold', hex: '#f5f5f0' },
        { label: 'Obsidian', hex: '#1a1a1a' },
      ],
    },
    {
      image: 'https://via.placeholder.com/300x400?text=Sport+Bag',
      title: 'Hercules Golden Sport Bag',
      category: 'UNISEX',
      sizes: 'ONE SIZE',
      originalPrice: 6400,
      rating: 4.6,
      ratingCount: 95,
      badge: 'LIMITED EDITION',
      colors: [
        { label: 'Gold', hex: '#c9a84c' },
        { label: 'Black', hex: '#1a1a1a' },
      ],
    },
    {
      image: 'https://via.placeholder.com/300x400?text=Sport+Bottle',
      title: 'Hercules Golden Sport Bottle 24oz',
      category: 'UNISEX',
      sizes: 'ONE SIZE',
      originalPrice: 1500,
      rating: 4.9,
      ratingCount: 156,
      badge: 'LIMITED EDITION',
      colors: [
        { label: 'Gold', hex: '#c9a84c' },
        { label: 'Silver', hex: '#d3d3d3' },
      ],
    },
  ];

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + newArrivedProducts.length) % newArrivedProducts.length);
  };

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % newArrivedProducts.length);
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Navbar */}
      <Navbar title="HERCULES" />

      {/* Hero Section */}
      <div
        style={{
          backgroundImage: 'url(https://via.placeholder.com/1200x400?text=Hercules+Hero)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        />
        <h1
          style={{
            color: 'white',
            fontSize: '72px',
            fontWeight: 'bold',
            letterSpacing: '4px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            textTransform: 'uppercase',
          }}
        >
          Hercules
        </h1>
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
                key={index}
                style={{
                  opacity: index === carouselIndex ? 1 : 0.5,
                  transform: `scale(${index === carouselIndex ? 1 : 0.9})`,
                  transition: 'all 0.3s ease',
                  minWidth: '200px',
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <p
                  style={{
                    textAlign: 'center',
                    marginTop: '10px',
                    fontWeight: '600',
                    fontSize: '14px',
                  }}
                >
                  {product.title}
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
            <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
