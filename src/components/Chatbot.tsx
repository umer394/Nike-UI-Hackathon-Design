"use client"
import React, { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Chatbot Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-black text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer"
      >
        💬
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-lg"
            >
              ✖
            </button>
          </div>

          {/* Chat Area */}
          <div className="p-4 flex flex-col h-full overflow-y-auto">
            <div className="bg-gray-100 p-3 rounded-md mb-2">
              Hi! How can I assist you today?
            </div>
            <div className="mt-auto">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
