import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function SubmitPage({ startDate }: { startDate: Date }) {
  const [selectedDate, setSelectedDate] = useState(startDate);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Success!</h2>
      <p className="text-center text-gray-700 mb-8">
        Your application has been submitted successfully. Please select your preferred start date below.
      </p>
      <div className="flex justify-center mb-8">
        <Calendar
          selected={selectedDate}
          onSelect={(date: Date | undefined) => date && setSelectedDate(date)}
        />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => alert(`Start date selected: ${selectedDate.toDateString()}`)}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Confirm Start Date
        </Button>
      </div>
    </div>
  );
}

