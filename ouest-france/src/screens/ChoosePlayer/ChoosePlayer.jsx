// src/screens/Home.jsx
import React, {useState} from "react";
import './choosePlayer.css';

const ChoosePlayer = ({onSelectPlayer}) => {
    const [hovered, setHovered] = useState(null);

  return (
      <section
          className={"h-full w-full snap-start flex items-center justify-center " + hovered}
          id="choose-player"
      >
          <div
              onMouseEnter={() => setHovered('hv-left')}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                  onSelectPlayer("player1")
              }}
              className='choice left'>
              <img src={"./pavon.jpg"} alt={"Pavon"} />
              <h1>Matthieu PAVON</h1>
              <p>Golfeuse française de renom et multiple championne
                  sur le circuit LPGA Celine est une figure emblématique
                  du golf féminin. Elle est reconnue pour sa précision,
                  sa constance et son rôle de modèle dans le sport.</p>
          </div>
          <div
              onMouseEnter={() => setHovered('hv-right')}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                  onSelectPlayer("player2")
              }}
              className='choice right'>
              <img src={"./boutier.jpg"} alt={"boutier"}/>
              <h1>Celine BOUTIER</h1>
              <p>Golfeuse française de renom et multiple championne
                  sur le circuit LPGA Celine est une figure emblématique
                  du golf féminin. Elle est reconnue pour sa précision,
                  sa constance et son rôle de modèle dans le sport.</p>
          </div>
      </section>
  );
};

export default ChoosePlayer;
