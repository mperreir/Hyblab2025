import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./page0.css";

const Page0 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return <div className="background_page0"></div>;
};

export default Page0;