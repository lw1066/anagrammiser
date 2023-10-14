import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthButton = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <div className="absolute top-5 right-5">
      <button
        onClick={!user ? login : logout}
        className="py-2 px-4 mr-2 bg-sky-500 hover:bg-sky-600 font-semibold rounded-md"
      >
        {!user ? 'Login / Signup' : 'Logout'}
      </button>
    </div>
  );
};
export default AuthButton;