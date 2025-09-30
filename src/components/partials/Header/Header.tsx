import { useAppSelector } from '../../../lib/redux/hooks';
import { Link } from 'react-router-dom';

export default function Header() {
  const user = useAppSelector((state) => state.user);

  return (
    <header style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ margin: 0, color: '#333' }}>App</h1>
      <div>
        {user.status ? (
          <span style={{ color: '#28a745' }}>
            Welcome, {user.userName}!
          </span>
        ) : (
          <span style={{ color: '#6c757d' }}>
          
           <Link to="/loginorsignup">Login</Link>
          </span>
        )}
      </div>
    </header>
  );
}
