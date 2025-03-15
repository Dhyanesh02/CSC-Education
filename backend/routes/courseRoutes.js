const express = require('express');
const { createCourse, updateCourse, deleteCourse, getAllCourses  } = require('../controllers/courseController');
const upload = require('../middleware/multerConfig');
const router = express.Router();


// Create a new course
router.post('/admin/courses/create', upload.single('image'), createCourse);

// Update a course by mainTopic
router.put('/admin/courses/update/:mainTopic', upload.single('image'), updateCourse);

// Delete a course by mainTopic
router.delete('/admin/courses/delete/:mainTopic', deleteCourse);

// Get all courses
router.get('/courses', getAllCourses);

module.exports = router;