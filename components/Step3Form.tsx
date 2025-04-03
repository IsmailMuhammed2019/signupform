import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import MockCaptcha from "./MockCaptcha";

interface Step3FormProps {
  formData: {
    maritalStatus: string;
    notes: string;
  };
  setFormData: (data: Partial<{ maritalStatus: string; notes: string }>) => void;
  prevStep: () => void;
  handleSubmit: () => void;
}

export default function Step3Form({ formData, setFormData, prevStep, handleSubmit }: Step3FormProps) {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled and valid
    const isValid = !!formData.maritalStatus && !!formData.notes && captchaVerified;
    setIsFormValid(isValid);
  }, [formData, captchaVerified]);

  const onSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    // Validation checks
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital Status is required.";
    if (!formData.notes) newErrors.notes = "Please provide a reason for attending this program.";
    if (!captchaVerified) {
      alert("Please verify the CAPTCHA before submitting.");
      return;
    }

    // If there are errors, set them and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Log all form data
    console.log("Form Data:", formData);

    // Proceed with form submission
    handleSubmit();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">Step 3: Final Details</h2>

      {/* Marital Status */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">
          Marital Status <span className="text-red-500">*</span>
        </label>
        <Select
          onValueChange={(value) => {
            setFormData({ maritalStatus: value });
            setErrors((prev) => ({ ...prev, maritalStatus: "" })); // Clear error on change
          }}
          value={formData.maritalStatus}
        >
          <SelectTrigger
            className={`mt-1 block w-full border ${
              errors.maritalStatus ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none`}
          >
            <SelectValue placeholder="Select Marital Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Single">Single</SelectItem>
            <SelectItem value="Married">Married</SelectItem>
            <SelectItem value="Divorced">Divorced</SelectItem>
            <SelectItem value="Widowed">Widowed</SelectItem>
          </SelectContent>
        </Select>
        {errors.maritalStatus && (
          <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>
        )}
      </div>

      {/* Additional Notes */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">
          The reason why I&apos;m willing to attend this program: <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => {
            setFormData({ notes: e.target.value });
            setErrors((prev) => ({ ...prev, notes: "" })); // Clear error on change
          }}
          className={`mt-1 block w-full border ${
            errors.notes ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-20 pl-3`}
          placeholder="Write your reason here..."
        />
        {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
      </div>

      {/* Agreement Text */}
      <div className="mb-8 text-sm text-gray-600">
        By submitting this form, you agree to receive admissions and marketing communications via
        e-mail, phone or text messages and you agree to our{" "}
        <a href="/privacy-policy" className="text-green-500 underline">
          Privacy Policy
        </a>
        . You may unsubscribe at any time.
      </div>

      {/* Mock CAPTCHA */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">I am not a robot</label>
        <MockCaptcha onVerify={setCaptchaVerified} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer"
        >
          Back
        </Button>
        <Button
          onClick={onSubmit}
          className={`bg-green-500 text-white border border-green-500 hover:bg-white hover:text-green-500 cursor-pointer ${
            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}