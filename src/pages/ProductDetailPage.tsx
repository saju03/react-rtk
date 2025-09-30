import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../lib/redux/api/apiSlice';
import { useAppSelector } from '../lib/redux/hooks';
import { Link } from 'react-router-dom';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.user);
  const { data: product, error, isLoading } = useGetProductsQuery(Number(id));

  if (!user.status) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Please log in to view product details.</p>
        <Link to="/loginorsignup">Login</Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>Error loading product: {error.toString()}</p>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Product not found.</p>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
        ← Back to Products
      </Link>
      
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '30px', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginTop: '20px'
      }}>
        <h1 style={{ margin: '0 0 20px 0', color: '#333' }}>{product.name}</h1>
        <p style={{ margin: '0 0 20px 0', color: '#666', lineHeight: '1.6' }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
            ${product.price}
          </span>
          <span style={{ 
            backgroundColor: '#e9ecef', 
            padding: '8px 16px', 
            borderRadius: '4px',
            fontSize: '14px',
            color: '#495057'
          }}>
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
