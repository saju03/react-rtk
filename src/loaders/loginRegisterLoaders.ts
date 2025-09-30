import { redirect } from 'react-router-dom';
import { useAppSelector } from '../lib/redux/hooks';

export const loginRegisterLoaders = async () => {
  // Get user data from localStorage (you can also use Redux store if needed)
  const userData = useAppSelector((state) => state.user);
    
  if (userData.status) {
    return redirect('/');
  }
  
  // If user is not logged in, allow access to login page
  return null;
};