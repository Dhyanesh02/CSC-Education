import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [mainTopic, setMainTopic] = useState('');
  const [image, setImage] = useState(null);
  const [about, setAbout] = useState('');
  const [googleFormLink, setGoogleFormLink] = useState('');
  const [curriculum, setCurriculum] = useState([{ subtopic: '', content: '' }]);
  const [updateAbout, setUpdateAbout] = useState('');
  const [updateImage, setUpdateImage] = useState(null);
  const [updateCurriculum, setUpdateCurriculum] = useState([{ subtopic: '', content: '' }]);
  const [updateMainTopic, setUpdateMainTopic] = useState('');
  const [updateGoogleFormLink, setUpdateGoogleFormLink] = useState('');
  const [deleteMainTopic, setDeleteMainTopic] = useState('');
  const [availableTopics, setAvailableTopics] = useState([]);
  const [filteredUpdateTopics, setFilteredUpdateTopics] = useState([]);
  const [filteredDeleteTopics, setFilteredDeleteTopics] = useState([]);
  const [updateSearchTerm, setUpdateSearchTerm] = useState('');
  const [deleteSearchTerm, setDeleteSearchTerm] = useState('');
  const [showUpdateDropdown, setShowUpdateDropdown] = useState(false);
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        if (response.status === 200) {
          const topics = response.data.map(course => course.mainTopic);
          setAvailableTopics(topics);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (updateSearchTerm) {
      const filtered = availableTopics.filter(topic =>
        topic.toLowerCase().includes(updateSearchTerm.toLowerCase())
      );
      setFilteredUpdateTopics(filtered);
    } else {
      setFilteredUpdateTopics([]);
    }
  }, [updateSearchTerm, availableTopics]);

  useEffect(() => {
    if (deleteSearchTerm) {
      const filtered = availableTopics.filter(topic =>
        topic.toLowerCase().includes(deleteSearchTerm.toLowerCase())
      );
      setFilteredDeleteTopics(filtered);
    } else {
      setFilteredDeleteTopics([]);
    }
  }, [deleteSearchTerm, availableTopics]);

  const handleCurriculumChange = (index, field, value) => {
    const updatedCurriculum = [...curriculum];
    updatedCurriculum[index][field] = value;
    setCurriculum(updatedCurriculum);
  };

  const handleUpdateCurriculumChange = (index, field, value) => {
    const updatedCurriculum = [...updateCurriculum];
    updatedCurriculum[index][field] = value;
    setUpdateCurriculum(updatedCurriculum);
  };

  const addSubtopic = () => {
    setCurriculum([...curriculum, { subtopic: '', content: '' }]);
  };

  const addUpdateSubtopic = () => {
    setUpdateCurriculum([...updateCurriculum, { subtopic: '', content: '' }]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateImageChange = (e) => {
    setUpdateImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('mainTopic', mainTopic);
    formData.append('image', image);
    formData.append('about', about);
    formData.append('googleFormLink', googleFormLink);
    formData.append('curriculum', JSON.stringify(curriculum));

    try {
      const response = await axios.post('http://localhost:5000/api/admin/courses/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (response.status === 201) {
        toast.success('Course created successfully! 🎉', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setMainTopic('');
        setImage(null);
        setAbout('');
        setGoogleFormLink('');
        setCurriculum([{ subtopic: '', content: '' }]);
        const updatedTopics = [...availableTopics, mainTopic];
        setAvailableTopics(updatedTopics);
      }
    } catch (error) {
      toast.error(`Failed to create course: ${error.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const fetchCourseData = async (topic) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses`);
      if (response.status === 200) {
        const course = response.data.find(c => c.mainTopic === topic);
        if (course) {
          setUpdateAbout(course.about || '');
          setUpdateGoogleFormLink(course.googleFormLink || '');
          setUpdateCurriculum(course.curriculum || [{ subtopic: '', content: '' }]);
        }
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('about', updateAbout);
    formData.append('googleFormLink', updateGoogleFormLink);
    formData.append('curriculum', JSON.stringify(updateCurriculum));
    if (updateImage) formData.append('image', updateImage);

    try {
      const response = await axios.put(`http://localhost:5000/api/admin/courses/update/${updateMainTopic}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (response.status === 200) {
        toast.success('Course updated successfully! 🚀', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setUpdateMainTopic('');
        setUpdateSearchTerm('');
        setUpdateGoogleFormLink('');
        setUpdateImage(null);
        setUpdateAbout('');
        setUpdateCurriculum([{ subtopic: '', content: '' }]);
      }
    } catch (error) {
      toast.error(`Failed to update course: ${error.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/courses/delete/${deleteMainTopic}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (response.status === 200) {
        toast.success('Course deleted successfully! 🗑️', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setDeleteMainTopic('');
        setDeleteSearchTerm('');
        const updatedTopics = availableTopics.filter(topic => topic !== deleteMainTopic);
        setAvailableTopics(updatedTopics);
      }
    } catch (error) {
      toast.error(`Failed to delete course: ${error.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const selectUpdateTopic = (topic) => {
    setUpdateMainTopic(topic);
    setUpdateSearchTerm(topic);
    setShowUpdateDropdown(false);
    fetchCourseData(topic);
  };

  const selectDeleteTopic = (topic) => {
    setDeleteMainTopic(topic);
    setDeleteSearchTerm(topic);
    setShowDeleteDropdown(false);
  };

  const removeSubtopic = (index) => {
    const updatedCurriculum = curriculum.filter((_, i) => i !== index);
    setCurriculum(updatedCurriculum);
  };

  const removeUpdateSubtopic = (index) => {
    const updatedCurriculum = updateCurriculum.filter((_, i) => i !== index);
    setUpdateCurriculum(updatedCurriculum);
  };

  return (
    <div style={styles.dashboard}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          fontSize: '1rem',
          fontWeight: '500',
          borderRadius: '12px',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={styles.header}
      >
        <h1 style={styles.title}>Admin Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#e6c200', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          style={styles.logoutButton}
          onClick={logout}
        >
          Logout
        </motion.button>
      </motion.div>

      {/* Create Course Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={styles.createCourse}
      >
        <h2 style={styles.sectionTitle}>Create New Course</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Main Topic</label>
            <input
              type="text"
              value={mainTopic}
              onChange={(e) => setMainTopic(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Course Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>About This Course</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              style={{ ...styles.input, height: '100px' }}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Google Form Link</label>
            <input
              type="url"
              value={googleFormLink}
              onChange={(e) => setGoogleFormLink(e.target.value)}
              style={styles.input}
              placeholder="https://docs.google.com/forms/d/e/..."
            />
            <small style={styles.helperText}>
              Paste your Google Form link here. This will be used for student registrations.
            </small>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Curriculum</label>
            {curriculum.map((item, index) => (
              <div key={index} style={styles.curriculumItem}>
                <div style={styles.curriculumHeader}>
                  <input
                    type="text"
                    placeholder="Subtopic"
                    value={item.subtopic}
                    onChange={(e) => handleCurriculumChange(index, 'subtopic', e.target.value)}
                    style={styles.input}
                    required
                  />
                  {curriculum.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => removeSubtopic(index)}
                      style={styles.removeButton}
                      whileHover={{ scale: 1.05, backgroundColor: '#ff4d4d' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove
                    </motion.button>
                  )}
                </div>
                <textarea
                  placeholder="Content (can be points or paragraphs)"
                  value={item.content}
                  onChange={(e) => handleCurriculumChange(index, 'content', e.target.value)}
                  style={{ ...styles.input, height: '100px' }}
                  required
                />
              </div>
            ))}
            <motion.button
              type="button"
              onClick={addSubtopic}
              style={styles.addSubtopicButton}
              whileHover={{ scale: 1.05, backgroundColor: '#e6c200', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Add Subtopic
            </motion.button>
          </div>

          <div style={styles.buttonContainer}>
          <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e6c200', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              style={styles.actionButton}
            type="submit"
          >
            Create Course
          </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Update Course Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={styles.updateCourse}
      >
        <h2 style={styles.sectionTitle}>Update Course</h2>
        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Main Topic to Update</label>
            <div style={styles.searchContainer}>
              <input
                type="text"
                value={updateSearchTerm}
                onChange={(e) => {
                  setUpdateSearchTerm(e.target.value);
                  setShowUpdateDropdown(true);
                }}
                onFocus={() => setShowUpdateDropdown(true)}
                placeholder="Search for a topic..."
                style={styles.input}
                required
              />
              {showUpdateDropdown && filteredUpdateTopics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={styles.dropdown}
                >
                  {filteredUpdateTopics.map((topic, index) => (
                    <motion.div
                      key={index}
                      style={styles.dropdownItem}
                      onClick={() => selectUpdateTopic(topic)}
                      whileHover={{ backgroundColor: '#ffde59', color: '#1e3a8a' }}
                    >
                      {topic}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>New Course Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpdateImageChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>New About This Course</label>
            <textarea
              value={updateAbout}
              onChange={(e) => setUpdateAbout(e.target.value)}
              style={{ ...styles.input, height: '100px' }}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Google Form Link</label>
            <input
              type="url"
              value={updateGoogleFormLink}
              onChange={(e) => setUpdateGoogleFormLink(e.target.value)}
              style={styles.input}
              placeholder="https://docs.google.com/forms/d/e/..."
            />
            <small style={styles.helperText}>
              Paste your Google Form link here. This will be used for student registrations.
            </small>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>New Curriculum</label>
            {updateCurriculum.map((item, index) => (
              <div key={index} style={styles.curriculumItem}>
                <div style={styles.curriculumHeader}>
                  <input
                    type="text"
                    placeholder="Subtopic"
                    value={item.subtopic}
                    onChange={(e) => handleUpdateCurriculumChange(index, 'subtopic', e.target.value)}
                    style={styles.input}
                    required
                  />
                  {updateCurriculum.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => removeUpdateSubtopic(index)}
                      style={styles.removeButton}
                      whileHover={{ scale: 1.05, backgroundColor: '#ff4d4d' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove
                    </motion.button>
                  )}
                </div>
                <textarea
                  placeholder="Content (can be points or paragraphs)"
                  value={item.content}
                  onChange={(e) => handleUpdateCurriculumChange(index, 'content', e.target.value)}
                  style={{ ...styles.input, height: '100px' }}
                  required
                />
              </div>
            ))}
            <motion.button
              type="button"
              onClick={addUpdateSubtopic}
              style={styles.addSubtopicButton}
              whileHover={{ scale: 1.05, backgroundColor: '#e6c200', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Add Subtopic
            </motion.button>
          </div>

          <div style={styles.buttonContainer}>
          <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e6c200', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              style={styles.actionButton}
            type="submit"
          >
            Update Course
          </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Delete Course Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={styles.deleteCourse}
      >
        <h2 style={styles.sectionTitle}>Delete Course</h2>
        <form onSubmit={handleDelete} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Main Topic to Delete</label>
            <div style={styles.searchContainer}>
              <input
                type="text"
                value={deleteSearchTerm}
                onChange={(e) => {
                  setDeleteSearchTerm(e.target.value);
                  setShowDeleteDropdown(true);
                }}
                onFocus={() => setShowDeleteDropdown(true)}
                placeholder="Search for a topic..."
                style={styles.input}
                required
              />
              {showDeleteDropdown && filteredDeleteTopics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={styles.dropdown}
                >
                  {filteredDeleteTopics.map((topic, index) => (
                    <motion.div
                      key={index}
                      style={styles.dropdownItem}
                      onClick={() => selectDeleteTopic(topic)}
                      whileHover={{ backgroundColor: '#ffde59', color: '#1e3a8a' }}
                    >
                      {topic}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div style={styles.buttonContainer}>
          <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e6c200', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              style={styles.actionButton}
            type="submit"
          >
            Delete Course
          </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const styles = {
  dashboard: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #1e3a8a, #2b4cb5)',
    minHeight: '100vh',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      padding: '20px 10px',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '20px',
      padding: '15px',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
  },
  logoutButton: {
    padding: '12px 35px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)',
  },
  createCourse: {
    marginBottom: '40px',
    padding: '35px',
    borderRadius: '20px',
    backgroundColor: 'white',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    border: '1px solid rgba(0,0,0,0.05)',
    '@media (max-width: 768px)': {
      padding: '20px',
      borderRadius: '15px',
    },
  },
  updateCourse: {
    marginBottom: '40px',
    padding: '35px',
    borderRadius: '20px',
    backgroundColor: 'white',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    border: '1px solid rgba(0,0,0,0.05)',
    '@media (max-width: 768px)': {
      padding: '20px',
      borderRadius: '15px',
    },
  },
  deleteCourse: {
    marginBottom: '40px',
    padding: '35px',
    borderRadius: '20px',
    backgroundColor: 'white',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    border: '1px solid rgba(0,0,0,0.05)',
    '@media (max-width: 768px)': {
      padding: '20px',
      borderRadius: '15px',
    },
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '25px',
    borderBottom: '3px solid #ffde59',
    paddingBottom: '10px',
    display: 'inline-block',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem',
      marginBottom: '20px',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    '@media (max-width: 768px)': {
      gap: '15px',
    },
  },
  formGroup: {
    marginBottom: '25px',
    '@media (max-width: 768px)': {
      marginBottom: '20px',
    },
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: '600',
    fontSize: '1.1rem',
    color: '#1e3a8a',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      marginBottom: '8px',
    },
  },
  input: {
    width: '100%',
    padding: '15px 20px',
    marginBottom: '15px',
    border: '2px solid #e1e1e1',
    borderRadius: '12px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8f9fa',
    boxSizing: 'border-box',
    flex: 1,
    '@media (max-width: 768px)': {
      padding: '12px 15px',
      fontSize: '0.9rem',
      marginBottom: '10px',
    },
  },
  helperText: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginTop: '8px',
    fontStyle: 'italic',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      marginTop: '6px',
    },
  },
  curriculumItem: {
    marginBottom: '25px',
    padding: '20px',
    border: '2px solid #eef2ff',
    borderRadius: '15px',
    backgroundColor: '#f8faff',
    transition: 'all 0.3s ease',
    '& textarea': {
      marginTop: '10px',
    },
    '@media (max-width: 768px)': {
      padding: '15px',
      marginBottom: '20px',
    },
  },
  addSubtopicButton: {
    padding: '12px 25px',
    backgroundColor: '#ffde59',
    color: '#1e3a8a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 222, 89, 0.3)',
    marginTop: '10px',
    '@media (max-width: 768px)': {
      padding: '10px 20px',
      fontSize: '0.9rem',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '10px',
    },
  },
  actionButton: {
    padding: '15px 40px',
    backgroundColor: '#ffde59',
    color: '#1e3a8a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 222, 89, 0.3)',
    marginTop: '20px',
    '@media (max-width: 768px)': {
      padding: '12px 30px',
      fontSize: '1rem',
      width: '100%', // Full width on mobile
    },
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      marginBottom: '15px',
    },
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    maxHeight: '250px',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '2px solid #eef2ff',
    borderRadius: '12px',
    zIndex: 1000,
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    marginTop: '5px',
    '@media (max-width: 768px)': {
      maxHeight: '200px',
    },
  },
  dropdownItem: {
    padding: '15px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #eef2ff',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '12px 15px',
      fontSize: '0.9rem',
    },
  },
  curriculumHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '5px',
    },
  },
  removeButton: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(220, 53, 69, 0.3)',
    minWidth: '80px',
    '@media (max-width: 768px)': {
      padding: '6px 12px',
      fontSize: '0.8rem',
      width: '100%',
    },
  },
};

export default AdminDashboard;