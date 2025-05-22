import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '0.75rem',
        marginBottom: '1rem',
        borderRadius: '5px',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
      }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
