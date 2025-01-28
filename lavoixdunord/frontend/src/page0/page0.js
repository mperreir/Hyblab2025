import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./page0.css";
import useBasename from "../hooks/useBasenameHook";

const Page0 = () => {
  const basename = useBasename();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="background_page0">
    </div>
  );

};

export default Page0;