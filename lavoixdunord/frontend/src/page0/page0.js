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
    }, 1000 * 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <div className="background_page0">
    <img src={`${basename}images/logo_jeu.png`} alt="Page 0 background" className="logo_page0" />
  </div>;
};

export default Page0;