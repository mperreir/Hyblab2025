import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';


const Jauge = ({ value, thickness, color , icon}) => {
  // Clamp the value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <Box display="flex" alignItems="flex-start" width="100%" position="relative">
      {/* Barre de progression */}
      <Box width="100%" >
        <LinearProgress
          variant="determinate"
          value={clampedValue}
          sx={{
            height: thickness,
            borderRadius: thickness / 2, // Arrondir les bords
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
            },
          }}
        />
      </Box>
      <CircleIcon
            sx={{
              color: color, // Couleur du cercle (modifiable)
              fontSize: thickness * 2, // Taille du cercle
              position: 'absolute',
              left: `${clampedValue}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

      {/* Image superposée à gauche de la barre */}
      {icon && (
        <Box
          component="img"
          src={icon}
          alt="Icon"
          sx={{
            position: 'absolute',
            left: `${clampedValue}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)', // Centrer verticalement
            width: thickness * 1.5, // Taille de l'image proportionnelle à l'épaisseur de la barre
            height: thickness * 1.5,
          }}
        />
      )}
    </Box>
  );
};

Jauge.propTypes = {
  value: PropTypes.number.isRequired, // Pourcentage requis
  thickness: PropTypes.number, // Épaisseur de la barre (optionnel)
  color: PropTypes.string, // Couleur de progression (optionnel)
  icon: PropTypes.string, // Lien de l'image locale ou externe
};

Jauge.defaultProps = {
  thickness: 5, // Épaisseur par défaut
  color: '#991756', // Couleur par défaut
  icon: null, // Pas de pictogramme par défaut
};



export default Jauge;
