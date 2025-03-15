const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  apiUrl: isDevelopment 
    ? 'http://localhost:5000/api'
    : 'https://csc-education-server.vercel.app/api'
};

export default config; 