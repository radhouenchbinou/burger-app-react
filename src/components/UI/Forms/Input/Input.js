import React from 'react'

import classes from './Input.css'

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid)
    }
    console.log('invalid:', props.invalid)
    console.log(inputClasses)

    switch (props.elementType) {
        case ('select'):
            inputElement = (<select
                value={props.value}
                className={inputClasses.join(' ')} onChange={props.changed}>
                {
                    props.elementConfig.options.map(value => (
                        <option key={value.value} value={value.value}>{value.displayValue}</option>))
                }
            </select>);
            break;
        case ('textarea'):
            inputElement = <textarea
                value={props.value}
                className={inputClasses.join(' ')}
                {...props.elementConfig} onChange={props.changed}

            />;
            break;
        default:
            inputElement = <input
                value={props.value}
                {...props.elementConfig}
                className={inputClasses.join(' ')} onChange={props.changed}
            />
    }

    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>)
}

export default Input
