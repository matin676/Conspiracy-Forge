import React, { useState } from "react";
import { getConspiracyTheory } from "../api/gemini";

export default function Generator() {
  const [theory, setTheory] = useState("");
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTheory = async () => {
    setLoading(true);
    try {
      const response = await getConspiracyTheory();
      const [firstLine, ...rest] = response.split("\n");
      setHeading(firstLine);
      setBody(rest.join("\n"));
    } catch (error) {
      console.error("Error generating conspiracy theory:", error);
      setHeading("");
      setBody("Failed to generate a conspiracy theory. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <button
        onClick={generateTheory}
        className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
      >
        {loading ? "Generating..." : "Generate Conspiracy Theory"}
      </button>
      {heading && (
        <div className="mt-8 p-4 max-h-96 flex flex-col overflow-auto text-justify bg-white rounded-xl shadow-md text-gray-800 text-lg max-w-3xl no-scrollbar pattern-dots pattern-gray-300 pattern-bg-transparent pattern-opacity-100 pattern-size-4">
          <h2 className="text-2xl font-bold mb-4">{heading}</h2>
          <p>{body}</p>
        </div>
      )}
    </div>
  );
}
