/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'; 
import '../style/header.css';

const SidePanel = ({ side }) => {
  return (
   <></>
        
  );
};

SidePanel.propTypes = {
  side: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default SidePanel;
