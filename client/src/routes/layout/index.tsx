import { Outlet } from 'react-router-dom';
import { BoardContextProvider } from '../../context/BoardContext';
import SideNav from '../../components/Sidebar';

const index = () => {
  return (
    <div className="layout">
      <SideNav />
      {/* <div className="absolute left-0 top-0 h-full w-full bg-tasks-bg bg-cover bg-center -z-50"></div>
      <div className="absolute left-0 top-0 h-full w-full bg-white/30 backdrop-blur-3xl -z-10"></div> */}
      <div className="content">
        <BoardContextProvider>
          <Outlet />
        </BoardContextProvider>
      </div>
    </div>
  );
};
export default index;
