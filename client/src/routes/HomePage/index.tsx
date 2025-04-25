import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-full text-text_color p-8 bg-gradient-to-b from-primary/10 to-background">
      <div className="w-full max-w-4xl text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">Task Hive</h1>
          <p className="text-xl text-white opacity-80">A minimal kanban board for maximum productivity</p>
          <p className="text-md text-white/70 max-w-2xl mx-auto">
            Streamline your workflow, boost team collaboration, and achieve your goals with our intuitive task management solution.
          </p>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-white transition-all duration-300 ease-in-out hover:-translate-y-1">
            <h3 className="text-lg font-semibold mb-3 text-primary">Organize</h3>
            <p className="text-text_color opacity-70">Arrange tasks into customizable columns based on their status.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white transition-all duration-300 ease-in-out hover:-translate-y-1">
            <h3 className="text-lg font-semibold mb-3 text-primary">Collaborate</h3>
            <p className="text-text_color opacity-70">Work together with your team in real-time on shared board.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white transition-all duration-300 ease-in-out hover:-translate-y-1">
            <h3 className="text-lg font-semibold mb-3 text-primary">Track</h3>
            <p className="text-text_color opacity-70">Monitor progress and visualize your workflow at a glance.</p>
          </div>
        </div>
        
        {/* Benefits section */}
        <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">Why Choose Task Hive?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
              <p className="text-white/90">Intuitive drag-and-drop interface</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
              <p className="text-white/90">Customizable workflows</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
              <p className="text-white/90">Efficient task organization</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
              <p className="text-white/90">Simple yet powerful task management</p>
            </div>
          </div>
        </div>
        
        <Link 
          to="/board" 
          className="inline-flex items-center px-8 py-3 bg-white text-primary font-semibold rounded-full ttransition-all duration-300 ease-in-out hover:-translate-y-1"
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        
      </div>
    </div>
  );
};

export default Home;
