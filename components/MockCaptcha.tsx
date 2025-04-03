// MockCaptcha.tsx
import React, { useState } from "react";

interface MockCaptchaProps {
  onVerify: (verified: boolean) => void;
}

export default function MockCaptcha({ onVerify }: MockCaptchaProps) {
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerified(true);
    onVerify(true); // Notify parent component that CAPTCHA is verified
  };

  return (
    <div className="mt-2 bg-gray-100 border border-gray-300 rounded-md p-4 text-center w-64">
      {!verified ? (
        <button
          onClick={handleVerify}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          I'm not a robot
        </button>
      ) : (
        <p className="text-green-600 font-bold">CAPTCHA Verified</p>
      )}
    </div>
  );
}