import React, { } from "react";
import {
    Button, Input,
    UncontrolledTooltip,
    UncontrolledPopover,
    PopoverBody, PopoverHeader,
    FormGroup, Label
} from "reactstrap";

function Label1(props) {
    const labels = props.labels
    console.log('labellll', labels)
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
                <PopoverBody style={{ minWidth: '8rem' }}>
                    <Input type="select" className='selectpicker' multiple
                        onChange={e => props.setLabelId(e.target.value)}>
                        {labels.map(label => {
                            return <option
                                value={label.id}
                                title={label.name}>
                                {label.name}
                            </option>
                        })}
                    </Input>
                    {labels.map(label => {
                        return <FormGroup check>
                            <Label check>
                                <Input type="checkbox" onChange={e => console.log(e.target.checked)} />{' '}
                                {label.name}
                                <span className="form-check-sign">
                                    <span className="check"></span>
                                </span>
                            </Label>
                        </FormGroup>
                    })}
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    );
}

export default Label1;