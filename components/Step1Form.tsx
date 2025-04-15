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
  setFormData: (data: Partial<FormDataType>) => void;
  nextStep: () => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ formData, setFormData, nextStep }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

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

  // Check form validity whenever formData changes
  useEffect(() => {
    const isValid =
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.phoneNumber &&
      formData.address &&
      formData.programCategory;
    setIsFormValid(!!isValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ phoneNumber: value });
    setErrors((prev) => ({ ...prev, phoneNumber: "" })); // Clear error on change
  };

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};

    // Validation checks
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
    if (!formData.address) newErrors.address = "Country is required.";
    if (!formData.programCategory) newErrors.programCategory = "Program Category is required.";

    // If there are errors, set them and prevent navigation
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed to the next step if no errors
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
            className={`mt-1 block w-full border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3`}
            required
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
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
            className={`mt-1 block w-full border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3`}
            required
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email and Phone Number Fields */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
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
            className={`mt-1 block w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="flex-1">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <PhoneInput
            country={"ng"} // Set default country to Nigeria
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            inputClass={`w-full border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3`}
            containerClass="mt-1 w-full focus-within:ring-green-500 focus-within:border-green-500"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>
      </div>

      {/* Address Field */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Country<span className="text-red-500">*</span>
        </label>
        <Select
          onValueChange={(value) => {
            setFormData({ address: value });
            setErrors((prev) => ({ ...prev, address: "" })); // Clear error on change
          }}
          value={formData.address}
        >
          <SelectTrigger
            className={`mt-1 block w-full border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none`}
          >
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
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      {/* Program Category Field */}
      <div className="mb-6">
        <label htmlFor="programCategory" className="block text-sm font-medium text-gray-700">
          Choose Program Category<span className="text-red-500">*</span>
        </label>
        <Select
          onValueChange={(value) => {
            setFormData({ programCategory: value });
            setErrors((prev) => ({ ...prev, programCategory: "" })); // Clear error on change
          }}
          value={formData.programCategory}
        >
          <SelectTrigger
            className={`mt-1 block w-full border ${
              errors.programCategory ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none`}
          >
            <SelectValue placeholder="Select a program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AWS">AWS</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="FullStack Development">FullStack Development</SelectItem>
            <SelectItem value="Cyber Security">Cyber Security</SelectItem>
            <SelectItem value="Salesforce">Salesforce</SelectItem>
            <SelectItem value="SDET (QA Tester)">SDET (QA Tester)</SelectItem>
            <SelectItem value="Not Decided Yet">Not Decided Yet</SelectItem>
          </SelectContent>
        </Select>
        {errors.programCategory && (
          <p className="text-red-500 text-sm mt-1">{errors.programCategory}</p>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className={`px-6 py-2 rounded-md shadow-sm border focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer ${
            isFormValid
              ? "bg-green-600 text-white hover:bg-white hover:text-green-600 hover:border-green-600 border-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Form;