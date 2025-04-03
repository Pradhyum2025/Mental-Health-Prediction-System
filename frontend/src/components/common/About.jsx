import React, { useState } from "react";
import { FaBrain, FaChartBar, FaUserMd } from "react-icons/fa";

export const AboutUs = () => {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const randomPrediction = Math.random() > 0.5 ? "At Risk" : "Healthy";
      setPrediction(randomPrediction);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-neutral-50 py-12 mt-[-10px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Our Mental Health Assessment System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We use advanced machine learning algorithms to help identify potential mental health concerns and provide personalized recommendations.
          </p>
        </div>


          <div className=" flex md:flex-row flex-col gap-5 py-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <FaBrain className="text-4xl text-indigo-500 mb-4" />
              <h3 className="text-xl text-indigo-400 font-semibold mb-2">Advanced AI Technology</h3>
              <p className="text-gray-600">Our system uses state-of-the-art machine learning models trained on extensive mental health data.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <FaChartBar className="text-4xl text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold  text-indigo-400 mb-2">Data-Driven Insights</h3>
              <p className="text-gray-600">Get accurate predictions based on comprehensive analysis of multiple mental health indicators.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <FaUserMd className="text-4xl text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold  text-indigo-400 mb-2">Professional Support</h3>
              <p className="text-gray-600">Connect with licensed mental health professionals based on your assessment results.</p>
            </div>
          </div>

        <div className="text-center text-gray-500 text-sm">
          <p>
            Disclaimer: This tool is for screening purposes only and should not be considered as a clinical diagnosis.
            <br />
            Please consult with a qualified mental health professional for proper evaluation and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

