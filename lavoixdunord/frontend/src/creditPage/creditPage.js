import React, { useEffect } from "react";
import './creditPage.css';
import { useNavigate } from "react-router-dom";
import useBasename from "../hooks/useBasenameHook";

const Credit = () => {
    const navigate = useNavigate();
    const basename = useBasename();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/final");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="bg_gradient_fond_vague d-flex flex-column">
            <div className="mt-84 text-center p-4">
                <img src={`${basename}images/logo_jeu.png`} alt="credit" className=""
                    style={{
                        width: "200px",
                        marginBottom: "88px"
                    }} />

                <p><b>Designed by :</b> Ivana RONTARD</p>
                <p><b>Developped by :</b> Youssef IBNOUALI, Théophile TAGNE, Ghassen JRAD, Arwa OUERIEMMI, Mohammed JAOUADA & Mehdi BEN SALHA</p>
                <p><b>Narration :</b> Quentin MALLET</p>


            </div>
            <div className="flex-grow-1">&nbsp;</div>
            <img src={`${basename}images/credit_image.png`} alt="credit" 
            className=""
                style={{
                    maxWidth: "100%",
                    // width: "200px",
                    // marginBottom: "48px"
                }} />
        </div>
    );
};

export default Credit;
