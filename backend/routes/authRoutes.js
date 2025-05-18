const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController')

const userController = require('../controllers/userProfileController');

//middleware
// router.use(
//     cors({
//         credentials: true,
//         origin: 'http://localhost:5173'
//     })
// )

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser);

// User Profile section
// router.post('/', userController.createUser);
// router.get('/', userController.getAllUsers);


// Create a new user
router.post('/create_user', userController.createUser);

// Get all users
router.get('/get_users', userController.getAllUsers);
// Get a specific user profile
router.get('/user_profile/:id', userController.getUserById);

// Update a user profile
router.post('/edit_profile/:id', userController.updateUser);

// Delete a user profile
router.post('/delete_profile/:id', userController.deleteUser);

module.exports = router