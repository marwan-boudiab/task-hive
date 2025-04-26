import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header section */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Task Hive</h1>
          <p className={styles.subtitle}>A minimal kanban board for maximum productivity</p>
          <p className={styles.description}>
            Streamline your workflow, boost team collaboration, and achieve your goals with our intuitive task management solution.
          </p>
        </div>
        
        {/* Feature cards */}
        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Organize</h3>
            <p className={styles.featureDescription}>Arrange tasks into customizable columns based on their status.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Collaborate</h3>
            <p className={styles.featureDescription}>Work together with your team in real-time on shared board.</p>
          </div>
          <div className={styles.featureCardWide}>
            <h3 className={styles.featureTitle}>Track</h3>
            <p className={styles.featureDescription}>Monitor progress and visualize your workflow at a glance.</p>
          </div>
        </div>
        
        {/* Benefits section */}
        <div className={styles.benefitsSection}>
          <h2 className={styles.benefitsTitle}>Why Choose Task Hive?</h2>
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <CheckCircle className={styles.benefitIcon} />
              <span className={styles.benefitText}>Intuitive drag-and-drop interface</span>
            </div>
            <div className={styles.benefitItem}>
              <CheckCircle className={styles.benefitIcon} />
              <span className={styles.benefitText}>Real-time updates across devices</span>
            </div>
            <div className={styles.benefitItem}>
              <CheckCircle className={styles.benefitIcon} />
              <span className={styles.benefitText}>Customizable workflow stages</span>
            </div>
            <div className={styles.benefitItem}>
              <CheckCircle className={styles.benefitIcon} />
              <span className={styles.benefitText}>Secure cloud-based storage</span>
            </div>
          </div>
        </div>
        
        <Link 
          to="/board" 
          className={styles.ctaButton}
        >
          Get Started <ArrowRight className={styles.ctaIcon} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
