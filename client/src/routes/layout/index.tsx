import { Outlet } from 'react-router-dom';
import { BoardContextProvider } from '../../context/BoardContext';
import SideNav from '../../components/Sidebar';
import MobileNav from '../../components/MobileNav';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="layout">
      {!isMobile && <SideNav />}
      <div className="content pb-16 md:pb-0">
        <BoardContextProvider>
          <Outlet />
        </BoardContextProvider>
      </div>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Layout;
