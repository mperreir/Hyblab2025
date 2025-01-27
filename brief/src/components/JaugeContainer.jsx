import React from 'react';
import Box from '@mui/material/Box';    
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';

import Jauge from './Jauge.jsx'
import gesIcon from '../assets/ges.png'
import happyIcon from '../assets/happy.png'
import moneyIcon from '../assets/money.png' 

const JaugeContainer = ({ money , happyness , ges , wth }) => {
    return (
        <Box display="flex" 
            flexDirection="column" 
            gap={1.5} 
            alignItems="center" 
            sx={{ width: "19px", padding: 2,}} 
            position="relative"
        >
            <Jauge value={money} thickness={15} color="#00ff00" icon={moneyIcon} />
            <Jauge value={happyness} thickness={15} color=" #ffff00" icon={happyIcon} />
            <Jauge value={ges} thickness={15} color=" #00ffff " icon={gesIcon} />
        </Box>
    );
};

JaugeContainer.propTypes = {
    money: PropTypes.number.isRequired, 
    happyness: PropTypes.number.isRequired, 
    ges: PropTypes.number.isRequired, 
    wth: PropTypes.number, 
};

Jauge.defaultProps = {
    wth: 100,
};

export default JaugeContainer;