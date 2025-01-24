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
              className='choice left'>
              <img src={"./pavon.jpg"} alt={"Pavon"} />
              <h1 className="divider">La Fusée</h1>
              <div className="content">
                  <h1>Matthieu PAVON</h1>
                  <p>Matthieu Pavon est un golfeur professionnel français évoluant
                      sur le circuit européen, connu pour sa puissance au drive et
                      ses performances prometteuses dans les grands tournois.
                      Il incarne l'avenir du golf masculin en France.</p>
                  <button onClick={() => {
                      onSelectPlayer("player1")
                  }}
                          className="contained">Quiz</button>

              </div>
          </div>
          <div
              onMouseEnter={() => setHovered('hv-right')}
              onMouseLeave={() => setHovered(null)}
              className='choice right'>
              <img src={"./boutier.jpg"} alt={"boutier"}/>
              <h1 className="divider">La Machine</h1>
              <div className="content">
                  <h1>Celine BOUTIER</h1>
                  <p>Golfeuse française de renom et multiple championne
                      sur le circuit LPGA Celine est une figure emblématique
                      du golf féminin. Elle est reconnue pour sa précision,
                      sa constance et son rôle de modèle dans le sport.</p>
                  <button onClick={() => {
                      onSelectPlayer("player2")
                  }}
                          className="contained">Quiz</button>

              </div>
          </div>
      </section>
  );
};

export default ChoosePlayer;
