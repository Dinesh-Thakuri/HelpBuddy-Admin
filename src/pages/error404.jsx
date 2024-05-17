import React from "react";

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            404 Not Found
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Oops! The page you're looking for doesn't seem to exist.
          </p>
          <a
            href="/"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}
