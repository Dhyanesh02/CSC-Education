import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verification/send-verification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        setIsEmailValid(true);
        setIsCodeSent(true);
        setSuccess('Verification code sent to your email');
      } catch (error) {
        setError('Failed to send verification code: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please enter a valid email address');
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verification/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setIsCodeVerified(true);
      setShowPasswordFields(true);
      setSuccess('Email verified successfully');
    } catch (error) {
      setError('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      navigate(process.env.REACT_APP_ADMIN_LOGIN_URL);
    } catch (error) {
      setError('Registration failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verification/send-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccess('New verification code sent to your email');
    } catch (error) {
      setError('Failed to resend verification code: ' + error.message);
    } finally {
      setIsLoading(false);
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
        {!isCodeSent ? (
          <form onSubmit={handleEmailSubmit} style={styles.form}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
            {error && <p style={styles.errorText}>{error}</p>}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#ffd700' }}
              whileTap={{ scale: 0.95 }}
              style={styles.button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </motion.button>
          </form>
        ) : !isCodeVerified ? (
          <form onSubmit={handleVerificationSubmit} style={styles.form}>
            <div style={styles.emailDisplay}>
              <span style={styles.emailLabel}>Email:</span>
              <span style={styles.emailValue}>{email}</span>
            </div>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value);
                setError('');
              }}
              placeholder="Enter verification code"
              required
              style={styles.input}
            />
            {error && <p style={styles.errorText}>{error}</p>}
            {success && <p style={styles.successText}>{success}</p>}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#ffd700' }}
              whileTap={{ scale: 0.95 }}
              style={styles.button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#ffd700' }}
              whileTap={{ scale: 0.95 }}
              style={{ ...styles.button, backgroundColor: '#666' }}
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
            >
              Resend Code
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#ffd700' }}
              whileTap={{ scale: 0.95 }}
              style={{ ...styles.button, backgroundColor: '#666' }}
              type="button"
              onClick={() => {
                setIsCodeSent(false);
                setVerificationCode('');
                setError('');
                setSuccess('');
              }}
            >
              Change Email
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.emailDisplay}>
              <span style={styles.emailLabel}>Email:</span>
              <span style={styles.emailValue}>{email}</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password"
              required
              style={styles.input}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              placeholder="Confirm password"
              required
              style={styles.input}
            />
            {error && <p style={styles.errorText}>{error}</p>}
            {success && <p style={styles.successText}>{success}</p>}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#ffd700' }}
              whileTap={{ scale: 0.95 }}
              style={styles.button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#ffd700' }}
              whileTap={{ scale: 0.95 }}
              style={{ ...styles.button, backgroundColor: '#666' }}
              type="button"
              onClick={() => {
                setShowPasswordFields(false);
                setPassword('');
                setConfirmPassword('');
                setError('');
                setSuccess('');
              }}
            >
              Change Email
            </motion.button>
          </form>
        )}
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
    backgroundColor: '#1e3a8a',
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
    color: '#1e3a8a',
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
    borderColor: '#ffde59',
    boxShadow: '0 0 5px rgba(255, 222, 89, 0.5)',
  },
  button: {
    backgroundColor: '#ffde59',
    color: '#1e3a8a',
    border: 'none',
    padding: '0.8rem 0',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
  },
  registerText: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#555',
  },
  registerLink: {
    color: '#1e3a8a',
    transition: 'color 0.3s ease',
  },
  link: {
    textDecoration: 'none',
  },
  errorText: {
    color: '#ff0000',
    fontSize: '0.9rem',
    margin: '0.5rem 0',
  },
  successText: {
    color: '#28a745',
    fontSize: '0.9rem',
    margin: '0.5rem 0',
  },
  emailDisplay: {
    backgroundColor: '#f5f5f5',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'left',
  },
  emailLabel: {
    color: '#666',
    marginRight: '0.5rem',
  },
  emailValue: {
    color: '#1e3a8a',
    fontWeight: '500',
  },
};

export default AdminRegister;