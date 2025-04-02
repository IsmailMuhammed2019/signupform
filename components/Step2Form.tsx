import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export interface FormDataType {
  notes: string;
  course: string;
  preferredLocation: string;
  trainingMethod: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
}

interface Step2FormProps {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  prevStep: () => void;
  handleSubmit: () => void;
}

export default function Step2Form({ formData, setFormData, prevStep, handleSubmit }: Step2FormProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">Step 2: Additional Information</h2>

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
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3 pt-1"
        />
      </div>

      {/* Marital Status */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">Marital Status</label>
        <Select onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}>
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

      {/* Notes */}
      <Input
        type="text"
        placeholder="Additional Notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className="mb-8 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 hover:ring-green-500 sm:text-sm h-8 pl-3"
      />

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border border-green-500 mt-8 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-green-500 mt-8 text-white border border-green-500 hover:bg-white hover:text-green-500 cursor-pointer"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}