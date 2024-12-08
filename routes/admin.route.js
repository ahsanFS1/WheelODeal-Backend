import express from 'express';
import {
  createAdmin,
  authenticateAdmin,
  fetchAdmin,
  verifyTwoFactor,
  
} from '../controllers/admin.controller.js';

const router = express.Router();

// Admin Setup Route
router.post('/setup', createAdmin);

// Admin Login Route
router.post('/login', authenticateAdmin);

// Admin 2FA Verification Route
router.post('/verify-2fa', verifyTwoFactor);

// Fetch Admin Route
router.get('/', fetchAdmin);


export default router;
