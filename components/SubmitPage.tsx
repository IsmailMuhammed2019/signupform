import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Import ShadCN Calendar

export default function SubmitPage({ startDate }: { startDate: Date }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(startDate);

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
          onSelect={(date) => setSelectedDate(date)} // Handle date selection
          className="border rounded-md cursor-pointer" // Add cursor-pointer styling
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => alert(`Start date selected: ${selectedDate?.toDateString()}`)}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Confirm Start Date
        </Button>
      </div>
    </div>
  );
}

