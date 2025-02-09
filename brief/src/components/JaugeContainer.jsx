import React from 'react';
import Box from '@mui/material/Box';    
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';

import Jauge from './Jauge.jsx'
import gesIcon from '../assets/ges.svg'
import happyIcon from '../assets/happy.svg'
import moneyIcon from '../assets/money.svg' 

const JaugeContainer = ({ money , happyness , ges , wth }) => {
    return (
        <Box display="flex" 
            flexDirection="column" 
            gap={1.5} 
            alignItems="center" 
            sx={{ width: `${wth}%`, }} 
            position="relative"
        >
            <Jauge value={money} thickness={15} color="#991756" icon={moneyIcon} />
            <Jauge value={happyness} thickness={15} color=" #991756" icon={happyIcon} />
            <Jauge value={ges} thickness={15} color=" #991756 " icon={gesIcon} />
        </Box>
    );
};

JaugeContainer.propTypes = {
    money: PropTypes.number.isRequired, 
    happyness: PropTypes.number.isRequired, 
    ges: PropTypes.number.isRequired, 
    wth: PropTypes.number, 
};

JaugeContainer.defaultProps = {
    wth: 100,
};

export default JaugeContainer;