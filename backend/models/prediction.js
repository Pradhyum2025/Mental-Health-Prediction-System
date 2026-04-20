// models/MentalHealth.js

import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({
  gender: {
    type: Number, // 0 = Female, 1 = Male
    required: true,
    enum: [0, 1]
  },
  age: {
    type: Number,
    required: true,
    min: 5,
    max: 100
  },
  acadmicPressure: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  cgpa: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  studySatisfaction: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  sleepDuration: {
    type: Number,
    required: true,
    min: 1,
    max: 24
  },
  dietaryHabits: {
    type: Number, // 1 = Bad, 2 = Average, 3 = Good
    required: true,
    enum: [1, 2, 3]
  },
  degree: {
    type: Number, // 1 = UG/PG, 3 = Other
    required: true,
    enum: [1,2,3]
  },
  suicidalThought: {
    type: Number, // 0 = No, 1 = Yes
    required: true,
    enum: [0, 1]
  },
  workHour: {
    type: Number,
    required: true,
    min: 1,
    max: 24
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  financialStress:{
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  familyMenatlIllness:{
    type: Number,
    required: true,
    enum:[0,1]
  }
  ,
  predictionResult: {
    type: String,
  }
});

export const Prediction = mongoose.model("Prediction", PredictionSchema);
