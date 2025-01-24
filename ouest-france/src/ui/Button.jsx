import React from "react";

const Button = ({ children, onClick, className }) => {
    return (
      <button onClick={onClick} className={`p-4 text-lg font-semibold rounded-lg border ${className}`}>
        {children}
      </button>
    );
  };
  
  export default Button;