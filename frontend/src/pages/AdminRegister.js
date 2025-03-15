import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      navigate(process.env.REACT_APP_ADMIN_LOGIN_URL);
    } catch (error) {
      alert('Registration failed: ' + error.message);
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
        <h2 style={styles.title}>Admin Registration</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
          />
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#ffd700' }}
            whileTap={{ scale: 0.95 }}
            style={styles.button}
            type="submit"
          >
            Register
          </motion.button>
        </form>
        <p style={styles.registerText}>
          Already have an account?{' '}
          <motion.span
            whileHover={{ color: '#ffde59', scale: 1.02 }}
            style={styles.registerLink}
          >
            <Link to={process.env.REACT_APP_ADMIN_LOGIN_URL} style={styles.link}>
              Login here
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
    backgroundColor: '#1e3a8a', // Dark blue background
    padding: '2rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '2.5rem',
    width: '400px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
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
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  inputFocus: {
    borderColor: '#ffde59', // Yellow on focus
    boxShadow: '0 0 5px rgba(255, 222, 89, 0.5)',
  },
  button: {
    backgroundColor: '#ffde59', // Yellow button
    color: '#1e3a8a', // Dark blue text
    border: 'none',
    padding: '0.8rem 0',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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

export default AdminRegister;