import React from 'react';

const Actions = (props) => (
  <div>
    <button 
      className="big-button"
      onClick={props.pickOption}
      disabled={!props.hasOptions}
      >What should i do?</button>
  </div>
)

export default Actions;