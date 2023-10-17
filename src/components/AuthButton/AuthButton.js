import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import classes from './AuthButton.module.css';

const AuthButton = () => {
  const { user, login, logout } = useContext(AuthContext);

  const handleButtonClick = () => {
    if (!user) {
      login();
    } else {
      logout();
    }
  };

  return (
    <div className={classes.header}>
      <button
        onClick={handleButtonClick}
        className={classes.button}
      >
        {!user ? 'Login / Signup' : 'Logout'}
      </button>
    </div>
  );
};

export default AuthButton;
