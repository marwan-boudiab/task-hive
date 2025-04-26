import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.css';

const Profile = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  if (!user) {
    return <div className={styles.profile_container}>Please log in to view your profile</div>;
  }

  // Extract username from email and capitalize first letter
  const generateUsername = (email: string) => {
    const username = email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_card}>
        <h1 className={styles.profile_title}>My Profile</h1>
        
        <div className={styles.avatar}>
          {user.email.charAt(0).toUpperCase()}
        </div>
        
        <div className={styles.profile_info}>
          <div className={styles.profile_item}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user.email}</span>
          </div>
          <div className={styles.profile_item}>
            <span className={styles.label}>Username</span>
            <span className={styles.value}>{user.username || generateUsername(user.email)}</span>
          </div>
        </div>
        
        <button 
          className={styles.logout_button}
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;