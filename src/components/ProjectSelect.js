import React, { } from "react";
import {
    Button, Input,
    UncontrolledTooltip,
    UncontrolledPopover,
    PopoverBody, PopoverHeader
} from "reactstrap";

function Project(props) {
    return (
        <div>
            <Button id="project" type="button" color='neutral' data-toggle="popover" onClick={function () { }}>
                <i style={{ fontSize: '1.2rem' }} className="nc-icon nc-box" />
            </Button>
            <UncontrolledTooltip placement="bottom" target="project">
                Project
			</UncontrolledTooltip>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="project">
                <PopoverHeader>Project</PopoverHeader>
                <PopoverBody style={{ minWidth: '8rem' }}>
                    <Input type="select"
                        className="selectpicker"
                        defaultValue={props.default_project ? props.default_project.id : props.defaultValue}
                        onChange={e => props.setProjectId(e.target.value)}>
                        {props.projects.map(project => {
                            return <option value={project.id}>
                                {project.name} </option>
                        })}
                    </Input>
                    {/* <Select options={props.projects.map(item => { return { value: item.id, label: item.name } })}
                        onChange={e => console.log(e.value)} /> */}
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    );
}

export default Project;