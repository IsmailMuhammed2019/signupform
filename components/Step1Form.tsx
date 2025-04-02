
/* eslint-disable */

import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

interface FormDataType {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  address: string;
  state: string;
  programCategory: string;
  phoneNumber: string;
}

interface Step1FormProps {
  formData: FormDataType;
  setFormData: (data: Partial<FormDataType>) => void; // Fix the type here
  nextStep: () => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ formData, setFormData, nextStep }) => {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country: any) => country.name.common).sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value }); // Fix the function call
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ phoneNumber: value });
  };
  

  const handleNext = () => {
    nextStep();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Start Your Application</h1>
      <p className="text-gray-600 mb-12 text-center">
        Continue to the next pages to complete your application and learn about next steps.
      </p>

      {/* Name Fields */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3"
            required
          />
        </div>
      </div>

      {/* Email and Phone Number Fields */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <PhoneInput
            country={"us"}
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            inputClass="w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3"
            containerClass="mt-1 w-full focus-within:ring-green-500 focus-within:border-green-500"
          />
        </div>
      </div>

      {/* Address Field */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <Select onValueChange={(value) => setFormData({ ...formData, address: value })}>
          <SelectTrigger className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Program Category Field */}
      <div className="mb-6">
        <label htmlFor="programCategory" className="block text-sm font-medium text-gray-700">
          Choose Program Category
        </label>
        <Select onValueChange={(value) => setFormData({ ...formData, programCategory: value })}>
          <SelectTrigger className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none">
            <SelectValue placeholder="Select a program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AWS Solution Architect/DevOps Engineering">
              AWS Solution Architect/DevOps Engineering
            </SelectItem>
            <SelectItem value="Data Analyst">Data Analyst</SelectItem>
            <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
            <SelectItem value="React Js Developer">React Js Developer</SelectItem>
            <SelectItem value="CyberSecurity">CyberSecurity</SelectItem>
            <SelectItem value="Sales force engineer">Sales force engineer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="bg-green-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-white hover:text-green-600 hover:border-green-600 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Form;