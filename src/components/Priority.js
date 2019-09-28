import React, { } from "react";
import {
    Button,
    UncontrolledTooltip,
    UncontrolledPopover,
    PopoverBody, PopoverHeader
} from "reactstrap";


function Priority(props) {
    const priorities = [...props.priorities].sort((p1, p2) => p1.order - p2.order)

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
                <PopoverBody className='d-flex'>
                    {priorities.map(p => <>
                        <Button color='neutral' type='button' className='p-1 priority' id={`p-${p.id}`}
                            onClick={() => props.setPriorityId(p.id)} >
                            <i style={{ color: `${p.color}`, fontSize: '1rem' }} className="fa fa-flag" aria-hidden="true"></i>
                        </Button>
                        <UncontrolledTooltip placement="bottom" target={`p-${p.id}`}>
                            Priority {p.order}
                        </UncontrolledTooltip></>)}
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    );
}


export default Priority;