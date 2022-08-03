import React from 'react'

export const Input = (props) => {
    return (
        <React.Fragment>
            <input name={props.name} onChange={props.onChange}/>
        </React.Fragment>
    )
}


export const TextAreaInput = (props) => {
    return(
        <React.Fragment>
            <textarea/>
        </React.Fragment>
    );
}

export const SelectInput = (props) => {
    return(
        <React.Fragment>
            <select name={props.name} onChange={props.onChange}>
                <option>{props.default}</option>
                {
                    props.selection && props.selection.map(item => {
                        return( <option key={item.code}>{item.name}</option> );
                    })
                }
            </select>
        </React.Fragment>
    );
}
