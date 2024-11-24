import express from 'express';
import { identifyContact } from '../controllers/controller.js';

const router = express.Router();
router.post('/identify', identifyContact);

export default router;
