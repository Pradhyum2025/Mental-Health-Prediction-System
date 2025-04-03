import express from 'express'
import { login, signup } from '../controllers/Auth.js';
const authRoutes = express.Router();


//signup for user
authRoutes.post('/signup',signup);

//login for user
authRoutes.post('/login',login);



export default authRoutes;