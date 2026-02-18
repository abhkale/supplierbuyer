import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      <p className="font-medium">Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
