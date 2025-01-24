import React from "react";

const Icon = ({ src, className, alt = "icon", ...props }) => {
  return (
    <img src={src} className={`inline-block ${className}`} alt={alt} {...props} />
  );
};

export default Icon;