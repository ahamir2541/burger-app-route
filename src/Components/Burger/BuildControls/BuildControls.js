import React from 'react';
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label : 'Salad', type : 'salad' },
    { label : 'Bacon', type : 'bacon' },
    { label : 'Cheese', type : 'cheese' },
    { label : 'Meat', type : 'meat' },
]

const BuildControls = (props) => (
    <div className="BuildControls">
        <p>Current Price : <strong> {props.price.toFixed(2)} </strong> </p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.addedIngredients(ctrl.type) }
            removed={() => props.removedIngredients(ctrl.type) }
            disabled={props.disabled[ctrl.type]} />
        ))}
        <button
        onClick={props.ordered}
        disabled={!props.purchasable} 
        className="OrderButton">ORDER NOW</button>
    </div>
)

export default BuildControls;