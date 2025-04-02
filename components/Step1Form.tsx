import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation"; // Import Next.js router

interface Step1FormProps {
  formData: {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    address: string;
    state: string;
    programCategory: string;
    phoneNumber: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void; // Add this line
}

const Step1Form: React.FC<Step1FormProps> = ({ formData, setFormData, nextStep }) => {

  const [countries, setCountries] = useState<string[]>([]);
  const router = useRouter(); // Initialize Next.js router

  // Fetch countries from an API
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      phoneNumber: value,
    }));
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
        <select
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 appearance-none pl-3"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* State Field */}
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 pl-3"
        />
      </div>

      {/* Program Category Field */}
      <div className="mb-6">
        <label htmlFor="programCategory" className="block text-sm font-medium text-gray-700">
          Choose Program Category
        </label>
        <select
          id="programCategory"
          name="programCategory"
          value={formData.programCategory}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-8 appearance-none pl-3 border border-gray-300"
        >
          <option value="">Select a program</option>
          <option value="AWS Solution Architect/DevOps Engineering">
            AWS Solution Architect/DevOps Engineering
          </option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="React Js Developer">React Js Developer</option>
          <option value="CyberSecurity">CyberSecurity</option>
          <option value="Sales force engineer">Sales force engineer</option>
        </select>
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