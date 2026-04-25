import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ui/Nav-Bar';

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlistItems(JSON.parse(saved));
    }
  }, []);

  const handleRemoveItem = (idToRemove) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== idToRemove);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const isEmpty = wishlistItems.length === 0;

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
          <div style={{ textAlign: 'center' }}>
            
            {/* Heart SVG illustration */}
            <svg 
              width="140" 
              height="140" 
              viewBox="0 0 24 24" 
              fill="black" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginBottom: '24px' }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#1a1a1a', 
              margin: '0 0 12px',
              fontFamily: 'monospace',
            }}>
              Add item to your wishlist!!
            </h2>
            
            <p style={{ 
              fontSize: '15px', 
              color: '#333', 
              margin: '0 auto 32px',
              maxWidth: '380px',
              lineHeight: '1.5',
              fontFamily: 'monospace',
            }}>
              Wants to save your favourite products? Add it to your wish-list so you can come back and see!!
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#d6aa54',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Create Account
              </button>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  padding: '10px 32px',
                  backgroundColor: '#d6aa54',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '700px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1a1a1a' }}>
              Your Wishlist
            </h2>
            {wishlistItems.map((item) => (
              <div key={item.id} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, cursor: 'pointer' }} 
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  )}
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#1a1a1a' }}>{item.title}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#c9a22a', fontSize: '16px' }}>
                    ฿{new Intl.NumberFormat('th-TH', { style: 'decimal', minimumFractionDigits: 0 }).format(item.price)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
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
                    title="Remove from wishlist"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
