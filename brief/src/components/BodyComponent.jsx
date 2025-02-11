import React, { useEffect, useState } from 'react';

function BodyComponent() {
  const [message, setMessage] = useState('');

  // Utilisation de useEffect pour récupérer le message dès le chargement du composant
  useEffect(() => {
    fetch('api/message')
      .then(response => response.json())  // On suppose que l'API renvoie un JSON
      .then(data => {
        setMessage(data.message);  // On met à jour le state avec le message reçu
      })
      .catch(err => console.error('Error fetching message:', err));  // En cas d'erreur
  }, []);

  return (
    <div>
      <h1>Message from Backend:</h1>
      <p>{message ? message : 'Loading...'}</p>
    </div>
  );
}
export default BodyComponent;
