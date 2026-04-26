import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // เพิ่ม Logic การส่งข้อมูลตรงนี้
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, address, email, password }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const labelStyle = {
    display: 'block',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#1a1a1a'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#c4bdb0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'serif', // ใช้ Serif ตามรูป
    }}>
      <div style={{ position: 'relative', paddingTop: '28px' }}>
        
        {/* HERCULES badge */}
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
          zIndex: 2,
          cursor: 'pointer',
        }} onClick={() => navigate('/')}>
          HERCULES
        </div>

        {/* White card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '30px',
          padding: '40px 50px',
          width: '550px', // กว้างขึ้นตามรูปตัวอย่าง
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          position: 'relative'
        }}>
          {/* Close button */}
          <X 
            size={24} 
            style={{ position: 'absolute', top: 25, right: 30, cursor: 'pointer', color: '#333' }} 
            onClick={() => navigate('/login')}
          />

          <h2 style={{ margin: '0 0 30px', fontSize: '24px', textAlign: 'center' }}>Register</h2>

          <form onSubmit={handleSubmit}>
            {/* First Name & Last Name row */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>First Name</label>
                <input 
                  type="text" 
                  value={firstname} 
                  onChange={(e) => setFirstname(e.target.value)} 
                  style={inputStyle} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Last Name</label>
                <input 
                  type="text" 
                  value={lastname} 
                  onChange={(e) => setLastname(e.target.value)} 
                  style={inputStyle} 
                />
              </div>
            </div>

            {/* Address */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Address :</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                style={inputStyle} 
              />
            </div>

            {/* Gmail */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Gmail :</label>
              <input 
                type="email" 
                placeholder="Please enter valid email address."
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={inputStyle} 
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '35px' }}>
              <label style={labelStyle}>Password :</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={inputStyle} 
              />
            </div>

            {/* Register button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#dedad4',
                  color: '#c9a22a',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 60px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
