import { Home, Kanban, LogIn, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './mobilenav.module.css';

const MobileNav = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  
  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_wrapper}>
        <Link to="/" className={`${styles.nav_item} ${location.pathname === '/' ? styles.active : ''}`}>
          <Home size={20} />
          <span>Home</span>
        </Link>
        
        <Link to="/board" className={`${styles.nav_item} ${location.pathname === '/board' ? styles.active : ''}`}>
          <Kanban size={20} />
          <span>Board</span>
        </Link>
        
        {user ? (
          <Link to="/profile" className={`${styles.nav_item} ${location.pathname === '/profile' ? styles.active : ''}`}>
            <User size={20} />
            <span>Profile</span>
          </Link>
        ) : (
          <Link to="/login" className={`${styles.nav_item} ${location.pathname === '/login' ? styles.active : ''}`}>
            <LogIn size={20} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNav;