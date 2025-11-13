import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png'

import './InfoBar.css';

const InfoBar = ({ room, toggleUsers }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <button className="menuBtn" onClick={toggleUsers}>☰</button>
      <h3>{room}</h3>
    </div>
     <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;