import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >
        <h2 style={styles.title}>Admin Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={styles.input}
            whileFocus={styles.inputFocus}
          />
          <motion.input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
            whileFocus={styles.inputFocus}
          />
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#ffd700' }}
            whileTap={{ scale: 0.95 }}
            style={styles.button}
            type="submit"
          >
            Login
          </motion.button>
        </form>
        <p style={styles.registerText}>
          Don't have an account?{' '}
          <motion.span
            whileHover={{ color: '#ffde59', scale: 1.02 }}
            style={styles.registerLink}
          >
            <Link to={process.env.REACT_APP_ADMIN_REGISTER_URL} style={styles.link}>
              Register
            </Link>
          </motion.span>
        </p>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3a8a, #233876)', // Gradient background
    padding: '2rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px', // Increased border radius
    padding: '2.5rem',
    width: '400px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    },
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3a8a', // Dark blue for title
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem 1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '10px', // Increased border radius
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  inputFocus: {
    borderColor: '#ffde59', // Yellow on focus
    boxShadow: '0 0 5px rgba(255, 222, 89, 0.5)',
  },
  button: {
    background: 'linear-gradient(135deg, #ffde59, #e6c200)', // Gradient button
    color: '#1e3a8a', // Dark blue text
    border: 'none',
    padding: '0.8rem 0',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #e6c200, #ffd700)',
    },
  },
  registerText: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#555',
  },
  registerLink: {
    color: '#1e3a8a', // Dark blue link
    transition: 'color 0.3s ease',
  },
  link: {
    textDecoration: 'none',
  },
};

export default AdminLogin;