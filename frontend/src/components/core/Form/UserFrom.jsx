import React from 'react'
import { useForm } from 'react-hook-form';
import { FiBook, FiTag, FiX } from "react-icons/fi";
import { FaTransgenderAlt } from "react-icons/fa";
import { RiMentalHealthLine } from "react-icons/ri";
import { CgPacman } from "react-icons/cg";
import { MdManageAccounts } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GiLevelEndFlag } from "react-icons/gi";
import { GiHabitatDome } from "react-icons/gi";
import { GiNightSleep } from "react-icons/gi";
import { MdLanguage } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { GiSuicide } from "react-icons/gi";
import { MdSchool } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoMdCloudUpload } from "react-icons/io";

export default function UserFrom() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log("User Data : ", data);
    
  }
  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-500 text-center mb-6 text-shadow-md">Predict Your Menatl Health With Simple Steps</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/*  ----------------Gender Name ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaTransgenderAlt className="mr-2" /> Gender
              </label>
              <select
                name="gender"
                className={`mt-1 block w-full rounded-md border outline-0 ${errors.gender ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white`}
                // --------validation--------
                {...register("gender", { required: true })}

              >
                <option className='text-gray-300' value={""}>Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              {/* -------Error handling ------- */}
              {errors.courseName?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Course name is required</p>
              )}
            </div>


            {/* ---------------- Age ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 ">
                <MdManageAccounts className="mr-2 text-[1.2rem]" /> Age  &#40; year &#41;
              </label>
              <input
                type="number"
                name="age"
                className={`mt-1 block w-full rounded-md border ${errors.age ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white outline-0`}
                placeholder='Enter your age'
                // --------validation--------
                {...register("age", {
                  required: { value: true, message: "Age is require" },
                  max: { value: 100, message: "Maximum age limit is 100" },
                  min: { value: 5, message: "Minimum age limit is 5" }
                })}
              />
              {/* -------Error handling ------- */}
              {errors.age?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>{errors.age && errors.age.message}</p>
              )}
            </div>


            {/* ---------------- Acadmic Pressure Level ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 ">
                <RiMentalHealthLine className="mr-2 text-[1.2rem]" /> Acadmic Pressure Level &#40; 1 to 10 &#41;
              </label>
              <input
                type="number"
                name="acadmicPressure"
                className={`mt-1 block w-full rounded-md border ${errors.acadmicPressure ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white outline-0`}
                placeholder='Enter your age'
                // --------validation--------
                {...register("acadmicPressure", {
                  required: { value: true, message: "Acadmic pressure level is require" },
                  max: { value: 10, message: "Maximum  limit is 10" },
                  min: { value: 1, message: "Minimum limit is 1" }
                })}
              />
              {/* -------Error handling ------- */}
              {errors.acadmicPressure?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>{errors.acadmicPressure && errors.acadmicPressure.message}</p>
              )}
            </div>

            {/* ---------------- CGPA ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 ">
                <CgPacman className="mr-2 text-[1.2rem]" /> CGPA  &#40; 1 to 10 &#41;
              </label>
              <input
                type="number"
                name="cgpa"
                className={`mt-1 block w-full rounded-md border ${errors.cgpa ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white outline-0`}
                placeholder='e.g. 7.6'
                // --------validation--------
                {...register("cgpa", {
                  required: { value: true, message: "CGPA is require" },
                  max: { value: 10, message: "Maximum  limit is 10" },
                  min: { value: 1, message: "Minimum  limit is 1" }
                })}
              />
              {/* -------Error handling ------- */}
              {errors.cgpa?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>{errors.cgpa && errors.cgpa.message}</p>
              )}
            </div>

            {/* ---------------- Study satisfaction ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 ">
                <GiLevelEndFlag className="mr-2 text-[1.2rem]" /> Study Satisfaction Level  &#40; 1 to 10 &#41;
              </label>
              <input
                type="number"
                name="studySatisfaction"
                className={`mt-1 block w-full rounded-md border ${errors.studySatisfaction ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white outline-0`}
                placeholder='Enter study satisfaction level'
                // --------validation--------
                {...register("studySatisfaction", {
                  required: { value: true, message: "Study satisfaction level is required" },
                  max: { value: 10, message: "Maximum  limit is 10" },
                  min: { value: 1, message: "Minimum  limit is 1" }
                })}
              />
              {/* -------Error handling ------- */}
              {errors.studySatisfaction?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>{errors.studySatisfaction && errors.studySatisfaction.message}</p>
              )}
            </div>

            {/* ---------------- Sleep duration ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 ">
                <GiNightSleep className="mr-2 text-[1.2rem]" /> Sleep duration  &#40; hours per day&#41;
              </label>
              <input
                type="number"
                name="sleepDuration"
                className={`mt-1 block w-full rounded-md border ${errors.sleepDuration ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white outline-0`}
                placeholder='Enter sleep duration '
                // --------validation--------
                {...register("sleepDuration", {
                  required: { value: true, message: "Sleep duration is required" },
                  max: { value: 24, message: "Maximum  limit is 24" },
                  min: { value: 1, message: "Minimum  limit is 1" }
                })}
              />
              {/* -------Error handling ------- */}
              {errors.sleepDuration && (
                <p role="alert" className='text-[.81rem] text-red-500'>{errors.sleepDuration?.message}</p>
              )}
            </div>

            {/*  ----------------Dietary habits ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <GiHabitatDome className="mr-2" /> Dietary habits
              </label>
              <select
                name="dietaryHabits"
                className={`mt-1 block w-full rounded-md border outline-0 ${errors.dietaryHabits ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white`}
                // --------validation--------
                {...register("dietaryHabits", { required: true })}

              >
                <option className='text-gray-300' value={""}>Select habit</option>
                <option value={1}>Bag 😔</option>
                <option value={2}>Average 😀</option>
                <option value={3}>Good 😊</option>
              </select>
              {/* -------Error handling ------- */}
              {errors.dietaryHabits?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Dietary habit is required</p>
              )}
            </div>

            {/*  ----------------Degree Type ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MdSchool className="mr-2" /> Degree Type
              </label>
              <select
                name="degree"
                className={`mt-1 block w-full rounded-md border outline-0 ${errors.degree ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white`}
                // --------validation--------
                {...register("degree", { required: true })}

              >
                <option className='text-gray-300' value={""}>Select degree type</option>
                <option value={1}>Undergraduate</option>
                <option value={1}>Postgraduate</option>
                <option value={3}>Other</option>
              </select>
              {/* -------Error handling ------- */}
              {errors.degree?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Degree type is required</p>
              )}
            </div>

            {/*  ----------------Suicidal thoughts ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <GiSuicide className="mr-2" /> Have you ever had suicidal thoughts
              </label>
              <select
                name="suicidalThought"
                className={`mt-1 block w-full rounded-md border outline-0 ${errors.suicidalThought ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white`}
                // --------validation--------
                {...register("suicidalThought", { required: true })}

              >
                <option className='text-gray-300' value={""}>Select</option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>

              </select>
              {/* -------Error handling ------- */}
              {errors.suicidalThought && (
                <p role="alert" className='text-[.81rem] text-red-500'>Suicidal thought
                  is required</p>
              )}
            </div>

            {/* ---------------- workHour---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 ">
                <GiNightSleep className="mr-2 text-[1.2rem]" /> Work/Study  &#40; hours per day&#41;
              </label>
              <input
                type="number"
                name="workHour"
                className={`mt-1 block w-full rounded-md border ${errors.workHour ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white outline-0`}
                placeholder='Enter work/sudy hour per day'
                // --------validation--------
                {...register("workHour", {
                  required: { value: true, message: "Work/Study per day is required" },
                  max: { value: 24, message: "Maximum  limit is 24" },
                  min: { value: 0, message: "Minimum  limit is 0" }
                })}
              />
              {/* -------Error handling ------- */}
              {errors.workHour && (
                <p role="alert" className='text-[.81rem] text-red-500'>{errors.workHour?.message}</p>
              )}
            </div>

            
            {/* ---------------- financial Stress---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 ">
                <GiNightSleep className="mr-2 text-[1.2rem]" /> Financial Stress Level  &#40; 1 to 10 &#41;
              </label>
              <input
                type="number"
                name="financialStress"
                className={`mt-1 block w-full rounded-md border ${errors.financialStress ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white outline-0`}
                placeholder='Enter work/sudy hour per day'
                // --------validation--------
                {...register("financialStress", {
                  required: { value: true, message: "Financial stress level is required" },
                  max: { value: 10, message: "Maximum  limit is 10" },
                  min: { value: 0, message: "Minimum  limit is 0" }
                })}
              />
              {/* -------Error handling ------- */}
              {errors.financialStress && (
                <p role="alert" className='text-[.81rem] text-red-500'>{errors.financialStress?.message}</p>
              )}  
            </div>

             {/*  ----------------Suicidal thoughts ---------------- */}
             <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <GiSuicide className="mr-2" /> Family Story of Mental Illness
              </label>
              <select
                name="familyMenatlIllness"
                className={`mt-1 block w-full rounded-md border outline-0 ${errors.familyMenatlIllness ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white`}
                // --------validation--------
                {...register("familyMenatlIllness", { required: true })}

              >
                <option className='text-gray-300' value={""}>Select</option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>

              </select>
              {/* -------Error handling ------- */}
              {errors.familyMenatlIllness && (
                <p role="alert" className='text-[.81rem] text-red-500'>family menatl illness
                  is required</p>
              )}
            </div>

            {/*  ----------------buttons ---------------- */}
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="reset"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {/* {fetching ? <LoadingBtn working={'Creating...'}/>: "Create course"} */}
                  Predict Mental Health
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
