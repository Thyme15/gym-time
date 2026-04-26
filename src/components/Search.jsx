import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ui/Nav-Bar';
import ProductCard from './ui/productImage';

export default function Search() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    supplements: [],
    equipment: [],
    accessories: [],
  });

  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // Fetch all products initially so we can filter them
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchAllProducts();
  }, []);

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const isChecked = (category, value) => filters[category].includes(value);

  const FilterCheckbox = ({ label, category, value }) => (
    <div 
      onClick={() => toggleFilter(category, value)}
      style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontFamily: 'monospace', fontSize: '16px', color: '#1a1a1a' }}
    >
      {label}
      <div 
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: isChecked(category, value) ? '#d6aa54' : '#e2e2e2',
          borderRadius: '2px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {isChecked(category, value) && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  );

  const handleSearch = () => {
    setLoading(true);
    setSearched(true);
    
    // Gather all selected filter values
    const activeFilters = [
      ...filters.supplements,
      ...filters.equipment,
      ...filters.accessories
    ].map(f => f.toLowerCase());

    if (activeFilters.length === 0) {
      // Show all products if no filters selected
      setDisplayedProducts(products);
    } else {
      // Filter products: matches ANY selected filter in name or description
      const filtered = products.filter(product => {
        const textToSearch = `${product.product_name} ${product.product_desc}`.toLowerCase();
        return activeFilters.some(filter => textToSearch.includes(filter));
      });
      setDisplayedProducts(filtered);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#c8c0b0', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Navbar title="HERCULES" />
      
      <div style={{ padding: '40px 80px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', border: '1px solid #ccc', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          
          {/* Table Container */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Supplements Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px' }}>
                Supplements
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                <FilterCheckbox label="Protein" category="supplements" value="protein" />
                <FilterCheckbox label="Pre-Workout" category="supplements" value="pre-workout" />
                <FilterCheckbox label="Bars" category="supplements" value="bar" />
              </div>
            </div>

            {/* Equipment Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px' }}>
                Equipment
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                <FilterCheckbox label="Weights" category="equipment" value="dumbbell" />
                <FilterCheckbox label="Bands" category="equipment" value="band" />
                <FilterCheckbox label="Mats" category="equipment" value="mat" />
              </div>
            </div>

            {/* Accessories Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px' }}>
                Accessories
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                <FilterCheckbox label="Gloves" category="accessories" value="glove" />
                <FilterCheckbox label="Bags" category="accessories" value="bag" />
                <FilterCheckbox label="Recovery" category="accessories" value="recovery" />
                <FilterCheckbox label="Cardio" category="accessories" value="rope" />
              </div>
            </div>

          </div>

          {/* Search Button Area */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 40px' }}>
            <button 
              onClick={handleSearch}
              style={{
                backgroundColor: '#d6aa54',
                color: '#fff',
                border: 'none',
                padding: '12px 40px',
                fontSize: '16px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Search
            </button>
          </div>
          
        </div>

        {/* Search Results */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '18px' }}>Searching products...</p>
          ) : searched && displayedProducts.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '30px',
                maxWidth: '1400px',
                margin: '0 auto',
              }}
            >
              {displayedProducts.map((product) => (
                <div key={product.product_ID} style={{ display: 'flex', justifyContent: 'center' }}>
                  <ProductCard
                    id={product.product_ID}
                    image={product.product_image || `https://placehold.co/300x400/111111/c9a22a?text=${encodeURIComponent(product.product_name)}`}
                    title={product.product_name}
                    originalPrice={product.product_price}
                    rating={4.5}
                    ratingCount={100}
                    onClick={() => navigate(`/products/${product.product_ID}`)}
                  />
                </div>
              ))}
            </div>
          ) : searched ? (
            <p style={{ textAlign: 'center', fontSize: '18px' }}>No products found matching your criteria.</p>
          ) : null}
        </div>

      </div>
    </div>
  );
}
