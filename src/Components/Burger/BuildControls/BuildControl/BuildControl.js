import React from 'react';
import './BuildControl.css'

const BuildControl = (props) => (
    <div className="BuildControl">
        <div className="Label">{props.label} </div>
        <button className="Less" 
        disabled={props.disabled}
        onClick={props.removed}>less</button>
        <button className="More" onClick={props.added}>More</button>
    </div>
)

export default BuildControl;