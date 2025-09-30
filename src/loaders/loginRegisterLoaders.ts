import { redirect } from 'react-router-dom';
import store  from '../lib/redux/store'; // Adjust the path if needed

// You cannot use React hooks like useAppSelector in non-component functions (like loaders).
// Instead, you should access Redux state outside React using the store directly.


export const loginRegisterLoaders = async () => {
  // Get user data from Redux store
  const state = store.getState();
  
  const status = state.user.status // Adjust according to your state shape

  if (status) {
    return redirect('/');
  }

  // If user is not logged in, allow access to login page
  return null;
};