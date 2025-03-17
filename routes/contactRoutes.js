import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// Route to handle form submission
router.post('/user', submitContactForm);

export default router;