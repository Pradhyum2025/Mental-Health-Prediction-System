import React, { useEffect, useState } from 'react'
import { format } from "date-fns";
import { getMyMentalHealthHistory } from '../../../operations/prediction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiEdit2Fill } from "react-icons/ri";

export default function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getMyMentalHealthHistory(dispatch)
  }, [])
  const handleEditPrediction = (pred)=>{
    return navigate('/check-health',{state:{currPred:pred}})
  }
  const predictions = useSelector(store => store.history);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-10">

        {predictions.length === 0 ?
          <div className='flex flex-col items-center justify-center w-full gap-5'>

            There is No History about mental health
            <button
              onClick={() => navigate('/check-health')}
              className='scale px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 cursor-pointer'>Check your mental health</button>
          </div>:
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">


        {predictions.map((prediction) => (
          <div key={prediction.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow relative">
            <div className='absolute right-3 top-3'>
              <button 
              onClick={()=>handleEditPrediction(prediction)}
              className='btn min-h-[2rem] h-[2rem]  bg-indigo-400 hover:bg-indigo-500 px-2'
              >
                <RiEdit2Fill className='text-xl text-gray-800 hover:text-gray-900'/>
              </button>
            </div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                {format(prediction.createdAt, "MMM dd, yyyy")}
              </span>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300">Gender:</span>
                <span className="font-medium dark:text-white">{prediction.gender===0?'Female':'Male'}</span>

                <span className="text-gray-600 dark:text-gray-300">Age:</span>
                <span className="font-medium dark:text-white">{prediction.age} year</span>

                <span className="text-gray-600 dark:text-gray-300">Academic Pressure:</span>
                <span className="font-medium dark:text-white">{prediction.acadmicPressure}</span>

                <span className="text-gray-600 dark:text-gray-300">CGPA:</span>
                <span className="font-medium dark:text-white">{prediction.cgpa}</span>

                <span className="text-gray-600 dark:text-gray-300">Study Satisfaction:</span>
                <span className="font-medium dark:text-white">{prediction.studySatisfaction}</span>

                <span className="text-gray-600 dark:text-gray-300">Sleep Duration:</span>
                <span className="font-medium dark:text-white">{prediction.sleepDuration}</span>

                <span className="text-gray-600 dark:text-gray-900">Dietary Habits:</span>
                <span>
                <span className="font-medium dark:text-white">
                  {prediction.dietaryHabits==1&&'Bad'}</span>
                  <span className="font-medium dark:text-white">
                  {prediction.dietaryHabits==2&&'Average'}</span>
                  <span className="font-medium dark:text-white">
                  {prediction.dietaryHabits==3&&'Good'}</span>

                </span>
                

                <span className="text-gray-600 ">Degree:</span>
                <span>
                <span className="font-medium dark:text-white">
                  {prediction.degree==1 && 'Undergraduate'}</span>
                <span className="font-medium ">
                  {prediction.degree==2 && 'Postgraduate'}</span>
                <span className="font-medium dark:text-white">
                  {prediction.degree==3 && 'Other'}</span>
                </span>

                <span className="text-gray-600 dark:text-gray-300">Work Hours:</span>
                <span className="font-medium dark:text-white">{prediction.workHour} hours</span>

              </div>
                <span className="text-gray-600 dark:text-gray-300 mt-5">Result</span>
                <span className="font-medium dark:text-white">{prediction.predictionResult}</span>
            </div>
          </div>
        ))}
      </div>
          }


    </div>
  )
}
