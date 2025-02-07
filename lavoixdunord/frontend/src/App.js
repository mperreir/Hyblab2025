import React from "react";
import LayoutWithMusic from './music/LayoutWithMusic';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page0 from "./page0/page0";
import QuestionPage from "./QuestionPage/QuestionPage";
import DifficultyPage from "./DifficultyPage/DifficultyPage";
import HomePage from "./homePage/homePage";
import RulesPage from "./pageRegles/pageRegles";
import StartPage from "./startPage/startPage";
import TransitionPage from "./TransitionPage/TransitionPage";
import Credit from "./creditPage/creditPage";
import IA from "./iaPage/iaPage";
import FinalPage from "./finalPage/finalPage";
import NavBarComponent from "./NavBarComponent/NavBarComponent";

const basename = process.env.REACT_APP_BASENAME || "/";

function App() {
  const [showMap, setShowMap] = React.useState({ btn: false, map: false });
  const [isSoundsMuted, setIsSoundMuted] = React.useState(true);

  return (
    <Router basename={basename}>
      <LayoutWithMusic
        isMuted={isSoundsMuted}
        setIsMuted={setIsSoundMuted}
      />
      <div className="mobile-container">
        <NavBarComponent
          showMap={showMap}
          setShowMap={setShowMap}
        />
        <Routes>
          <Route path="/" element={<Page0 />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/regles" element={<RulesPage />} />
          <Route path="/difficulty" element={<DifficultyPage />} />
          <Route path="/start/:difficulty" element={<StartPage />} />
          <Route path="/start/:difficulty/:id" element={
            <QuestionPage
              showMap={showMap}
              setShowMap={setShowMap}
              isMuted={isSoundsMuted}
              setIsMuted={setIsSoundMuted}
            />
          }
            // key={Date.now()}
          />
          <Route path="/final" element={<FinalPage />} />
          <Route path="/transition/:difficulty/:level_id" element={<TransitionPage />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/ia" element={<IA />} />
          <Route path="/final" element={<FinalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;