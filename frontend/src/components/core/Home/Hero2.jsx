import React, { useState, useEffect } from "react";
import { FaBrain, FaLock, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const MentalHealthHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <FaBrain className="text-4xl text-blue-500" />,
      title: "Personalized Insights",
      description: "Get tailored recommendations based on your unique mental wellness journey"
    },
    {
      icon: <FaLock className="text-4xl text-blue-500" />,
      title: "Confidential Assessment",
      description: "Your privacy matters. All information is encrypted and strictly confidential"
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-500" />,
      title: "Expert-Backed Methodology",
      description: "Science-based approach developed by mental health professionals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Your Mental Wellness Journey Starts Here
          </h1>
          <p className="text-xl md:text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized insights to support your mental health, backed by experts and designed with care
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <button
            className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={()=>Navigate('/check-health')}
          >
            Start Your Assessment
          </button>
          <button
            className="px-8 py-4 bg-transparent border-2 border-indigo-600 text-indigo-600 rounded-full text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={()=>Navigate('/about')}
          >
            Learn More About Our Approach
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>
            Your privacy is our priority. All assessments are confidential and encrypted.
            <br />
            We never share your personal information without your explicit consent.
          </p>
        </motion.div>

        <div className="fixed bottom-4 right-4">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
            alt="Peaceful nature scene"
            className="w-32 h-32 rounded-full object-cover shadow-lg"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1518495973542-4542c06a5843";
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

