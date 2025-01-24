import React, { useState, useEffect } from 'react';

function TextFromJson() {
  const [text, setText] = useState('Chargement...');

  useEffect(() => {
    // Charge le fichier JSON
    fetch('./../../public/data/debut/sources_energie.json') // Assurez-vous que le fichier est accessible à cette URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du fichier JSON');
        }
        return response.json();
      })
      .then((data) => {
        setText(data.text); // Met à jour le texte avec celui du fichier JSON
      })
      .catch((error) => {
        console.error('Erreur :', error);
        setText('Erreur lors du chargement du texte');
      });
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{text}</p>
    </div>
  );
}

export default TextFromJson;
