import { useAuth } from '../uath/AuthenticationContex';
import { Navigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

export default function Logout() {

    const { logout } = useAuth();
    logout();
    localStorage.removeItem('Status');
    localStorage.removeItem('LoggedInUserDetails');
   


    return <Navigate to="/login" />;
}
