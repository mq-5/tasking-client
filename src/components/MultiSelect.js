import React from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

export default function MultiSelect(props) {
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            defaultValue={props.defaultValue}
            onChange={e => { props.setValue(e ? e : []) }}
            options={props.options}
        />
    );
}