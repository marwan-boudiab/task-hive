import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import styles from './auth.module.css';
import { useLogin } from '../../hooks/useLogin';
import { useSignup } from '../../hooks/useSignup';

// Define the interface for the component props
interface AuthFormProps {
  type: 'login' | 'signup'; // The component will receive either "login" or "signup" as a type
}

// Define the AuthForm component
const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Destructuring login and signup functions, errors, and loading states from the respective hooks
  const { login, error: loginError, isLoading: loginLoading } = useLogin();
  const { signup, error: signupError, isLoading: signupLoading } = useSignup();

  // Determine if the form is for login or signup based on the type prop
  const isLogin = type === 'login';

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    isLogin ? await login(email, password) : await signup(email, password); // Call login or signup function based on the form type
  };

  // Determine the current error message based on the form type
  const error = isLogin ? loginError : signupError;

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <h1 className={styles.heading}>{isLogin ? 'Login' : 'Signup'}</h1>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className={styles.input} />
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className={styles.input} />
        <button className={styles.btn} onClick={handleSubmit} disabled={isLogin ? loginLoading : signupLoading}>
          {isLogin ? 'Login' : 'Sign up'}
        </button>
        <p>
          {isLogin ? 'Need an account? ' : 'Already have an account? '}
          <Link className={styles.link} to={isLogin ? '/signup' : '/login'}>
            {isLogin ? 'Register' : 'Login'}
          </Link>
        </p>
        {error && (
          <div className={styles.error}>
            <ShieldAlert />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
