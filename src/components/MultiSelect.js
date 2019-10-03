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
            onChange={e => {
                console.log('tirrreed', e && e.map(item => item.value), props.defaultValue);
                props.setValue(e ? e.map(item => item.value) : [])
            }}
            options={props.options}
        />
    );
}