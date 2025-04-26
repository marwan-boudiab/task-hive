import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-text_color p-4 sm:p-6 md:p-8 bg-gradient-to-b from-primary/10 to-background overflow-y-hidden">
      <div className="w-full max-w-4xl text-center space-y-6 sm:space-y-8 md:space-y-12 py-8">
        {/* Header section */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Task Hive</h1>
          <p className="text-lg sm:text-xl text-white opacity-80 px-2">A minimal kanban board for maximum productivity</p>
          <p className="text-sm sm:text-md text-white/70 max-w-2xl mx-auto px-4">
            Streamline your workflow, boost team collaboration, and achieve your goals with our intuitive task management solution.
          </p>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-2">
          <div className="p-4 sm:p-5 md:p-6 rounded-3xl bg-white transition-all duration-300 ease-in-out hover:-translate-y-1">
            <h3 className="text-base md:text-lg font-semibold mb-2 text-primary">Organize</h3>
            <p className="text-sm text-text_color opacity-70">Arrange tasks into customizable columns based on their status.</p>
          </div>
          <div className="p-4 sm:p-5 md:p-6 rounded-3xl bg-white transition-all duration-300 ease-in-out hover:-translate-y-1">
            <h3 className="text-base md:text-lg font-semibold mb-2 text-primary">Collaborate</h3>
            <p className="text-sm text-text_color opacity-70">Work together with your team in real-time on shared board.</p>
          </div>
          <div className="p-4 sm:p-5 md:p-6 rounded-3xl bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none">
            <h3 className="text-base md:text-lg font-semibold mb-2 text-primary">Track</h3>
            <p className="text-sm text-text_color opacity-70">Monitor progress and visualize your workflow at a glance.</p>
          </div>
        </div>
        
        {/* Benefits section */}
        <div className="bg-white/10 rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-sm mx-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6">Why Choose Task Hive?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-left">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-white/90">Intuitive drag-and-drop interface</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-white/90">Real-time updates across devices</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-white/90">Customizable workflow stages</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-white/90">Secure cloud-based storage</span>
            </div>
          </div>
        </div>
        
        <Link 
          to="/board" 
          className="inline-flex items-center px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-primary font-semibold rounded-full transition-all duration-300 ease-in-out hover:-translate-y-1 mx-auto"
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
