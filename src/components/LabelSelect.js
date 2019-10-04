import React, { useState } from "react";
import {
    Button,
    UncontrolledTooltip,
    UncontrolledPopover,
    PopoverBody, PopoverHeader
} from "reactstrap";
import MultiSelect from './MultiSelect'

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
                    <MultiSelect
                        options={labels.map(item => { return { value: item.id, label: item.name } })}
                        defaultValue={labelList}
                        setValue={props.setLabels} />
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    );
}

export default LaBel;

