import express from 'express'
import {getMLP, updateMLP } from '../controllers/MLP.controller.js';


const router = express.Router();



router.get("/",getMLP);

router.put('/landing-page',updateMLP);
  

export default router;