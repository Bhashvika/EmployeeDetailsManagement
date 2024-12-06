const usermodel = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

// Login handler
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, msg: 'Username and password are required' });
    }

    try {
        const user = await usermodel.findOne({ username });
        
        if (!user) {
            return res.status(401).json({ success: false, msg: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, msg: 'Password does not match' });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, message: 'Login successful', token, username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
};

// Registration handler
const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const exist = await usermodel.findOne({ username });
        if (exist) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Please enter a stronger password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new usermodel({
            username,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({ success: true, message: 'User created successfully', token, username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
};

// Token creation function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { login, register };
