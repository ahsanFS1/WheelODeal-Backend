import express from 'express';
import { getPP, createPP, updatePP, deletePP, getSinglePublicPage } from '../controllers/pubicPage.controller.js';

const router = express.Router();

// Route to get all public pages for a projectId
router.get('/:projectId', getPP);

// Route to create a public page
router.post('/', createPP);

// Route to update a specific public page by publicPageId
router.put('/:publicPageId', updatePP);

// Route to delete a specific public page by publicPageId
router.delete('/:publicPageId', deletePP);

// Route to get a single public page by publicPageId
router.get('/single/:publicPageId', getSinglePublicPage);

export default router;
