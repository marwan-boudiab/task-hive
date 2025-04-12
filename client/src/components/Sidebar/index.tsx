import { Home, Kanban, Settings } from 'lucide-react';
import Sidebar from './components/Sidebar';
import SidebarItem from './components/SidebarItem';
import styles from './sidebar.module.css';

// Array of link objects, each containing a path, title, and icon
const links = [
  { path: '/', title: 'Home', icon: <Home className={styles.icon} /> },
  { path: '/board', title: 'Kanban', icon: <Kanban className={styles.icon} /> },
  { path: '/settings', title: 'Settings', icon: <Settings className={styles.icon} /> },
];

// Defining the SideNav component
const SideNav = () => {
  return (
    <Sidebar>
      {/* Mapping over the links array to create SidebarItem components */}
      {links.map(link => (
        <SidebarItem key={link.path} path={link.path} text={link.title} icon={link.icon} />
      ))}
    </Sidebar>
  );
};
export default SideNav;
