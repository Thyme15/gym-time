import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './ui/Nav-Bar';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    const item = {
      id: product.product_id || id,
      name: product.product_name,
      price: product.product_price,
      size: selectedSize,
      qty: quantity,
      image: product.product_image
    };
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        // Backend returns an array; grab first item
        setProduct(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('th-TH', { minimumFractionDigits: 2 }).format(price);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
        <Navbar title="HERCULES" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#888', fontSize: '16px' }}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
        <Navbar title="HERCULES" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#888', fontSize: '16px' }}>Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Navbar title="HERCULES" />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: '60px',
        padding: '40px 80px',
        alignItems: 'flex-start',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>

        {/* ── Left: Product Image ── */}
        <div style={{
          flexShrink: 0,
          width: '340px',
          backgroundColor: '#cfccc2',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <img
            src={
              product.product_image ||
              `https://placehold.co/340x460/111111/c9a22a?text=${encodeURIComponent(product.product_name)}`
            }
            alt={product.product_name}
            style={{ width: '100%', height: '460px', objectFit: 'contain', display: 'block' }}
          />
        </div>

        {/* ── Right: Product Info ── */}
        <div style={{ flex: 1, paddingTop: '10px' }}>

          {/* Name */}
          <h1 style={{
            fontFamily: 'monospace',
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            margin: '0 0 16px',
            letterSpacing: '0.5px',
          }}>
            {product.product_name}
          </h1>

          {/* Price */}
          <p style={{
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#1a1a1a',
            margin: '0 0 32px',
          }}>
            THB&nbsp;{formatPrice(product.product_price)}
          </p>

          {/* Description (if any) */}
          {product.product_desc && (
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '28px', lineHeight: '1.6' }}>
              {product.product_desc}
            </p>
          )}

          {/* Size */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
              Size:
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '52px',
                    height: '44px',
                    border: selectedSize === size ? '2px solid #c9a22a' : '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: selectedSize === size ? '#fdf6e3' : '#f0efed',
                    color: selectedSize === size ? '#c9a22a' : '#555',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '36px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
              Quantity:
            </p>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{
                width: '140px',
                padding: '10px 14px',
                backgroundColor: '#f0efed',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '15px',
                fontFamily: 'monospace',
                color: '#333',
                cursor: 'pointer',
                appearance: 'auto',
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              maxWidth: '340px',
              padding: '16px',
              backgroundColor: '#c9a22a',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b8911f'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#c9a22a'}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
