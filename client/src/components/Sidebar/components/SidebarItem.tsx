import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../sidebar.module.css';
import { SidebarContext } from '../../../context/SidebarContext';

// Defining the interface for SidebarItem props
interface SidebarItemProps { path: string; text: string; icon: React.ReactNode; active?: boolean; alert?: boolean;}

// Defining the SidebarItem component
const SidebarItem: React.FC<SidebarItemProps> = ({ path, text, icon }) => {
  const { expanded, pathname } = useContext(SidebarContext); // Using SidebarContext to get expanded state and current pathname

  return (
    <Link to={path} className={`${styles.nav_links} group ${pathname === path ? styles.active_link : 'hover:bg-hover'}`}>
      {icon} {/* Displaying the icon */}
      {expanded && <span className={styles.link_text}>{text}</span>} {/* Displaying text if sidebar is expanded */}
      {/* Displaying tooltip with text if sidebar is not expanded */}
      {!expanded && <div className={`${styles.tooltip} group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}>{text}</div>}
    </Link>
  );
};

export default SidebarItem;
