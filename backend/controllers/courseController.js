const Course = require('../models/Course');
const cloudinary = require('../cloudinary'); // Ensure Cloudinary is configured
const fs = require('fs'); // For file system operations

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { mainTopic, about, curriculum, googleFormLink } = req.body;
    const imageFile = req.file; // Multer adds this

    if (!imageFile) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'csc-website', // Optional: Organize files in a folder
    });

    // Delete the local file after upload
    fs.unlink(imageFile.path, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });

    // Parse curriculum if it's a string
    const parsedCurriculum = typeof curriculum === 'string' ? JSON.parse(curriculum) : curriculum;

    const newCourse = new Course({
      mainTopic,
      imageUrl: result.secure_url, // Save the Cloudinary URL
      about,
      googleFormLink,
      curriculum: parsedCurriculum,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Failed to create course', error: error.message });
  }
};

// Update a course by mainTopic
const updateCourse = async (req, res) => {
  try {
    const { mainTopic } = req.params;
    const { about, curriculum, googleFormLink } = req.body;
    const imageFile = req.file;

    let updateData = { about, curriculum, googleFormLink };

    if (imageFile) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'csc-website',
      });

      // Delete the local file after upload
      fs.unlink(imageFile.path, (err) => {
        if (err) console.error('Error deleting local file:', err);
      });

      updateData.imageUrl = result.secure_url;
    }

    // Parse curriculum if it's a string
    if (typeof curriculum === 'string') {
      updateData.curriculum = JSON.parse(curriculum);
    }

    const updatedCourse = await Course.findOneAndUpdate({ mainTopic }, updateData, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Failed to update course', error: error.message });
  }
};

// Delete a course by mainTopic
const deleteCourse = async (req, res) => {
  try {
    const { mainTopic } = req.params;
    const deletedCourse = await Course.findOneAndDelete({ mainTopic });

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully', course: deletedCourse });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};

module.exports = { createCourse, updateCourse, deleteCourse, getAllCourses };