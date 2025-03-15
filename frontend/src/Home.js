import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const styles = {
    advertisementSection: {
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      width: '100%',
      boxSizing: 'border-box',
    },
    adContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      position: 'relative',
      border: '4px solid #ffd700',
    },
    adHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      backgroundColor: '#1e3a8a',
      padding: '1rem',
      borderRadius: '10px',
    },
    adLogo: {
      width: '80px',
      height: 'auto',
      marginRight: '1rem',
    },
    adHeaderText: {
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    adCertification: {
      fontSize: '0.9rem',
      color: '#ffde59',
      marginTop: '0.5rem',
    },
    scholarshipContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '2rem',
      padding: '1rem',
    },
    scholarshipBox: {
      flex: 1,
      backgroundColor: '#ffde59',
      padding: '1.5rem',
      borderRadius: '10px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    youCan: {
      color: '#1e3a8a',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    winText: {
      color: '#1e3a8a',
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    percentageText: {
      color: '#ff0000',
      fontSize: '3.5rem',
      fontWeight: 'bold',
      lineHeight: '1',
    },
    scholarshipText: {
      color: '#1e3a8a',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    examDateBox: {
      flex: 1,
      backgroundColor: '#ff0000',
      padding: '1.5rem',
      borderRadius: '10px',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    examLabel: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    examDate: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    examDay: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      lineHeight: '1',
    },
    examDayText: {
      fontSize: '1.2rem',
      marginTop: '0.5rem',
    },

    '@media (max-width: 768px)': {
      scholarshipContainer: {
        flexDirection: 'column',
        gap: '1rem',
      },
      scholarshipBox: {
        width: '100%',
        padding: '1rem',
      },
      examDateBox: {
        width: '100%',
        padding: '1rem',
      },
      percentageText: {
        fontSize: '2.5rem',
      },
      examDay: {
        fontSize: '2.5rem',
      },
    },

    '@media (max-width: 480px)': {
      adHeaderText: {
        fontSize: '1.2rem',
      },
      adCertification: {
        fontSize: '0.8rem',
      },
      youCan: {
        fontSize: '1rem',
      },
      winText: {
        fontSize: '1.5rem',
      },
      percentageText: {
        fontSize: '2rem',
      },
      scholarshipText: {
        fontSize: '1.2rem',
      },
      examLabel: {
        fontSize: '1rem',
      },
      examDate: {
        fontSize: '1.5rem',
      },
      examDay: {
        fontSize: '2rem',
      },
      examDayText: {
        fontSize: '1rem',
      },
    },
  };

  return (
    <div>
      {/* Updated Advertisement Section */}
      <div style={styles.advertisementSection}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.adContainer}
        >
          <div style={styles.adContent}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={styles.adHeader}
            >
              <img 
                src="/path-to-csc-logo.png" 
                alt="CSC Logo" 
                style={styles.adLogo}
              />
              <div style={styles.adHeaderText}>
                COMPUTER SOFTWARE COLLEGE
                <div style={styles.adCertification}>An ISO 9001 : 2015 Certified Institution</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={styles.scholarshipContainer}
            >
              <div style={styles.scholarshipBox}>
                <div style={styles.youCan}>YOU CAN</div>
                <div style={styles.winText}>Win</div>
                <div style={styles.percentageText}>75%</div>
                <div style={styles.scholarshipText}>Scholarship</div>
              </div>
              
              <div style={styles.examDateBox}>
                <div style={styles.examLabel}>EXAM DATE</div>
                <div style={styles.examDate}>APRIL</div>
                <div style={styles.examDay}>8</div>
                <div style={styles.examDayText}>SUNDAY</div>
              </div>
              
              <div style={styles.scholarshipBox}>
                <div style={styles.youCan}>YOU CAN</div>
                <div style={styles.winText}>Win</div>
                <div style={styles.percentageText}>75%</div>
                <div style={styles.scholarshipText}>Scholarship</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;