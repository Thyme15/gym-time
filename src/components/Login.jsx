import Navbar from './ui/Nav-Bar';

export default function Login() {
  return (
    <div>
      <Navbar title="HERCULES" />
      <div style={{ padding: '60px 40px', textAlign: 'center', minHeight: '80vh' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px' }}>Login</h2>
        <form style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Password</label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#7a7a46',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
