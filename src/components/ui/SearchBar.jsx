import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center', // Fix vertical alignment
      backgroundColor: '#ebdabc', // Beige color from the image
      borderRadius: '20px',
      padding: '8px 16px',
      width: '100%',
      maxWidth: '800px', // Nice and wide like in the image
    }}>
      <Search size={18} color="#555" strokeWidth={1.5} style={{ marginRight: '10px' }} />
      <input 
        type="text" 
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          outline: 'none',
          width: '100%',
          fontSize: '15px',
          color: '#000'
        }}
      />
    </div>
  );
}
