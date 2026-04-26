import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#c4bdb0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
    }}>
      {/* Card wrapper — extra top padding so the badge has room */}
      <div style={{ position: 'relative', paddingTop: '28px' }}>

        {/* HERCULES badge — sits above the card */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#c9a22a',
          color: '#1a1a1a',
          fontWeight: 'bold',
          fontSize: '18px',
          letterSpacing: '2px',
          padding: '8px 28px',
          borderRadius: '8px',
          zIndex: 1,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
        }} onClick={() => navigate('/')}>
          HERCULES
        </div>

        {/* White card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '60px 44px 40px',
          width: '380px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          textAlign: 'center',
        }}>

          <h2 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            Sign in
          </h2>
          <p style={{ margin: '0 0 28px', fontSize: '14px', color: '#888' }}>
            Sign in your account via email
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#e8d9bc',
              borderRadius: '10px',
              padding: '14px 18px',
              marginBottom: '16px',
            }}>
              <Mail size={20} color="#9a8a6a" strokeWidth={1.5} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#555',
                  width: '100%',
                }}
              />
            </div>

            {/* Password input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#e8d9bc',
              borderRadius: '10px',
              padding: '14px 18px',
              marginBottom: error ? '10px' : '20px',
            }}>
              <Lock size={20} color="#9a8a6a" strokeWidth={1.5} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#555',
                  width: '100%',
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p style={{ color: '#d9534f', fontSize: '14px', marginBottom: '20px', marginTop: 0 }}>
                {error}
              </p>
            )}

            {/* Sign In button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#dedad4',
                color: '#c9a22a',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                marginBottom: '20px',
              }}
            >
              Sign In
            </button>
          </form>

          {/* Footer links */}
          <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#777', cursor: 'pointer' }}>
            forgot password?
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#555', cursor: 'pointer' }}>
            Don't have an account? <span style={{ color: '#c9a22a', fontWeight: 'bold' }} onClick={() => navigate('/register')}>Register</span>
          </p>

        </div>
      </div>
    </div>
  );
}
