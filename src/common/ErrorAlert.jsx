import React from 'react';
import { useSelector } from 'react-redux';

const ErrorAlert = () => {
  const { error } = useSelector(state => state.category);

  if (!error) return null; // If there's no error, return nothing

  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
};

export default ErrorAlert;
