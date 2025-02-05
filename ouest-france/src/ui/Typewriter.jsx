import { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 50, onComplete, onLoad }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (onLoad) onLoad();
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      // Appelle le callback quand l'écriture est terminée
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className="text-justify text-lg">
      <span className="whitespace-pre-wrap">
        {currentText}
        {currentIndex < text.length && (
          <span className="animate-pulse border-r-2 border-r-black ml-1" />
        )}
      </span>
    </div>
  );
};

export default Typewriter;