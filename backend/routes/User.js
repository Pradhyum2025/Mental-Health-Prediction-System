import express from 'express'
import { login, signup } from '../controllers/user.js';

const authRoutes = express.Router();


//signup for user
authRoutes.post('/signup',signup);

//login for user
authRoutes.post('/login',login);


export default authRoutes;