"use client";

import { useState } from "react";
import Step1Form from "../components/Step1Form";
import Step2Form from "../components/Step2Form";
import { FormDataType as Step1FormDataType } from "../types/types";
import { FormDataType as Step2FormDataType } from "../components/Step2Form";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  // Combine form data for Step 1 and Step 2
  const [formData, setFormData] = useState<Step1FormDataType & Step2FormDataType>({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    address: "",
    state: "",
    programCategory: "",
    phoneNumber: "",
    notes: "",
    course: "",
    preferredLocation: "",
    trainingMethod: "",
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  // Wrapper function for Step2Form to only update its specific fields
  const setStep2FormData = (data: Step2FormDataType) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {currentStep === 1 && (
        <Step1Form
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {currentStep === 2 && (
        <Step2Form
          formData={formData}
          setFormData={setStep2FormData} // Use the wrapper function here
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}