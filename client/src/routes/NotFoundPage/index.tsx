import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col gap-2">
      404 Not Found Page
      <Link to="/">Go Back to Home Page</Link>
    </div>
  );
};
export default NotFound;
