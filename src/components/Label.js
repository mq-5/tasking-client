import React, { } from "react";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {
    Button, Input,
    UncontrolledTooltip,
    UncontrolledPopover,
    PopoverBody, PopoverHeader,
    FormGroup, Label
} from "reactstrap";

const animatedComponents = makeAnimated();

function MultiSelect(props) {
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            defaultValue={props.defaultValue && props.defaultValue.map(i => props.options.filter(o => i.id === o.value)[0])}
            onChange={e => { props.setLabels(e ? e.map(item => item.value) : []) }}
            options={props.options}
        />
    );
}
function LaBel(props) {
    const { labelList, labels } = { ...props }
    // console.log('labellll', labelList)
    return (
        <div>
            <Button type="button" color='neutral' id="tag" data-toggle='popover' >
                <i style={{ fontSize: '1.2rem' }} aria-hidden="true"
                    className="nc-icon nc-tag-content" />
            </Button>
            <UncontrolledTooltip placement="bottom" target="tag">
                Label
			</UncontrolledTooltip>
            <UncontrolledPopover
                trigger="legacy"
                placement="bottom"
                target="tag"
                className="popover-primary"
            >
                <PopoverHeader>Labels</PopoverHeader>
                <PopoverBody style={{ minWidth: '10rem', textAlign: 'left' }}>
                    {/* <Input type="select" className='selectpicker' multiple
                        onChange={e => { props.setLabels(labelList.concat(e.target.value)) }}>
                        {labels.map(label => {
                            return <option
                                value={label.id}
                                title={label.name}>
                                {label.name}
                            </option>
                        })}
                    </Input> */}
                    <MultiSelect options={labels.map(item => { return { value: item.id, label: item.name } })}
                        defaultValue={labelList} setLabels={props.setLabels} />
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    );
}

export default LaBel;

