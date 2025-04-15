/* eslint-disable */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Import ShadCN Calendar

export default function SubmitPage({
  startDate,
  formData,
}: {
  startDate: Date;
  formData: any;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startDate);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = () => {
    // Log the form data to the console for debugging purposes
    console.log("Form Data Submitted:", {
      ...formData,
      selectedDate: selectedDate?.toISOString(),
    });

    // Show the success message
    setShowSuccessMessage(true);
  };

  const handleClose = () => {
    // Redirect to the specified URL
    window.location.href = "https://www.icbm.training/";
  };

  if (showSuccessMessage) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto mt-20 text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-6">Success!</h2>
        <p className="text-lg text-gray-700 mb-8">
          Your form has been submitted successfully. A customer care representative will reach out
          to you shortly to finalize the scheduled date of your interview. Thank you!
        </p>
        <Button
          onClick={handleClose}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Admission Appointment</h2>
      <p className="text-left text-gray-700 mb-8">
        <strong>25 minutes</strong>
      </p>
      <p className="text-left text-gray-700 mb-8">
        Hello icbm&apos;s student candidate,
        <br />
        We are informing you that we would like to have a short interview with you to confirm your
        registration. Please choose a preferred time on the calendar to join a Zoom session with
        one of the icbm-Admission Staff.
        <br />
        We look forward to meeting you!
      </p>
      <p className="text-left text-gray-700 mb-8">
        <strong>Note:</strong> If you had a meeting with our admission team before filling the
        enrollment form, you do not need to make an appointment to get an interview again.
      </p>
      <div className="flex justify-center mb-8 w-full">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
          className="border rounded-md cursor-pointer"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Confirm Start Date
        </Button>
      </div>
    </div>
  );
}

