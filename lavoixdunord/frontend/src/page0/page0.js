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
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="background_page0">
        <img
            src={`${basename}images/logo_jeu.png`}
            alt="Logo du jeu"
            className="logo_page0"
        />
        {/*
        <img
            src={`${basename}images/logo_lavoidunord.png`}
            alt="Logo La Voix du Nord"
            className="logo_lavoixdunord"
        />*/ }
    </div>
);

};

export default Page0;