import { Menu, ShoppingBag, Heart, User } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar(prop) {

  return (
    <header style={{ width: '100%', fontFamily: 'sans-serif'}}>
      
       {/* --- 1. GREEN TOP BAR --- */}
      <div style={{ backgroundColor: 'rgba(121, 120, 70, 1)', height: '40px', width: '100%'}}></div>

      {/* --- 2. WHITE MAIN SECTION --- */}
      <div style={{ backgroundColor: 'white', padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: '20px'}}>

        {/* Top Row: Empty Left, Center Logo, Right Icons */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

            <div style={{flex: 1}}></div>

            <h1 style={{margin: 0, color: 'black', fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px', textAlign: 'center', flex: 1, textTransform: 'uppercase'}}>
            {prop.title}
            </h1>

            <div style={{ display: 'flex', gap: '24px', cursor: 'pointer', flex: 1, justifyContent: 'flex-end', alignItem: 'center'}}>
                <ShoppingBag size={24} strokeWidth={1.5} />
                <Heart size={24} strokeWidth={1.5} />
                <User size={24} strokeWidth={1.5} />
            </div>
        </div>

        {/* Bottom Row: Menu Icon & Search Bar */}
        <div style={{display:'flex', alignItems:'center', gap: '40px'}}>
          <div style={{ cursor: 'pointer', dispaly: 'flex', justifyContent: 'flex-start'}}>
            <Menu size={32} strokeWidth={1.5} />
          </div>

          <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
            <SearchBar />
          </div>

          <div style={{width: '32px'}}></div>
        </div>

      </div>

      {/* --- 3. GREY CATEGORY BAR --- */}
      <div style={{backgroundColor: '#f4f4f4', padding: '12px 40px', display: 'flex', gap: '30px', borderTop: '2px solid #ddd', borderBottom: '2px solid #ddd', fontSize: '14px', letterSpacing: '0.5px'}}>
        <span style={{cursor: 'pointer'}}>Women</span>
        <span style={{cursor: 'pointer'}}>Men</span>
        <span style={{cursor: 'pointer'}}>Shoes</span>
        <span style={{cursor: 'pointer'}}>Accessories</span>
        <span style={{cursor: 'pointer'}}>About Us</span>
      </div>
    </header>
  )
}