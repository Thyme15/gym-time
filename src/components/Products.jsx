import { useState, useEffect } from 'react';
import Navbar from './ui/Nav-Bar';
import ProductCard from './ui/productImage';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from your backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar title="HERCULES" />
      <div style={{ padding: '60px 40px', minHeight: '80vh' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          All Products
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading products...</p>
        ) : products.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '30px',
              maxWidth: '1400px',
              margin: '0 auto',
            }}
          >
            {products.map((product) => (
              <div key={product.product_ID} style={{ display: 'flex', justifyContent: 'center' }}>
                <ProductCard
                  image="https://via.placeholder.com/300x400?text=Product"
                  title={product.product_name}
                  originalPrice={product.product_price}
                  rating={4.5}
                  ratingCount={100}
                />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No products found.</p>
        )}
      </div>
    </div>
  );
}
