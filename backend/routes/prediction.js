import express from 'express'
import { getMentalPrediction, getMyMentalHealthHistory, updatemyMentalHistory } from '../controllers/prediction.js';
import { isAuth } from '../middlewares/auth.js';
const predictionRoutes = express.Router();


//signup for user
predictionRoutes.post('/',isAuth,getMentalPrediction);

predictionRoutes.get('/',isAuth,getMyMentalHealthHistory)

predictionRoutes.patch('/:predictionId',isAuth,updatemyMentalHistory)

export default predictionRoutes;