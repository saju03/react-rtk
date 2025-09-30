import { useAppSelector } from '../lib/redux/hooks';
import { useGetProductsQuery } from '../lib/redux/api/apiSlice';
import { Link } from 'react-router-dom';

export default function ProductListPage() {
  const user = useAppSelector((state) => state.user);
  const { data: products, error, isLoading } = useGetProductsQuery({});

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to iware!</h1>
      {user.status ? (
        <div>
          <p>Hello, {user.userName}! You are successfully logged in.</p>
          <p>This is your dashboard.</p>
          
          {/* Products Section */}
          <div style={{ marginTop: '30px', textAlign: 'left' }}>
            <h2>Products</h2>
            {isLoading && <p>Loading products...</p>}
            {error && <p style={{ color: 'red' }}>Error loading products: {error.toString()}</p>}
            {products && (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px', 
                marginTop: '20px' 
              }}>
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    style={{ 
                      border: '1px solid #ddd', 
                      padding: '15px', 
                      borderRadius: '8px',
                      backgroundColor: '#f9f9f9',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{product.name}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
                        ${product.price}
                      </span>
                      <span style={{ 
                        backgroundColor: '#e9ecef', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#495057'
                      }}>
                        {product.category}
                      </span>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                      <Link 
                        to={`/product/${product.id}`}
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#007bff',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontSize: '14px'
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
    </div>
  );
}
