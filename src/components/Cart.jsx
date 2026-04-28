import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ui/Nav-Bar';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  const isEmpty = cartItems.length === 0;

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#c8c0b0', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Navbar title="HERCULES" />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}>
        {isEmpty ? (
          /* ── Empty bag state ── */
          <div style={{ textAlign: 'center' }}>

            {/* Shopping bag SVG illustration */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block', margin: '0 auto 24px' }}
            >
              {/* Bag body */}
              <rect x="14" y="38" width="92" height="72" rx="8" stroke="#2a2a2a" strokeWidth="3" fill="none" />
              {/* Bag handle left */}
              <path d="M40 38 C40 20 80 20 80 38" stroke="#2a2a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Smile */}
              <path d="M44 84 Q60 98 76 84" stroke="#2a2a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>

            <h2 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              margin: '0 0 10px',
              fontFamily: 'monospace',
            }}>
              Your bag is Empty
            </h2>

            <p style={{
              fontSize: '14px',
              color: '#555',
              margin: '0 0 28px',
              fontFamily: 'monospace',
            }}>
              Add anything to your bag!!
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/men')}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#c9a22a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                }}
              >
                Shop Mens
              </button>
              <button
                onClick={() => navigate('/women')}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#c9a22a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                }}
              >
                Shop Womens
              </button>
            </div>
          </div>
        ) : (
          /* ── Items in cart ── */
          <div style={{ width: '100%', maxWidth: '700px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1a1a1a' }}>
              Your Bag
            </h2>
            {cartItems.map((item, i) => (
              <div key={i} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  )}
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#1a1a1a' }}>{item.name}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#888' }}>
                      Size: {item.size} | Qty: {item.qty}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#c9a22a', fontSize: '16px' }}>
                    ฿{(item.price * item.qty).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(i)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      fontSize: '20px',
                      lineHeight: 1,
                      borderRadius: '4px',
                      transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#d9534f'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#999'}
                    title="Remove item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            <button style={{
              marginTop: '20px',
              width: '100%',
              padding: '14px',
              backgroundColor: '#c9a22a',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
