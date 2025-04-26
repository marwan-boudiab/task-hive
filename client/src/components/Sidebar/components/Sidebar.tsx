import { LogOut, Menu, User } from 'lucide-react';
import { useState, memo } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../sidebar.module.css';
import { SidebarContext } from '../../../context/SidebarContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogout } from '../../../hooks/useLogout';

// Sidebar component definition, memoized for performance optimization
const Sidebar = memo(({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext(); // Getting user information from authentication context
  const { logout } = useLogout(); // Getting logout function from custom hook
  const [expanded, setExpanded] = useState(true); // State to track if the sidebar is expanded or not
  const { pathname } = useLocation(); // Getting current pathname from useLocation hook
  const hideSidebar = pathname === '/login' || pathname === '/signup'; // Determine if the sidebar should be hidden based on the current route

  // Function to toggle sidebar expansion
  const handleToggleSidebar = () => setExpanded(curr => !curr);

  // Function to handle user logout
  const handleLogout = () => logout();

  // If the sidebar should be hidden, return null
  if (hideSidebar) return null;

  return (
    <aside className={`${styles.aside} ${expanded ? styles.expanded : ''}`}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          {/* Display logo and title when the sidebar is expanded */}
          {/* {expanded && (
            <div className="flex h-[36px] items-center gap-2">
              <img
                src={logo}
                className="ms-2 size-[32px] overflow-hidden transition-all"
                alt=""
              />
              <p className="text-tertiary overflow-hidden font-semibold transition-all">
                Task Hive
              </p>
            </div>
          )} */}
          <button onClick={handleToggleSidebar} className={styles.btn}>
            {/* Button to toggle sidebar expansion */}
            <Menu className={styles.icon} />
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded, pathname }}>
          {/* Rendering child components as sidebar items */}
          <ul className={styles.pages}>{children}</ul>
        </SidebarContext.Provider>
        <div className={styles.profile_wrapper}>
          {user && (
            <>
              {/* User avatar */}
              {/* <img src="/assets/avatar.png" alt="avatar" className={styles.avatar} /> */}
              <div className={styles.btn}>
                {/* <User className={styles.icon} /> */}
                <p className='size-5 flex items-center justify-center'>{user.email.charAt(0).toUpperCase()}</p>
              </div>
              {expanded && (
                <div className={styles.profile_info}>
                  {/* Display user email */}
                  <div className="leading-4">
                    <h4 className={styles.user_name}>{user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)}</h4>
                    <span className={styles.user_email}>{user.email}</span>
                  </div>
                  <button onClick={handleLogout} className={styles.logout_btn}>
                    {/* Logout button */}
                    <LogOut className={styles.icon} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </aside>
  );
});

export default Sidebar;
