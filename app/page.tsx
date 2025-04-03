"use client"

import { useState } from "react";
import Step1Form from "@/components/Step1Form";
import Step2Form from "@/components/Step2Form";
import Step3Form from "@/components/Step3Form";
import SubmitPage from "@/components/SubmitPage";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    address: "",
    state: "",
    programCategory: "",
    phoneNumber: "",
    notes: "",
    course: [] as string[], // Updated to string[] type
    preferredLocation: "",
    trainingMethod: "",
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
  });
  const [startDate] = useState(new Date());

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setCurrentStep(4); // Navigate to SubmitPage
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {currentStep === 1 && (
        <Step1Form
          formData={formData}
          setFormData={(data) => setFormData((prev) => ({ ...prev, ...data }))}
          nextStep={nextStep}
        />
      )}
      {currentStep === 2 && (
        <Step2Form
          formData={formData}
          setFormData={(data) => setFormData((prev) => ({ ...prev, ...data }))}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {currentStep === 3 && (
        <Step3Form
          formData={formData}
          setFormData={(data) => setFormData((prev) => ({ ...prev, ...data }))}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
      {currentStep === 4 && <SubmitPage startDate={startDate} />}
    </div>
  );
}