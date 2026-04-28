import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ui/Nav-Bar';
import ProductCard from './ui/productImage';

export default function Search() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    arrival: [],
    genders: [],
    clothes: [],
    shoes: [],
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
    
    // 1. Get active categories (those that have at least one checkbox ticked)
    const activeCategories = Object.keys(filters).filter(cat => filters[cat].length > 0);

    if (activeCategories.length === 0) {
      setDisplayedProducts(products);
    } else {
      // 2. Filter products: Must match ALL active categories (AND logic)
      const filtered = products.filter(product => {
        const name = (product.product_name || "").toLowerCase();
        const desc = (product.product_desc || "").toLowerCase();
        const textToSearch = `${name} ${desc}`;

        // Check if product satisfies every active category
        return activeCategories.every(category => {
          const categoryFilters = filters[category];
          
          return categoryFilters.some(filterValue => {
            const val = filterValue.toLowerCase();
            
            // Special fix for "men" vs "women"
            if (val === 'men') {
              const regex = new RegExp('\\bmen\\b', 'i');
              return regex.test(textToSearch);
            }

            if (val === 'accessories') {
              // If filtering by Accessories, search for these three keywords
              return ['flask', 'bag', 'glove'].some(keyword => textToSearch.includes(keyword));
            }
            
            return textToSearch.includes(val);
          });
        });
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
            
            {/* Arrival Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'serif', fontSize: '18px' }}>
                Arrival
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                <FilterCheckbox label="New Arrival" category="arrival" value="raven" />
              </div>
            </div>

            {/* Genders Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'serif', fontSize: '18px' }}>
                Genders
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                <FilterCheckbox label="Men" category="genders" value="men" />
                <FilterCheckbox label="Women" category="genders" value="women" />
              </div>
            </div>

            {/* Clothes Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'serif', fontSize: '18px' }}>
                Clothes
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                <FilterCheckbox label="T- Shirt" category="clothes" value="tee" />
                <FilterCheckbox label="Pant" category="clothes" value="pant" />
                <FilterCheckbox label="Hoodie" category="clothes" value="hoodie" />
                <FilterCheckbox label="Accessories" category="clothes" value="accessories" />
              </div>
            </div>

            {/* Shoes Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'serif', fontSize: '18px' }}>
                Shoes
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                <FilterCheckbox label="Original" category="shoes" value="shoe" />
                <FilterCheckbox label="Running" category="shoes" value="running" />
                <FilterCheckbox label="Gym & Training" category="shoes" value="training" />
                <FilterCheckbox label="Basketball" category="shoes" value="basketball" />
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
