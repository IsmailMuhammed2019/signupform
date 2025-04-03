import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export interface FormDataType {
  notes: string;
  course: string[];
  preferredLocation: string;
  trainingMethod: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  programCategory: string;
}

interface Step2FormProps {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  prevStep: () => void;
  nextStep: () => void;
}

export default function Step2Form({ formData, setFormData, prevStep, nextStep }: Step2FormProps) {
  const programSubOptions: { [key: string]: string[] } = {
    AWS: [
      "AWS Cloud Engineering/Solutions Architect",
      "DevOps Engineering",
      "I’ll decide later",
    ],
    "Data Science": [
      "Data Analysis/Data Visualization",
      "Machine Learning/Deep Learning",
      "Natural Language Processing",
      "Model Deployment and Cloud for ML",
      "I’ll decide later",
    ],
    "FullStack Development": [
      "FrontEnd Development",
      "BackEnd Development",
      "I’ll decide later",
    ],
    "Cyber Security": [
      "CompTIA Security Plus",
      "SOC Experience",
      "I’ll decide later",
    ],
    Salesforce: [
      "Salesforce Developer",
      "Upskill - Salesforce Advanced Flow",
      "Upskill - Salesforce Internship",
      "Upskill - Salesforce CPQ",
      "I’ll decide later",
    ],
    "SDET (QA Tester)": [
      "Mobile Testing (Appium)",
      "AWS Cloud for Testers",
      "I’ll decide later",
    ],
    "Not Decided Yet": [],
  };

  const selectedProgram = formData.programCategory;
  const subOptions = programSubOptions[selectedProgram] || [];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">Step 2: Additional Information</h2>

      {/* Sub-Options */}
      {subOptions.length > 0 && (
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 bold">
            Which program(s) are you interested in? *
          </label>
          <div className="mt-2 space-y-2">
            {subOptions.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.course?.includes(option)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedCourses = isChecked
                      ? [...(formData.course || []), option]
                      : formData.course?.filter((item) => item !== option);
                    setFormData({ ...formData, course: updatedCourses });
                  }}
                  className="mr-2"
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Preferred Location */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">Preferred Location</label>
        <Select onValueChange={(value) => setFormData({ ...formData, preferredLocation: value })}>
          <SelectTrigger className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none">
            <SelectValue placeholder="Select a Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lagos">Lagos</SelectItem>
            <SelectItem value="Abuja">Abuja</SelectItem>
            <SelectItem value="Kaduna">Kaduna</SelectItem>
            <SelectItem value="Yola">Yola</SelectItem>
            <SelectItem value="Enugu">Enugu</SelectItem>
            <SelectItem value="Asaba">Asaba</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Preferred Training Method */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">Preferred Training Method</label>
        <Select onValueChange={(value) => setFormData({ ...formData, trainingMethod: value })}>
          <SelectTrigger className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none">
            <SelectValue placeholder="Select a Training Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="In-Person ILT">In-Person ILT</SelectItem>
            <SelectItem value="Virtual ILT">Virtual ILT</SelectItem>
            <SelectItem value="Both (In-Person & Virtual)">Both (In-Person & Virtual)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gender */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="mr-2"
            />
            Male
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="mr-2"
            />
            Female
          </label>
        </div>
      </div>

      {/* Date of Birth */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">Year of Birth</label>
        <select
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 appearance-none"
        >
          <option value="" disabled>
            Select Year
          </option>
          {Array.from({ length: 100 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border border-green-500 mt-8 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer"
        >
          Back
        </Button>
        <Button
          onClick={nextStep}
          className="bg-green-500 mt-8 text-white border border-green-500 hover:bg-white hover:text-green-500 cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
}