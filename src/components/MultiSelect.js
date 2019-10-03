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
            defaultValue={props.defaultValue && props.defaultValue.map(i => props.options.filter(o => i.id === o.value)[0])}
            onChange={e => { props.setValue(e ? e.map(item => item.value) : []) }}
            options={props.options}
        />
    );
}