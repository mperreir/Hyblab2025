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
              {/*Matthieu PAVON*/}
          </div>
          <div
              onMouseEnter={() => setHovered('hv-right')}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                  onSelectPlayer("player2")
              }}
              className='choice right'>
              <img src={"./boutier.jpg"} alt={"boutier"}/>
              {/*Celine BOUTIER*/}
          </div>
      </section>
  );
};

export default ChoosePlayer;
