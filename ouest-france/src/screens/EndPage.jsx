import React from "react";
import { scrollToSection } from "../utils";

const EndPage = () => {

  return (
      <section
          className="h-full w-full flex flex-col snap-start justify-center items-center min-h-screen bg-white gap-20"
          id="endpage"
      >
          <a href="https://hyblab.polytech.univ-nantes.fr/" target="_blank" rel="noopener noreferrer">
              <img src="./logos/logo_hyblab.png" alt="HYBLAB" className="max-h-48"/>
          </a>

          <div className="grid grid-cols-2 gap-8 text-left">
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

          <div className="flex flex-wrap gap-8 items-center justify-center max-w-[800px] w-full mx-auto">
              <a href="https://www.agr.fr/" target="_blank" rel="noopener noreferrer">
                  <img src="./logos/logo_agr.png" alt="AGR" className="max-h-16"/>
              </a>
              <a href="https://www.ouestmedialab.fr/" target="_blank" rel="noopener noreferrer">
                  <img src="./logos/logo_oml.png" alt="Ouest Medialab" className="max-h-16"/>
              </a>
              <a href="https://polytech.univ-nantes.fr/" target="_blank" rel="noopener noreferrer">
                  <img src="./logos/logo_polytech.png" alt="Polytech Nantes" className="max-h-16"/>
              </a>
              <a href="https://www.sciencespo-rennes.fr/" target="_blank" rel="noopener noreferrer">
                  <img src="./logos/logo_sciencespo.svg" alt="SciencesPo Rennes" className="max-h-16"/>
              </a>
              <a href="https://www.univ-nantes.fr" target="_blank" rel="noopener noreferrer">
                  <img src="./logos/logo_nantesuniversite.png" alt="Nantes Université" className="max-h-16"/>
              </a>
              <a href="https://www.nantesmetropole.fr" target="_blank" rel="noopener noreferrer">
                  <img src="./logos/logo_nantesmetropole.png" alt="Nantes Métropole" className="max-h-16"/>
              </a>
              <div className="flex flex-col gap-2 justify-center items-center">
                  <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">
                      <img src="./logos/logo_cc.png" alt="CC BY 3.0 License" className="max-h-7"/>
                  </a>
                  <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
                      <img src="./logos/logo_opensource.png" alt="MIT License" className="max-h-7"/>
                  </a>
              </div>
          </div>
      </section>
  );
};

export default EndPage;

