import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/search')}
      style={{
        display: 'flex',
        alignItems: 'center', 
        backgroundColor: '#ebdabc', 
        borderRadius: '20px',
        padding: '8px 16px',
        width: '100%',
        maxWidth: '800px', 
        cursor: 'pointer',
        height: '36px',
        boxSizing: 'border-box'
      }}>
      <SearchIcon size={18} color="#555" strokeWidth={1.5} style={{ marginRight: '10px' }} />
    </div>
  );
}
