import { Menu, ShoppingBag, Heart, User } from 'lucide-react';

export default function NavBar(props) {
  
  return (
    <header style={{ width: '100%', fontFamily: 'sans-serif' }}>
      
      {/* --- 1. GREEN TOP BAR --- */}
      <div style={{ backgroundColor: 'rgba(121, 120, 70, 1)', height: '40px', width: '100%' }}>
        {/* We can put tiny text or announcements here later */}
      </div>

      {/* --- 2. WHITE MAIN SECTION --- */}
      <div style={{ backgroundColor: 'white', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Side: Burger Menu Icon */}
        <div style={{ cursor: 'pointer' }}>
          <Menu size={28} strokeWidth={1.5} />
        </div>

        {/* Center: Logo (Using your title prop!) */}
        <h1 style={{ margin: 0, color: 'black', fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px' }}>
          {props.title}
        </h1>

        {/* Right Side: Icons */}
        <div style={{ display: 'flex', gap: '24px', cursor: 'pointer' }}>
          <ShoppingBag size={24} strokeWidth={1.5} />
          <Heart size={24} strokeWidth={1.5} />
          <User size={24} strokeWidth={1.5} />
        </div>

      </div>

    </header>
  );
}
