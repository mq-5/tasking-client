import React, { } from "react";
import {
    Button,
    UncontrolledTooltip,
    UncontrolledPopover,
    PopoverBody, PopoverHeader
} from "reactstrap";

import ColorSelect from './ColorDotSelect'

function Priority(props) {
    const priorities = [...props.priorities].sort((p1, p2) => p1.order - p2.order)
    // console.log(priorities.slice(-1)[0])
    return (
        <div>
            <Button type="button" color='neutral' id="priority">
                <i style={{ fontSize: '1.2rem' }} className="fa fa-flag-o" aria-hidden="true">
                </i></Button>
            <UncontrolledTooltip placement="bottom" target="priority">
                Priority
			</UncontrolledTooltip>
            <UncontrolledPopover
                trigger="legacy"
                placement="bottom"
                target="priority"
                className="popover-primary"
            >
                <PopoverHeader>Priority</PopoverHeader>
                <PopoverBody className='' style={{ minWidth: '10rem' }}>
                    {/* {priorities.map(p => <>
                        <Button color='neutral' type='button' className='p-1 priority' id={`p-${p.id}`}
                            onClick={() => props.setPriorityId(p.id)} >
                            <i style={{ color: `${p.color}`, fontSize: '1rem' }} className="fa fa-flag" aria-hidden="true"></i>
                        </Button>
                        <UncontrolledTooltip placement="bottom" target={`p-${p.id}`}>
                            Priority {p.order}
                        </UncontrolledTooltip></>)} */}
                    <ColorSelect options={priorities.map(p => { return { color: p.color, label: `Priority ${p.order}`, value: p.id } })}
                        defaultValue={props.defaultValue || priorities.slice(-1)[0].id}
                        onChange={e => { props.setPriorityId(e.value); console.log(e.value) }} />
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    );
}


export default Priority;



