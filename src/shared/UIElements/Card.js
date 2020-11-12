import React from 'react';

import './Card.css';

const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
    {/* notice how template literal is being used to apply css styling based on where we put this component
    this shows high level of reusability. */}
      {props.children}
    </div>
  );
};

export default Card;
