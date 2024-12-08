import express from 'express';
import { getPP, updatePP } from '../controllers/pubicPage.controller.js';

const router = express.Router();

// Route to get a public page by projectId
router.get('/:projectId', getPP);

// Route to update a public page by projectId
router.put('/:projectId', updatePP);

export default router;
