import React from 'react';
import './Input.css'

const Input = (props) => {
    let InputElement = null
    const inputClasses = ['inputElement']

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push('Invalid')
    }

    switch(props.elementType){
        case('input') :
            InputElement = <input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value} onChange={props.changed} />
            break;
        case('textarea') :
            InputElement = <textarea 
            className={inputClasses} 
            {...props.elementConfig}
            value={props.value} onChange={props.changed} />
            break;
        case('select') :
            InputElement = (
            <select 
                className={inputClasses}            
                value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value}
                         value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
            </select>
            )
            break;
        default : 
            InputElement = <input 
            className={inputClasses} 
            {...props.elementConfig}
            value={props.value} onChange={props.changed} />
            
    }
    return (
        <div className="Input">
            <label className="Label">{props.label} </label>
            {InputElement}
        </div>
    );
};

export default Input;