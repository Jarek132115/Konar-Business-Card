const { hashPassword, comparePassword } = require('../helpers/auth');
const User = require('../models/user')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

// Register
const registerUser = async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
  
      if (!name) return res.json({ error: 'Name is required' });
      if (!email) return res.json({ error: 'Email is required' });
      if (!password || password.length < 8)
        return res.json({ error: 'Password must be at least 8 characters' });
      if (password !== confirmPassword)
        return res.json({ error: 'Passwords do not match' });
  
      const exist = await User.findOne({ email });
      if (exist) return res.json({ error: 'Email is already taken' });
  
      const hashedPassword = await hashPassword(password);
      const user = await User.create({ name, email, password: hashedPassword });
  
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Registration failed. Try again.' });
    }
  };

//Login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'No user found'
            })
        }
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match) {
            res.json({
                error: 'Passwords dont match'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  };

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}