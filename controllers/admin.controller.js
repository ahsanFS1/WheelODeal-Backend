import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';
import { authenticator } from 'otplib';

// Create Admin


export const createAdmin = async (req, res) => {
  const { username, password, twoFactorSecret } = req.body;

  try {
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return res.status(403).json({ success: false, message: 'Admin already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ username, password: hashedPassword, twoFactorSecret });
    await newAdmin.save();

    res.status(201).json({ success: true, message: 'Admin created successfully.' });
  } catch (error) {
    console.error('Error creating admin:', error.message);
    res.status(500).json({ success: false, message: 'Error creating admin.' });
  }
};

// Authenticate Admin
export const authenticateAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ success: false, message: 'Admin not found.' });

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    res.status(200).json({ success: true, twoFactorSecret: admin.twoFactorSecret });
  } catch (error) {
    console.error('Error authenticating admin:', error.message);
    res.status(500).json({ success: false, message: 'Error authenticating admin.' });
  }
};

// Verify 2FA
export const verifyTwoFactor = async (req, res) => {
  const { secret, token } = req.body;
  console.log('Secret',secret);
    
    console.log('token',token);
  try {
    console.log(authenticator.verify({ token, secret, window:1 }));
    const isValid = authenticator.verify({ token,secret });
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid 2FA code.' });
    }

    res.status(200).json({ success: true, message: '2FA verification successful.' });
  } catch (error) {
    console.error('Error verifying 2FA:', error.message);
    res.status(500).json({ success: false, message: 'Error verifying 2FA.' });
  }
};



export const fetchAdmin = async (req, res) => {
    try {


        
      const admin = await Admin.findOne({});
      if (!admin) {
        console.log("no admin");
        return res.status(404).json({
          success: false,
          message: 'Admin account not found.',
        });
      }
  
      res.status(200).json({
        success: true,
        data: admin,
      });
    } catch (error) {
      console.error('Error fetching admin:', error.message);
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching the admin account.',
      });
    }
  };