import React, { useEffect } from "react";
import './creditPage.css';
import { useNavigate } from "react-router-dom";

const Credit = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
          navigate("/final"); 
        }, 5000);
    
        return () => clearTimeout(timer); 
      }, [navigate]);

    return (
        <div className="background">
            <div className="container">
                <p><b>Designed by :</b> Ivana RONTARD</p>
                <br></br>
                <p><b>Developped by :</b> Youssef IBNOUALI, Théophile TAGNE, Ghassen JRAD, Arwa OUERIEMMI, Mohammed JAOUADA & Mehdi BEN SALHA</p>
                <br></br>
                <p><b>Narration :</b> Quentin MALLET</p>
            </div>
        </div>
    );
};

export default Credit;
