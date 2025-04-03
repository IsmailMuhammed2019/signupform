import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ReCAPTCHA from "react-google-recaptcha";

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

  const onCaptchaChange = (value: string | null) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const onSubmit = () => {
    if (!captchaVerified) {
      alert("Please verify the CAPTCHA before submitting.");
      return;
    }
    handleSubmit();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">Step 3: Final Details</h2>

      {/* Marital Status */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">Marital Status</label>
        <Select
          onValueChange={(value) => setFormData({ maritalStatus: value })}
          value={formData.maritalStatus}
        >
          <SelectTrigger className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none">
            <SelectValue placeholder="Select Marital Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Single">Single</SelectItem>
            <SelectItem value="Married">Married</SelectItem>
            <SelectItem value="Divorced">Divorced</SelectItem>
            <SelectItem value="Widowed">Widowed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Notes */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">
          The reason why I'm willing to attend this program:
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ notes: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-20 pl-3"
          placeholder="Write your reason here..."
        />
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

      {/* CAPTCHA */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">I am not a robot</label>
        <ReCAPTCHA
          sitekey="YOUR_SITE_KEY" // Replace with your Google reCAPTCHA site key
          onChange={onCaptchaChange}
          className="mt-2"
        />
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
            !captchaVerified ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!captchaVerified}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}