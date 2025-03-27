import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config/config.js';
import AdmitCardQR from '../components/QRCode';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentBrochureIndex, setCurrentBrochureIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  const brochureImages = [
    "/images/brochures/images1.jpg",
    "/images/brochures/images2.jpg",
    "/images/brochures/images3.jpg",
    "/images/brochures/images4.jpg",
    "/images/brochures/images5.jpg",
    "/images/brochures/images6.jpg",
    "/images/brochures/images7.jpg",
    "/images/brochures/images8.jpg",
    "/images/brochures/images9.jpg",
    "/images/brochures/images10.jpg",
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const contactInfo = {
    email: 'csc.sureshbaskaran@gmail.com',
    phone: '+91 99427 25757',
  };
  
  const stats = [
      { icon: "👨‍🎓", count: "5K+", label: "Students taught" },
    { icon: "📋", count: "360+", label: "Institutions" },
    { icon: "📚", count: "20+", label: "Courses" },
  ];

  const reviews = [
    {
      id: 1,
      name: "Ameeth Kumar",
      rating: 5,
      date: "a year ago",
      review: "Very nice experience for me to learn programming languages. Classes were very nice and I liked it so much. All The topics were covered by the practical. The trainer gave me regular feedback during course. Thank you for giving a wonderful coaching. I would recommend to join students here.",
      image: "https://via.placeholder.com/50" // Replace with actual student image if available
    },
    {
      id: 2,
      name: "Dhineshkumar M",
      rating: 5,
      date: "2 months ago",
      review: "My experience in csc class was excellent and practically and step by step each and every transaction or words to be tell and i understand about all and excellent of service.",
      image: "https://via.placeholder.com/50"
    },
    {
      id: 3,
      name: "Manokaran G",
      rating: 5,
      date: "3 months ago",
      review: "Very good experience for me to learn Django framework.It helps me to improve my knowledge about web development ☺️ Thanks for the opportunity ✨",
      image: "https://via.placeholder.com/50"
    },
    {
      id: 4,
      name: "Sabhithasree S",
      rating: 5,
      date: "a year ago",
      review: "Classes were really nice. I liked it very much & good support provided by staffs. I recommend students to take up class here since its very nice place to learn. They are very supportive.Almost all the topics where covered with practical. Good institute to learn courses. The trainer gave me regular feedback during course. Thank you for giving a wonderful coaching.😊😊",
      image: "https://via.placeholder.com/50"
    },
    {
      id: 5,
      name: "Nandhu Sadhu",
      rating: 5,
      date: "7 months ago",
      review: "CSC is the best computer center Sangeetha Mam was too nice teaching to our students I like too in this class All Mam's are too good Class is very perfect",
      image: "/frontend/public/csclogo.png"
    },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.apiUrl}/courses`);
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBrochureIndex((prevIndex) => 
        prevIndex === brochureImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [brochureImages.length]); // Add the missing dependency

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleBrochureClick = (direction) => {
    if (direction === 'next') {
      setCurrentBrochureIndex((prevIndex) => 
        prevIndex === brochureImages.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentBrochureIndex((prevIndex) => 
        prevIndex === 0 ? brochureImages.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setSelectedCourse(null);
    setMobileMenuOpen(false); // Close mobile menu after navigation
    // Add this line to scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    // Add this line to scroll to top when a course is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    setSelectedCourse(null);
  };

  const handleEnrollClick = (googleFormLink) => {
    window.open(googleFormLink, '_blank');
  };

  const sampleCourses = [
    {
      _id: "67ce70fb7dff90ffdabe0c22",
      mainTopic: "Python",
      imageUrl: "https://res.cloudinary.com/dswrqtwpz/image/upload/v1741582587/csc-web…",
      about: "Its good",
      googleFormLink: "https://forms.gle/xebX8pd6eeDuDFAt6ss",
      curriculum: [{ subtopic: "Basics", content: "Learn Python fundamentals" }],
    },
    {
      _id: "67ce99ad541dc38023f2f92a",
      mainTopic: "Java",
      imageUrl: "https://res.cloudinary.com/dswrqtwpz/image/upload/v1741593005/csc-web…",
      about: "java",
      googleFormLink: "https://forms.gle/xebX8pd6eeDuDFAt6ss",
      curriculum: [{ subtopic: "OOPS", content: "oops: oops" }],
    },
  ];

  const displayCourses = courses.length > 0 ? courses : sampleCourses;

  const renderFeatureCard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.featureCardContainer}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={styles.backButton}
        onClick={handleBackClick}
      >
        ← Back
      </motion.button>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={styles.featureCard}
      >
        <div style={styles.featureImageWrapper}>
          <img
            src={selectedCourse.imageUrl || `https://via.placeholder.com/800x400?text=${selectedCourse.mainTopic}`}
            alt={selectedCourse.mainTopic}
            style={styles.featureImage}
            onError={(e) => { e.target.src = `https://via.placeholder.com/800x400?text=${selectedCourse.mainTopic}`; }}
          />
        </div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={styles.featureContent}
        >
          <h2 style={styles.featureTitle}>{selectedCourse.mainTopic}</h2>
          <p style={styles.featureText}>{selectedCourse.about}</p>
          <h3 style={styles.featureSectionTitle}>Curriculum</h3>
          {selectedCourse.curriculum && selectedCourse.curriculum.length > 0 ? (
            <ul style={styles.featureList}>
              {selectedCourse.curriculum.map((item, index) => (
                <li key={index} style={styles.featureListItem}>
                  <strong style={styles.subtopic}>{item.subtopic}:</strong> <span style={styles.content}>{item.content}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No curriculum available yet.</p>
          )}
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: '#ffde59',
              boxShadow: '0 5px 15px rgba(255, 222, 89, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            style={styles.enrollButton}
            onClick={() => handleEnrollClick(selectedCourse.googleFormLink)}
          >
            Enroll Now
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const renderHome = () => (
    <>
      <div style={styles.hero}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.title}
        >
          "Master technology, shape your <span style={styles.highlight}>future.</span>"
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.subtitle}
        >
          "Learn, <span style={styles.highlight}>Innovate</span>, Excel <span style={styles.highlight}>digitally.</span>"
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={styles.quote}
        >
          "Empower your future with essential computer skills—learn, grow, and excel in the digital world."
        </motion.p>
        <motion.button
          whileHover={{ 
            scale: 1.02,
            backgroundColor: '#ffde59',
            boxShadow: '0 5px 15px rgba(255, 222, 89, 0.4)'
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.6,
            type: "spring",
            stiffness: 300
          }}
          style={styles.exploreButton}
          onClick={() => handleNavClick('courses')}
        >
          EXPLORE COURSES
        </motion.button>
      </div>

      <div style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            style={styles.statItem}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={styles.statIcon}
            >
              {stat.icon}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={styles.statCount}
            >
              {stat.count}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={styles.statLabel}
            >
              {stat.label}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* QR Code Section */}
      <div style={styles.qrCodeSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.qrCodeContainer}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={styles.qrCodeWrapper}
          >
            <AdmitCardQR />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={styles.qrCodeText}
          >
            <h3 style={styles.qrCodeTitle}>Get Your Free Admit Card</h3>
            <p style={styles.qrCodeDescription}>Scan the QR code to download your admit card instantly</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Brochure Slider */}
      {renderBrochureSlider()}

      <div style={styles.coursesSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100 
          }}
          style={styles.sectionHeader}
        >
          <motion.span
            animate={{
              scale: [1, 1.02, 1],
              textShadow: [
                "0px 0px 0px rgba(30, 58, 138, 0)",
                "0px 0px 10px rgba(30, 58, 138, 0.3)",
                "0px 0px 0px rgba(30, 58, 138, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={styles.sectionHeaderText}
          >
            COURSES
          </motion.span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={styles.sectionHeaderUnderline}
          />
        </motion.div>
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p style={styles.errorMessage}>{error}</p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={styles.coursesGrid}
          >
            {displayCourses.slice(0, 3).map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                style={styles.courseCard}
                onClick={() => handleCourseClick(course)}
              >
                <div style={styles.courseImageWrapper}>
                  <div style={styles.courseImageContainer}>
                    <img
                      src={course.imageUrl || `https://via.placeholder.com/400x250?text=${course.mainTopic}`}
                      alt={course.mainTopic}
                      style={styles.courseImage}
                      onError={(e) => { e.target.src = `https://via.placeholder.com/400x250?text=${course.mainTopic}`; }}
                    />
                  </div>
                </div>
                <div style={styles.courseContent}>
                  <div style={styles.courseHeader}>
                    <h3 style={styles.courseTitle}>{course.mainTopic}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        <motion.button
          whileHover={{ 
            scale: 1.02,
            backgroundColor: '#233876',
            boxShadow: '0 5px 15px rgba(30, 58, 138, 0.3)'
          }}
          whileTap={{ scale: 0.98 }}
          style={styles.viewAllButton}
          onClick={() => handleNavClick('courses')}
        >
          View All Courses
        </motion.button>
      </div>

      {/* Reviews Section */}
      <div style={styles.reviewsSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.reviewsContainer}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={styles.reviewsTitle}
          >
            What Our Students Say
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={styles.reviewsWrapper}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReviewIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                style={styles.reviewCard}
              >
                <div style={styles.reviewHeader}>
                  <img
                    src={reviews[currentReviewIndex].image}
                    alt={reviews[currentReviewIndex].name}
                    style={styles.reviewerImage}
                  />
                  <div style={styles.reviewerInfo}>
                    <h3 style={styles.reviewerName}>{reviews[currentReviewIndex].name}</h3>
                    <div style={styles.reviewStars}>
                      {"★".repeat(reviews[currentReviewIndex].rating)}
                      {"☆".repeat(5 - reviews[currentReviewIndex].rating)}
                    </div>
                    <p style={styles.reviewDate}>{reviews[currentReviewIndex].date}</p>
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={styles.reviewText}
                >
                  {reviews[currentReviewIndex].review}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </>
  );

  const renderCourses = () => {
    if (selectedCourse) {
      return renderFeatureCard();
    }

    return (
      <div style={styles.coursesPageContainer}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.coursesPageTitle}
        >
          Our Courses
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.coursesPageSubtitle}
        >
          Explore our comprehensive range of technology courses designed to help you succeed
        </motion.p>
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p style={styles.errorMessage}>{error}</p>
        ) : (
          <motion.div style={styles.coursesPageGrid}>
            {displayCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                style={styles.courseCard}
                onClick={() => handleCourseClick(course)}
              >
                <div style={styles.courseImageWrapper}>
                  <div style={styles.courseImageContainer}>
                    <img
                      src={course.imageUrl || `https://via.placeholder.com/400x250?text=${course.mainTopic}`}
                      alt={course.mainTopic}
                      style={styles.courseImage}
                      onError={(e) => { e.target.src = `https://via.placeholder.com/400x250?text=${course.mainTopic}`; }}
                    />
                  </div>
                </div>
                <div style={styles.courseContent}>
                  <div style={styles.courseHeader}>
                    <h3 style={styles.courseTitle}>{course.mainTopic}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  const renderAbout = () => (
    <div style={styles.aboutContainer}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.aboutHeader}
      >
        <h2 style={styles.aboutTitle}>
          About <span style={styles.aboutTitleHighlight}>CSC</span>
        </h2>
        <div style={styles.aboutTitleDecoration}></div>
        <p style={styles.aboutSubheading}>
          Computer Software College Kumarapalayam
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={styles.certificationBadge}
          >
            ISO 9001:2015 Certified
          </motion.span>
        </p>
      </motion.div>

      {/* Update the grid layout for better mobile responsiveness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={styles.aboutContent}
      >
        <div style={styles.aboutGrid}>
          {[
            {
              icon: "🏢",
              title: "Who We Are",
              content: <div>
                Welcome to <strong>CSC Computer Education Kumarapalayam</strong>, an{' '}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  style={styles.highlightedText}
                >
                  ISO 9001:2015 Certified Institution
                </motion.span>{' '}
                dedicated to empowering students with cutting-edge technology education.
              </div>
            },
            {
              icon: "📍",
              title: "Location",
              content: "VASAVI COMPLEX, 132, Salem Main Road, Near OVK Petrol Bunk, Nadaraja Nagar, Komarapalayam - 638183, Tamil Nadu, India."
            },
            {
              icon: "⭐",
              title: "Rating",
              content: <motion.div 
                style={styles.ratingContainer}
                whileHover={{ scale: 1.02 }}
              >
                <div style={styles.ratingStars}>★★★★★</div>
                <motion.div 
                  style={styles.ratingBox}
                  whileHover={{ backgroundColor: '#ffde59', color: '#1e3a8a' }}
                >
                  <span style={styles.ratingScore}>4.8</span>
                  <span style={styles.ratingCount}>(200+ Google reviews)</span>
                </motion.div>
              </motion.div>
            },
            {
              icon: "📞",
              title: "Contact & Hours",
              content: <p style={styles.aboutText}>
                <strong>Phone:</strong> 9942725757<br />
                <strong>Hours:</strong> 9 AM - 8 PM(Working days)<br/>
              </p>
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2 * index,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -1, 1, -1, 0],
                transition: { duration: 0.2 }
              }}
              style={styles.aboutInfoSection}
            >
              <div style={styles.aboutIconSection}>
                <span style={styles.aboutIcon}>{item.icon}</span>
                <h3 style={styles.aboutSectionTitle}>{item.title}</h3>
              </div>
              <div style={styles.aboutContent}>
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div style={styles.whyChooseSection}>
          <h3 style={styles.whyChooseTitle}>Why Choose CSC?</h3>
          <div style={styles.whyChooseGrid}>
            {[
              { icon: "🎯", title: "Prime Location", text: "Heart of Komarapalayam" },
              { icon: "👥", title: "Expert Faculty", text: "Dedicated teaching staff" },
              { icon: "💡", title: "Modern Facilities", text: "State-of-the-art infrastructure" },
              { icon: "🎓", title: "Career Support", text: "Placement assistance" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -2, 2, -2, 0],
                  transition: { duration: 0.3 }
                }}
                style={styles.whyChooseCard}
              >
                <motion.span
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={styles.whyChooseIcon}
                >
                  {item.icon}
                </motion.span>
                <h4 style={styles.whyChooseCardTitle}>{item.title}</h4>
                <p style={styles.whyChooseCardText}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    if (selectedCourse && activeSection === 'home') {
      return renderFeatureCard();
    }
    switch (activeSection) {
      case 'home':
        return renderHome();
      case 'courses':
        return renderCourses();
      case 'about':
        return renderAbout();
      default:
        return renderHome();
    }
  };

  const renderBrochureSlider = () => (
    <div style={styles.brochureSliderContainer}>
      <div style={styles.sliderButtonWrapper}>
        <motion.button
          whileHover={{ 
            scale: 1.1,
            backgroundColor: '#233876',
            boxShadow: '0 0 20px rgba(30, 58, 138, 0.4)'
          }}
          whileTap={{ scale: 0.9, backgroundColor: '#1e3a8a' }}
          style={styles.sliderButton}
          onClick={() => handleBrochureClick('prev')}
        >
          <motion.span
            animate={{
              x: [-3, 0, -3],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ←
          </motion.span>
        </motion.button>
      </div>

      <div style={styles.brochureWrapper}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentBrochureIndex}
            src={brochureImages[currentBrochureIndex]}
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              transition: {
                duration: 0.5,
                ease: "easeOut"
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              rotateY: 10,
              transition: {
                duration: 0.3,
                ease: "easeIn"
              }
            }}
            style={styles.brochureImage}
            alt={`Brochure ${currentBrochureIndex + 1}`}
          />
        </AnimatePresence>
      </div>

      <div style={styles.sliderButtonWrapper}>
        <motion.button
          whileHover={{ 
            scale: 1.1,
            backgroundColor: '#233876',
            boxShadow: '0 0 20px rgba(30, 58, 138, 0.4)'
          }}
          whileTap={{ scale: 0.9, backgroundColor: '#1e3a8a' }}
          style={styles.sliderButton}
          onClick={() => handleBrochureClick('next')}
        >
          <motion.span
            animate={{
              x: [3, 0, 3],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoText}>CSC</span>
          <div style={styles.logoSubtext}>
            <div>COMPUTER SOFTWARE COLLEGE</div>
            <div style={styles.logoSmallText}>AN ISO 9001:2015 CERTIFIED INSTITUTION</div>
          </div>
        </div>
        
        <nav style={{
          ...styles.nav,
          display: windowWidth <= 900 ? 'none' : 'flex'
        }}>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ 
              scale: 1.05,
              color: '#ffde59',
              textShadow: '0 0 8px rgba(255, 222, 89, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...styles.navItem,
              ...(activeSection === 'home' ? styles.activeNavItem : {}),
              ...styles.navItemHome
            }}
            onClick={() => handleNavClick('home')}
          >
            <motion.span
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ display: 'inline-block' }}
            >
              🏢
            </motion.span>
            {" HOME"}
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ 
              scale: 1.05,
              color: '#ffde59',
              textShadow: '0 0 8px rgba(255, 222, 89, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...styles.navItem,
              ...(activeSection === 'courses' ? styles.activeNavItem : {}),
              ...styles.navItemCourses
            }}
            onClick={() => handleNavClick('courses')}
          >
            <motion.span
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ display: 'inline-block' }}
            >
              📚
            </motion.span>
            {" COURSES"}
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ 
              scale: 1.05,
              color: '#ffde59',
              textShadow: '0 0 8px rgba(255, 222, 89, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...styles.navItem,
              ...(activeSection === 'about' ? styles.activeNavItem : {}),
              ...styles.navItemAbout
            }}
            onClick={() => handleNavClick('about')}
          >
            <motion.span
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ display: 'inline-block' }}
            >
              📋
            </motion.span>
            {" ABOUT"}
          </motion.div>
        </nav>
        
        <div 
          style={{
            ...styles.hamburgerMenu,
            display: windowWidth <= 900 ? 'flex' : 'none'
          }}
          onClick={toggleMobileMenu}
          role="button"
          tabIndex={0}
        >
          <div style={{
            ...styles.hamburgerLine,
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></div>
          <div style={{
            ...styles.hamburgerLine,
            opacity: mobileMenuOpen ? 0 : 1
          }}></div>
          <div style={{
            ...styles.hamburgerLine,
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'
          }}></div>
        </div>
      </header>
      
      {/* Add Scrolling Advertisement Banner */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.scrollingAd}
      >
        <div style={styles.scrollingAdContent}>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            style={styles.scrollingText}
          >
            🎉 SAT Exam 2025 - March 27th - 75% Scholarship Offer! Limited Time Only! 🎉 &nbsp;&nbsp;&nbsp;&nbsp;
          </motion.div>
        </div>
      </motion.div>

      {/* Update mobile menu styles inline */}
      <AnimatePresence>
        {mobileMenuOpen && windowWidth <= 900 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              ...styles.mobileNavMenu,
              display: 'flex' // Override display property when menu is open
            }}
          >
            <motion.div
              whileHover={{ x: 10 }}
              style={{
                ...styles.mobileNavItem,
                ...(activeSection === 'home' ? styles.activeMobileNavItem : {})
              }}
              onClick={() => handleNavClick('home')}
            >
              🏢 HOME
            </motion.div>
            <motion.div
              whileHover={{ x: 10 }}
              style={{
                ...styles.mobileNavItem,
                ...(activeSection === 'courses' ? styles.activeMobileNavItem : {})
              }}
              onClick={() => handleNavClick('courses')}
            >
              📚 COURSES
            </motion.div>
            <motion.div
              whileHover={{ x: 10 }}
              style={{
                ...styles.mobileNavItem,
                ...(activeSection === 'about' ? styles.activeMobileNavItem : {})
              }}
              onClick={() => handleNavClick('about')}
            >
              📋 ABOUT
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <main style={styles.main}>
          {renderContent()}
        </main>
      </AnimatePresence>

      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerLogo}>
            <div style={styles.footerLogoText}>CSC</div>
            <p style={styles.footerDescription}>
              Computer Software College Kumarapalayam. An ISO 9001:2015 Certified Institution.
            </p>
          </div>
          <div style={styles.footerLinks}>
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>QUICK LINKS</h4>
              <ul style={styles.footerList}>
                <motion.li
                  whileHover={{ color: '#ffde59', x: 5 }}
                  style={styles.footerListItem}
                  onClick={() => handleNavClick('home')}
                >
                  Home
                </motion.li>
                <motion.li
                  whileHover={{ color: '#ffde59', x: 5 }}
                  style={styles.footerListItem}
                  onClick={() => handleNavClick('courses')}
                >
                  Courses
                </motion.li>
                <motion.li
                  whileHover={{ color: '#ffde59', x: 5 }}
                  style={styles.footerListItem}
                  onClick={() => handleNavClick('about')}
                >
                  About
                </motion.li>
                <motion.li
                  whileHover={{ color: '#ffde59', x: 5 }}
                  style={styles.footerListItem}
                >
                  Contact
                </motion.li>
              </ul>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>CONTACT US</h4>
              <div style={styles.contactInfo}>
                <motion.div
                  whileHover={{ color: '#ffde59', x: 5 }}
                  style={styles.contactItem}
                >
                  <span style={styles.contactIcon}>✉️</span>
                  <span>{contactInfo.email}</span>
                </motion.div>
                <motion.div
                  whileHover={{ color: '#ffde59', x: 5 }}
                  style={styles.contactItem}
                >
                  <span style={styles.contactIcon}>📞</span>
                  <span>{contactInfo.phone}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© 2025 Computer Software College. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Export the component
//

const styles = {
  container: {
    fontFamily: "'Roboto', Arial, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: '#f2f2f2',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  header: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: window.innerWidth <= 900 ? '200px' : 'auto',
  },
  logoText: {
    fontSize: window.innerWidth <= 900 ? '1.6rem' : '2rem',
    fontWeight: 'bold',
    marginRight: window.innerWidth <= 900 ? '8px' : '12px',
    color: '#ffde59',
  },
  logoSubtext: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: window.innerWidth <= 900 ? '0.7rem' : '0.8rem',
  },
  logoSmallText: {
    fontSize: window.innerWidth <= 900 ? '0.55rem' : '0.65rem',
    opacity: 0.8,
  },
  nav: {
    display: 'flex',
    gap: '2.5rem',
    '@media screen and (max-width: 900px)': {
      display: 'none',
    },
  },
  navItem: {
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    letterSpacing: '1px',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  navItemHome: {
    background: 'linear-gradient(45deg, rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.6))',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      background: 'linear-gradient(45deg, rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.7))',
      border: '1px solid rgba(255, 222, 89, 0.3)',
      boxShadow: '0 4px 20px rgba(255, 222, 89, 0.2)',
    },
  },
  navItemCourses: {
    background: 'linear-gradient(45deg, rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.6))',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      background: 'linear-gradient(45deg, rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.7))',
      border: '1px solid rgba(255, 222, 89, 0.3)',
      boxShadow: '0 4px 20px rgba(255, 222, 89, 0.2)',
    },
  },
  activeNavItem: {
    borderBottom: '2px solid #ffde59',
    color: '#ffde59',
    background: 'linear-gradient(45deg, rgba(30, 58, 138, 1), rgba(30, 58, 138, 0.8))',
    boxShadow: '0 4px 20px rgba(255, 222, 89, 0.15)',
  },
  navItemAbout: {
    background: 'linear-gradient(45deg, rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.6))',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      background: 'linear-gradient(45deg, rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.7))',
      border: '1px solid rgba(255, 222, 89, 0.3)',
      boxShadow: '0 4px 20px rgba(255, 222, 89, 0.2)',
    },
  },
  hamburgerMenu: {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '30px',
    height: '24px',
    cursor: 'pointer',
    zIndex: 1001,
    '@media screen and (max-width: 900px)': {
      display: 'flex',
    },
  },
  hamburgerLine: {
    width: '100%',
    height: '3px',
    backgroundColor: 'white',
    borderRadius: '3px',
    transition: 'all 0.3s ease',
  },
  mobileNavMenu: {
    position: 'fixed',
    top: '80px',
    left: 0,
    right: 0,
    backgroundColor: '#1e3a8a',
    padding: '1rem',
    display: 'none', // Default to none
    flexDirection: 'column',
    gap: '0.5rem',
    zIndex: 999,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    '@media screen and (max-width: 900px)': {
      display: 'none', // Remove mobileMenuOpen reference
    },
  },
  mobileNavItem: {
    color: 'white',
    padding: '1rem 1.5rem',
    fontSize: '1.1rem',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#ffde59',
    },
  },
  activeMobileNavItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffde59',
    borderLeft: '4px solid #ffde59',
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  hero: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 1.2rem',
    lineHeight: '1.3',
  },
  subtitle: {
    fontSize: '1.8rem',
    fontWeight: 'normal',
    margin: '0 0 1.2rem',
    lineHeight: '1.4',
  },
  highlight: {
    color: '#ffde59',
  },
  quote: {
    fontSize: '1.1rem',
    margin: '0 auto 2.5rem',
    maxWidth: '700px',
    opacity: 0.9,
    lineHeight: '1.6',
  },
  exploreButton: {
    backgroundColor: '#ffde59',
    color: '#1e3a8a',
    border: 'none',
    padding: '0.9rem 2.2rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 10px rgba(255, 222, 89, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transform: 'translateX(-100%)',
    },
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '5rem',
    backgroundColor: '#1e3a8a',
    padding: '2.5rem 1rem',
    width: '100%',
    boxSizing: 'border-box',
    flexWrap: 'wrap', // Add this to allow wrapping on smaller screens
    '@media (max-width: 768px)': {
      gap: '2rem',
      padding: '2rem 1rem',
      flexDirection: 'column', // Stack items vertically on mobile
      alignItems: 'center', // Center items horizontally
    },
    '@media (max-width: 480px)': {
      padding: '1.5rem 0.5rem',
      gap: '1.5rem',
    }
  },
  statItem: {
    textAlign: 'center',
    color: 'white',
    minWidth: '120px',
    perspective: '1000px',
    transformStyle: 'preserve-3d',
    '@media (max-width: 768px)': {
      width: '100%', // Full width on mobile
      maxWidth: '250px', // Limit maximum width
      padding: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)', // Add subtle background
      borderRadius: '12px', // Add rounded corners
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add subtle shadow
    }
  },
  statIcon: {
    fontSize: '3rem',
    marginBottom: '0.8rem',
    '@media (max-width: 768px)': {
      fontSize: '2.5rem',
      marginBottom: '0.6rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem',
      marginBottom: '0.4rem'
    }
  },
  statCount: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ffde59',
    '@media (max-width: 768px)': {
      fontSize: '1.6rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.4rem'
    }
  },
  statLabel: {
    fontSize: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem'
    }
  },
  coursesSection: {
    padding: '6rem 2rem 4rem',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    '@media (max-width: 768px)': {
      padding: '4rem 1.5rem 3rem',
    },
    '@media (max-width: 480px)': {
      padding: '3rem 1rem 2rem',
    },
  },
  sectionHeader: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '4rem',
    '@media (max-width: 768px)': {
      marginBottom: '3rem',
    },
    '@media (max-width: 480px)': {
      marginBottom: '2.5rem',
    },
  },
  sectionHeaderText: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    padding: '0.5rem 3rem',
    borderRadius: '15px',
    background: 'linear-gradient(135deg, rgba(255, 222, 89, 0.15), rgba(30, 58, 138, 0.1))',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    border: '2px solid rgba(255, 222, 89, 0.3)',
    '@media (max-width: 1024px)': {
      fontSize: '3rem',
      padding: '0.5rem 2.5rem',
      letterSpacing: '3px',
    },
    '@media (max-width: 768px)': {
      fontSize: '2.5rem',
      padding: '0.4rem 2rem',
      letterSpacing: '2px',
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem',
      padding: '0.3rem 1.5rem',
      letterSpacing: '1px',
    },
  },
  sectionHeaderUnderline: {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    height: '4px',
    background: 'linear-gradient(90deg, transparent, #ffde59, transparent)',
    borderRadius: '2px',
    '@media (max-width: 768px)': {
      height: '3px',
      bottom: '-8px',
    },
    '@media (max-width: 480px)': {
      height: '2px',
      bottom: '-6px',
    },
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '350px',
    margin: '0 auto',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
    '@media (max-width: 768px)': {
      maxHeight: '300px',
    },
    '@media (max-width: 480px)': {
      maxHeight: '250px',
    }
  },
  courseImageWrapper: {
    position: 'relative',
    width: '100%',
    paddingTop: '60%',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      paddingTop: '50%',
    },
    '@media (max-width: 480px)': {
      paddingTop: '45%',
    }
  },
  courseImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  courseImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  courseContent: {
    padding: '1.2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60px',
    backgroundColor: 'white',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 768px)': {
      padding: '1rem',
      minHeight: '50px',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '@media (max-width: 480px)': {
      padding: '0.8rem',
      minHeight: '45px',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  courseHeader: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    '@media (max-width: 480px)': {
      textAlign: 'center',
    }
  },
  courseTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    width: '100%',
    '@media (max-width: 768px)': {
      fontSize: '1.1rem',
      lineHeight: '1.3',
      padding: '0.3rem 0',
      display: 'block',
      width: '100%',
      color: '#1e3a8a',
      textAlign: 'center'
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem',
      lineHeight: '1.2',
      padding: '0.2rem 0',
      display: 'block',
      width: '100%',
      color: '#1e3a8a',
      textAlign: 'center'
    }
  },
  viewAllButton: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    padding: '0.9rem 2.2rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '3rem',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 10px rgba(30, 58, 138, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: '#233876',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
  footer: {
    backgroundColor: '#0f1f47',
    color: 'white',
    padding: '4rem 2rem 1.5rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '3rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerLogo: {
    maxWidth: '350px',
  },
  footerLogoText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#ffde59',
    marginBottom: '1.2rem',
  },
  footerDescription: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    margin: 0,
  },
  footerLinks: {
    display: 'flex',
    gap: '5rem',
    flexWrap: 'wrap',
  },
  footerSection: {
    minWidth: '160px',
  },
  footerTitle: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerListItem: {
    margin: '0.6rem 0',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
  },
  contactIcon: {
    fontSize: '1.3rem',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '3rem',
    paddingTop: '2rem',
    textAlign: 'center',
  },
  copyright: {
    fontSize: '0.85rem',
    margin: 0,
    opacity: 0.7,
  },
  featureCardContainer: {
    padding: '3rem 2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#1e3a8a',
    border: 'none',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2.5rem',
    transition: 'all 0.3s ease',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: 'rgba(30, 58, 138, 0.05)',
    },
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column', // Change to column
    width: '100%',
  },
  featureImageWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  featureImage: {
    width: '100%',
    height: 'auto', // Ensure the image maintains its aspect ratio
    objectFit: 'cover',
  },
  featureContent: {
    padding: '2rem',
    backgroundColor: '#fff',
  },
  featureTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3a8a', // Main topic color
    marginBottom: '1.2rem',
  },
  featureText: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  featureSectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '2rem 0 1.2rem',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  featureListItem: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
    position: 'relative',
    lineHeight: '1.6',
  },
  subtopic: {
    color: '#ffde59', // Subtopic color
    fontWeight: 'bold',
  },
  content: {
    color: '#666', // Content color
  },
  enrollButton: {
    backgroundColor: '#ffde59',
    color: '#1e3a8a',
    border: 'none',
    padding: '0.9rem 2.2rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '2.5rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 10px rgba(255, 222, 89, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  },
  coursesPageContainer: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  coursesPageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '0.8rem',
    textAlign: 'center',
  },
  coursesPageSubtitle: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '3.5rem',
    textAlign: 'center',
    lineHeight: '1.6',
  },
  coursesPageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    width: '100%',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    },
  },
  aboutContainer: {
    padding: '2rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '1.5rem 1rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
    },
  },
  aboutHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
    padding: '0 1rem',
    '@media (max-width: 768px)': {
      marginBottom: '2rem',
    },
    '@media (max-width: 480px)': {
      marginBottom: '1.5rem',
    },
  },
  aboutTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    margin: '0',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.8rem',
    },
  },
  aboutTitleHighlight: {
    color: '#ffde59',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  aboutTitleDecoration: {
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #ffde59, #1e3a8a)',
    margin: '1rem auto',
    borderRadius: '2px',
  },
  aboutSubheading: {
    fontSize: '1.2rem',
    color: '#666',
    margin: '1rem 0 0 0',
    '@media (max-width: 768px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    },
  },
  aboutContent: {
    backgroundColor: 'transparent', // Change to transparent
    borderRadius: '15px',
    padding: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '0.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.25rem',
    },
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr', // Always show one card per row
    gap: '2rem',
    marginBottom: '3rem',
    width: '100%',
    maxWidth: '800px', // Add maximum width for better readability
    margin: '0 auto', // Center the grid
    padding: '0 1rem', // Add padding on the sides
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      gap: '1.5rem',
      padding: '0 0.8rem',
    },
    '@media (max-width: 480px)': {
      gap: '1rem',
      padding: '0 0.5rem',
    }
  },
  aboutInfoSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    width: '100%',
    boxSizing: 'border-box',
    margin: '0 auto', // Center each section
    '@media (max-width: 768px)': {
      padding: '1.5rem',
      width: '100%', // Ensure full width on mobile
      maxWidth: '100%', // Remove any max-width constraints
    },
    '@media (max-width: 480px)': {
      padding: '1.25rem',
    }
  },
  aboutIconSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    '@media (max-width: 480px)': {
      gap: '0.75rem',
      marginBottom: '0.75rem'
    }
  },
  aboutIcon: {
    fontSize: '2.5rem',
    color: '#1e3a8a',
    '@media (max-width: 480px)': {
      fontSize: '2rem'
    }
  },
  aboutSectionTitle: {
    fontSize: '1.5rem',
    color: '#1e3a8a',
    fontWeight: 'bold',
    margin: 0,
    '@media (max-width: 480px)': {
      fontSize: '1.25rem'
    }
  },
  aboutText: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
      lineHeight: '1.5'
    }
  },
  whyChooseSection: {
    marginTop: '2rem',
    width: '100%',
    '@media (max-width: 768px)': {
      marginTop: '1.5rem',
    },
  },
  whyChooseTitle: {
    fontSize: '2rem',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      fontSize: '1.75rem',
      marginBottom: '1.5rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.5rem',
      marginBottom: '1.25rem'
    }
  },
  whyChooseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Show 2 cards per row by default
    gap: '1.5rem',
    width: '100%',
    '@media (min-width: 1024px)': { // Four columns only on larger screens
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    '@media (max-width: 480px)': { // Single column only on very small screens
      gridTemplateColumns: '1fr',
      gap: '1rem',
    }
  },
  whyChooseCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 1024px)': {
      maxWidth: '600px', // Maximum width on mobile
      margin: '0 auto', // Center the cards
      padding: '1.25rem',
      },
    '@media (max-width: 480px)': {
      padding: '1rem',
    }
  },
  whyChooseIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    display: 'block',
    '@media (max-width: 768px)': {
      fontSize: '2.2rem',
      marginBottom: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem',
      marginBottom: '0.6rem',
    },
  },
  whyChooseCardTitle: {
    fontSize: '1.2rem',
    color: '#1e3a8a',
    margin: '0 0 0.5rem 0',
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
  },
  whyChooseCardText: {
    fontSize: '0.9rem',
    color: '#666',
    margin: '0',
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
    },
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    '@media (max-width: 480px)': {
      gap: '0.375rem'
    }
  },
  ratingStars: {
    color: '#ffde59',
      fontSize: '1.5rem',
    '@media (max-width: 480px)': {
      fontSize: '1.25rem'
    }
  },
  ratingBox: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'center',
    width: 'fit-content',
    '@media (max-width: 480px)': {
      padding: '0.375rem 0.75rem',
      gap: '0.375rem'
    }
  },
  ratingScore: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    '@media (max-width: 480px)': {
      fontSize: '1.1rem'
    }
  },
  ratingCount: {
    fontSize: '0.9rem',
    '@media (max-width: 480px)': {
      fontSize: '0.8rem'
    }
  },
  certificationBadge: {
    display: 'inline-block',
    backgroundColor: '#ffde59',
    color: '#1e3a8a',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginLeft: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '@media (max-width: 768px)': {
      display: 'block',
      margin: '0.5rem auto',
      width: 'fit-content',
      fontSize: '0.8rem',
    },
  },
  highlightedText: {
    backgroundColor: '#ffde59',
    color: '#1e3a8a',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    display: 'inline-block',
    transition: 'all 0.3s ease',
  },
  advertisementSection: {
    padding: '2rem 1rem',
    backgroundColor: '#f8f9fa',
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '1.5rem 0.8rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem 0.5rem',
    }
  },
  adContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
    border: '4px solid #ffde59',
    '@media (max-width: 768px)': {
      padding: '1.5rem',
      borderRadius: '15px',
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
      borderRadius: '12px',
      border: '3px solid #ffde59',
    }
  },
  adContent: {
    width: '100%',
    textAlign: 'center',
  },
  adScholarshipContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '2rem',
    flexWrap: 'wrap', // Allow wrapping on smaller screens
    '@media (max-width: 768px)': {
      gap: '1rem',
      justifyContent: 'center', // Center items on mobile
      flexDirection: 'row', // Keep horizontal layout
    }
  },
  adScholarshipBox: {
    backgroundColor: '#ffde59',
    padding: '1.5rem',
    borderRadius: '10px',
    width: '200px',
    transition: 'all 0.3s ease',
    '@media (max-width: 768px)': {
      width: '160px', // Smaller width on mobile
      padding: '1rem',
      margin: '0', // Remove margin
      flexShrink: 0, // Prevent shrinking
    },
    '@media (max-width: 480px)': {
      width: '140px', // Even smaller on very small screens
      padding: '0.8rem',
    }
  },
  adScholarshipTitle: {
    color: '#1e3a8a',
    fontSize: '1.2rem',
    margin: '0 0 0.5rem 0',
    '@media (max-width: 768px)': {
      fontSize: '1.1rem',
    }
  },
  adScholarshipAmount: {
    color: '#ff0000',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0.5rem 0',
    display: 'inline-block',
    transformOrigin: 'center center',
    '@media (max-width: 768px)': {
      fontSize: '1.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.5rem',
    }
  },
  adScholarshipLabel: {
    color: '#1e3a8a',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    '@media (max-width: 768px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    }
  },
  adExamBox: {
    backgroundColor: '#ff0000',
    padding: '1.5rem',
    borderRadius: '10px',
    width: '200px',
    color: 'white',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px rgba(255, 0, 0, 0.2)',
    '@media (max-width: 768px)': {
      width: '160px', // Smaller width on mobile
      padding: '1rem',
      margin: '0', // Remove margin
      flexShrink: 0, // Prevent shrinking
    },
    '@media (max-width: 480px)': {
      width: '140px', // Even smaller on very small screens
      padding: '0.8rem',
    }
  },
  adExamLabel: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    },
  },
  adExamDate: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem',
      marginBottom: '0.3rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.3rem',
    }
  },
  adExamDay: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    '@media (max-width: 768px)': {
      fontSize: '1.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.5rem',
    }
  },
  adHeaderContainer: {
    textAlign: 'center',
    marginBottom: '2rem',
    position: 'relative',
    padding: '0.5rem 0',
    '@media (max-width: 768px)': {
      marginBottom: '1.5rem',
    },
    '@media (max-width: 480px)': {
      marginBottom: '1rem',
    },
  },
  adMainTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    margin: '0',
    padding: '0.5rem 0',
    position: 'relative',
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    transformOrigin: 'center center',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
      letterSpacing: '1.5px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.5rem',
      letterSpacing: '1px',
    },
  },
  adTitleDecoration: {
    width: '60px',
    height: '3px',
  },
  '@media (max-width: 768px)': {
    container: {
      width: '100%',
      overflowX: 'hidden',
    },
    header: {
      padding: '1rem 1.5rem',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      boxSizing: 'border-box',
    },
    logo: {
      marginBottom: '0',
    },
    logoText: {
      fontSize: '1.6rem',
    },
    logoSubtext: {
      fontSize: '0.65rem',
    },
    logoSmallText: {
      fontSize: '0.5rem',
    },
    nav: {
      display: 'none',
    },
    hamburgerMenu: {
      display: 'flex',
    },
    mobileNav: {
      display: 'flex',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
    activeNavItem: {
      borderBottom: 'none',
      color: '#ffde59',
    },
    hero: {
      padding: '2rem 1.5rem',
      width: '100%',
      boxSizing: 'border-box',
    },
    title: {
      fontSize: '1.8rem',
      lineHeight: '1.4',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.3rem',
      lineHeight: '1.5',
      marginBottom: '1rem',
    },
    quote: {
      fontSize: '0.95rem',
      maxWidth: '100%',
      lineHeight: '1.5',
      marginBottom: '1.5rem',
    },
    exploreButton: {
      padding: '0.8rem 2rem',
      fontSize: '0.9rem',
      minWidth: '180px',
    },
    statsContainer: {
      gap: '2rem',
      padding: '1.5rem 1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      boxSizing: 'border-box',
    },
    statItem: {
      minWidth: '100px',
    },
    statIcon: {
      fontSize: '2.5rem',
    },
    statCount: {
      fontSize: '1.5rem',
    },
    statLabel: {
      fontSize: '0.9rem',
    },
    coursesGrid: {
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      width: '100%',
    },
    coursesPageGrid: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      padding: '0 1rem',
    },
    courseCard: {
      maxWidth: '100%',
    },
    coursesSection: {
      padding: '2rem 1rem',
      width: '100%',
      boxSizing: 'border-box',
    },
    sectionHeader: {
      fontSize: '1rem',
      padding: '0.5rem 1.5rem',
    },
    viewAllButton: {
      padding: '0.8rem 2rem',
      fontSize: '0.9rem',
      width: 'auto',
      minWidth: '200px',
    },
    footerTop: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '2rem',
    },
    footerLinks: {
      gap: '2rem',
      flexDirection: 'column',
    },
    footerLogo: {
      maxWidth: '100%',
    },
    footerLogoText: {
      fontSize: '1.6rem',
    },
    footerDescription: {
      fontSize: '0.9rem',
    },
    footerTitle: {
      fontSize: '0.9rem',
    },
    footerListItem: {
      fontSize: '0.9rem',
    },
    contactItem: {
      fontSize: '0.9rem',
    },
    contactIcon: {
      fontSize: '1.2rem',
    },
    advertisementSection: {
      padding: '1rem',
    },
    adContainer: {
      padding: '1rem',
    },
    adMainTitle: {
      fontSize: '1.5rem',
      letterSpacing: '1px',
    },
    adTitleDecoration: {
      width: '50px',
      height: '3px',
    },
    aboutGrid: {
      gridTemplateColumns: '1fr',
    },
    whyChooseGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
    },
    aboutInfoSection: {
      padding: '1.5rem',
    },
  },
  '@media (max-width: 480px)': {
    container: {
      width: '100%',
      overflowX: 'hidden',
    },
    header: {
      padding: '0.8rem 1rem',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    logo: {
      marginBottom: '0',
    },
    logoText: {
      fontSize: '1.4rem',
    },
    logoSubtext: {
      fontSize: '0.55rem',
    },
    logoSmallText: {
      fontSize: '0.45rem',
    },
    nav: {
      display: 'none',
    },
    hamburgerMenu: {
      display: 'flex',
    },
    hero: {
      padding: '1.5rem 1rem',
    },
    title: {
      fontSize: '1.5rem',
      lineHeight: '1.3',
      marginBottom: '0.8rem',
    },
    subtitle: {
      fontSize: '1.1rem',
      lineHeight: '1.4',
      marginBottom: '0.8rem',
    },
    quote: {
      fontSize: '0.85rem',
      lineHeight: '1.5',
      marginBottom: '1.2rem',
    },
    exploreButton: {
      padding: '0.7rem 1.8rem',
      fontSize: '0.85rem',
      minWidth: '160px',
    },
    statsContainer: {
      gap: '1.5rem',
      padding: '1rem',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
    },
    statItem: {
      minWidth: '90px',
    },
    statIcon: {
      fontSize: '2rem',
    },
    statCount: {
      fontSize: '1.2rem',
    },
    statLabel: {
      fontSize: '0.8rem',
    },
    coursesSection: {
      padding: '1.5rem 1rem',
      width: '100%',
      boxSizing: 'border-box',
    },
    sectionHeader: {
      fontSize: '0.9rem',
      padding: '0.4rem 1.2rem',
    },
    courseCard: {
      maxWidth: '100%',
    },
    courseTitle: {
      fontSize: '1rem',
    },
    courseDescription: {
      fontSize: '0.85rem',
    },
    viewAllButton: {
      padding: '0.7rem 1.8rem',
      fontSize: '0.85rem',
      width: 'auto',
      minWidth: '180px',
    },
    footer: {
      padding: '2rem 1rem 1rem',
      width: '100%',
      boxSizing: 'border-box',
    },
    footerTop: {
      gap: '1.5rem',
    },
    footerLogoText: {
      fontSize: '1.4rem',
    },
    footerDescription: {
      fontSize: '0.85rem',
    },
    footerTitle: {
      fontSize: '0.85rem',
    },
    footerListItem: {
      fontSize: '0.85rem',
    },
    contactItem: {
      fontSize: '0.85rem',
    },
    contactIcon: {
      fontSize: '1.1rem',
    },
    copyright: {
      fontSize: '0.75rem',
    },
    advertisementSection: {
      padding: '0.8rem',
    },
    adContainer: {
      padding: '1rem',
    },
    adMainTitle: {
      fontSize: '1.5rem',
      letterSpacing: '1px',
    },
    adTitleDecoration: {
      width: '50px',
      height: '3px',
    },
    aboutGrid: {
      gridTemplateColumns: '1fr',
    },
    whyChooseGrid: {
      gridTemplateColumns: '1fr',
    },
    aboutTitle: {
      fontSize: '2rem',
    },
    aboutSubheading: {
      fontSize: '1rem',
    },
    whyChooseCard: {
      padding: '1.5rem',
    },
    coursesPageGrid: {
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      padding: '0 1rem',
    },
    courseContent: {
      padding: '1rem',
    },
  },
  qrCodeSection: {
    padding: '2rem 1rem',
    backgroundColor: '#ffffff',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      padding: '1.5rem 0.8rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem 0.5rem',
    }
  },
  qrCodeContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      padding: '1.5rem',
      gap: '1.5rem',
    }
  },
  qrCodeWrapper: {
    width: '200px',
    height: '200px',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      width: '180px',
      height: '180px',
    },
    '@media (max-width: 480px)': {
      width: '150px',
      height: '150px',
    }
  },
  qrCodeImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  qrCodeText: {
    textAlign: 'center',
    maxWidth: '300px',
  },
  qrCodeTitle: {
    fontSize: '1.8rem',
    color: '#1e3a8a',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.3rem',
    }
  },
  qrCodeDescription: {
    fontSize: '1.1rem',
    color: '#666',
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    }
  },
  scrollingAd: {
    backgroundColor: '#ffde59',
    color: '#1e3a8a',
    padding: '0.5rem 0',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    zIndex: 999,
  },
  scrollingAdContent: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  scrollingText: {
    whiteSpace: 'nowrap',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    padding: '0.5rem 0',
    display: 'inline-block',
    width: 'auto',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    }
  },
  reviewsSection: {
    padding: '2rem 1rem',
    backgroundColor: '#f8f9fa',
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '1.5rem 0.8rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem 0.5rem',
    }
  },
  reviewsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '1.5rem 0.8rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem 0.5rem',
    }
  },
  reviewsTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.8rem',
    }
  },
  reviewsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
    '@media (max-width: 480px)': {
      gap: '1rem',
    }
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    border: '2px solid rgba(255, 222, 89, 0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
      border: '2px solid #ffde59',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '6px',
      background: 'linear-gradient(90deg, #ffde59, #1e3a8a)',
      borderTopLeftRadius: '18px',
      borderTopRightRadius: '18px',
    },
    '@media (max-width: 768px)': {
      maxWidth: '600px',
      borderRadius: '15px',
      '&:before': {
        borderTopLeftRadius: '13px',
        borderTopRightRadius: '13px',
      },
    },
    '@media (max-width: 480px)': {
      maxWidth: '100%',
      borderRadius: '12px',
      '&:before': {
        height: '4px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
      },
    }
  },
  reviewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, rgba(255, 222, 89, 0.1) 0%, rgba(30, 58, 138, 0.05) 100%)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    '@media (max-width: 768px)': {
      padding: '1.5rem',
      gap: '1rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
      gap: '0.8rem',
    }
  },
  reviewerImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #ffde59',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      width: '60px',
      height: '60px',
    },
    '@media (max-width: 480px)': {
      width: '50px',
      height: '50px',
      border: '2px solid #ffde59',
    }
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    margin: '0 0 0.5rem 0',
    '@media (max-width: 768px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    }
  },
  reviewStars: {
    color: '#ffde59',
    fontSize: '1.2rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '0.3rem 0',
    '@media (max-width: 768px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    }
  },
  reviewDate: {
    fontSize: '0.9rem',
    color: '#666',
    margin: '0.3rem 0 0 0',
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    }
  },
  reviewText: {
    padding: '2rem',
    color: '#444',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    position: 'relative',
    '&:before': {
      content: '"""',
      position: 'absolute',
      top: '1rem',
      left: '2rem',
      fontSize: '4rem',
      color: 'rgba(30, 58, 138, 0.1)',
      fontFamily: 'Georgia, serif',
      lineHeight: '1',
    },
    '@media (max-width: 768px)': {
      padding: '1.5rem',
      fontSize: '1rem',
      '&:before': {
        fontSize: '3rem',
        top: '0.8rem',
        left: '1.5rem',
      },
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
      fontSize: '0.9rem',
      '&:before': {
        fontSize: '2.5rem',
        top: '0.6rem',
        left: '1rem',
      },
    }
  },
  qrAndBrochureContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    alignItems: 'center',
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
      padding: '1.5rem',
    },
    '@media (max-width: 768px)': {
      padding: '1rem',
      gap: '1.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
      gap: '1rem',
    }
  },
  brochureSliderContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '1000px',
    margin: '2rem auto 4rem',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    '@media (max-width: 768px)': {
      margin: '1rem auto 3.5rem',
      gap: '0.3rem',
      padding: '0 2rem',
    }
  },
  sliderButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '44px', // Ensure minimum width for button container
    zIndex: 3,
    '@media (max-width: 768px)': {
      minWidth: '38px',
    },
    '@media (max-width: 480px)': {
      minWidth: '32px',
    }
  },
  brochureWrapper: {
    width: '100%',
    height: '450px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '20px',
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
    boxShadow: '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff',
    margin: '0 0.5rem', // Add margin to create space between buttons and image
    '@media (max-width: 1024px)': {
      height: '350px',
    },
    '@media (max-width: 768px)': {
      height: '280px',
      borderRadius: '15px',
      margin: '0 0.3rem', // Reduce margin on mobile
    },
    '@media (max-width: 480px)': {
      height: '220px',
      borderRadius: '12px',
    }
  },
  sliderButton: {
    backgroundColor: '#1e3a8a',
    background: 'linear-gradient(145deg, #233876, #1e3a8a)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.5rem',
    zIndex: 2,
    boxShadow: '4px 4px 8px rgba(0,0,0,0.2), -2px -2px 6px rgba(255,255,255,0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (max-width: 768px)': {
      width: '38px',
      height: '38px',
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      width: '32px',
      height: '32px',
      fontSize: '1rem',
    }
  },
  brochureImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '0.5rem',
    boxSizing: 'border-box',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    }
  },
  brochureDots: {
    position: 'absolute',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.6rem',
    zIndex: 2,
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    '@media (max-width: 480px)': {
      padding: '0.3rem 0.6rem',
      gap: '0.4rem',
      bottom: '0.5rem' // Moved up slightly on mobile
    }
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid #1e3a8a',
    background: 'white',
    '&:hover': {
      transform: 'scale(1.2)',
      backgroundColor: '#ffde59',
    },
    '@media (max-width: 480px)': {
      width: '8px',
      height: '8px',
    }
  },
};

export default Home;