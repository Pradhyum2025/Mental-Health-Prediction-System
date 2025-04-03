import express from 'express'
import { getMentalPrediction } from '../controllers/prediction.js';
const predictionRoutes = express.Router();


//signup for user
predictionRoutes.post('/',getMentalPrediction);

export default predictionRoutes;