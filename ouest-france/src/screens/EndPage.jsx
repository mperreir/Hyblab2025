import React from "react";
import { scrollToSection } from "../utils";

const EndPage = () => {

  return (
    <section
      className="h-full w-full flex flex-col snap-start items-center min-h-screen bg-white"
      id="endpage"
    >

    <img src="./logos/logo_hyblab.png" alt="HYBLAB" className="w-[50rem] mt-24"/>

    <div className="grid grid-cols-2 gap-8 text-left mt-20">
        <div className="space-y-4">
            <p className="text-3xl font-bold text-gray-800">GAUTIER Titouan</p>
            <p className="text-3xl font-bold text-gray-800">BOUSSAOUI Elias</p>
            <p className="text-3xl font-bold text-gray-800">VITOUR Benoit</p>
            <p className="text-3xl font-bold text-gray-800">BLOT Victor</p>
        </div>
        <div className="space-y-4">
            <p className="text-3xl font-bold text-gray-800">GAUDINEAU Eliott</p>
            <p className="text-3xl font-bold text-gray-800">WINDY Zara</p>
            <p className="text-3xl font-bold text-gray-800">Qian Chengzhi</p>
        </div>
    </div>

    <div className="grid grid-cols-4 gap-8 items-center justify-center mt-24">
        <img src="./logos/logo_agr.png" alt="AGR" className="h-16"/>
        <img src="./logos/logo_oml.png" alt="OML" className="h-16" />
        <img src="./logos/logo_polytech.png" alt="Polytech" className="h-16"/>
        <img src="./logos/logo_sciencespo.svg" alt="Sciencespo" className="h-16"/>
    </div>
    <div className="grid grid-cols-2 gap-8 items-center justify-center mt-12">
        <img src="./logos/logo_nantesuniversite.png" alt="NantesUni" className="h-16"/>
        <img src="./logos/logo_nantesmetropole.png" alt="Nantesmetro" className="h-16"/>
    </div>
    </section>
  );
};

export default EndPage;

