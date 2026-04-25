import { useState } from 'react';
import Navbar from './ui/Nav-Bar';

export default function Search() {
  const [filters, setFilters] = useState({
    arrival: [],
    genders: [],
    clothes: [],
    shoes: [],
  });

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
    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontFamily: 'monospace', fontSize: '16px', color: '#1a1a1a' }}>
      {label}
      <div 
        onClick={() => toggleFilter(category, value)}
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
    </label>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#c8c0b0', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Navbar title="HERCULES" />
      
      <div style={{ padding: '40px 80px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: '#fff', flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid #ccc', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          
          {/* Table Container */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            
            {/* Arrival Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px' }}>
                Arrival
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                <FilterCheckbox label="New Arrival" category="arrival" value="new_arrival" />
              </div>
            </div>

            {/* Genders Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px' }}>
                Genders
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                <FilterCheckbox label="Men" category="genders" value="men" />
                <FilterCheckbox label="Women" category="genders" value="women" />
              </div>
            </div>

            {/* Clothes Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', minHeight: '80px' }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px' }}>
                Clothes
              </div>
              <div style={{ flex: 1, padding: '0 40px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                <FilterCheckbox label="T- Shirt" category="clothes" value="tshirt" />
                <FilterCheckbox label="Pant" category="clothes" value="pant" />
                <FilterCheckbox label="Hoodie" category="clothes" value="hoodie" />
                <FilterCheckbox label="Accessories" category="clothes" value="accessories" />
              </div>
            </div>

            {/* Shoes Row */}
            <div style={{ display: 'flex', flex: 1 }}>
              <div style={{ width: '200px', backgroundColor: '#dbdbdb', display: 'flex', paddingTop: '30px', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px' }}>
                Shoes
              </div>
              <div style={{ flex: 1, padding: '30px 40px', display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
                <FilterCheckbox label="Original" category="shoes" value="original" />
                <FilterCheckbox label="Running" category="shoes" value="running" />
                <FilterCheckbox label="Gym & Training" category="shoes" value="training" />
                <FilterCheckbox label="Basketball" category="shoes" value="basketball" />
              </div>
            </div>

          </div>

          {/* Search Button Area */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 40px' }}>
            <button 
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
              onClick={() => {
                console.log("Searching with filters:", filters);
                alert("Search triggered! Filters logged to console.");
              }}
            >
              Search
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
