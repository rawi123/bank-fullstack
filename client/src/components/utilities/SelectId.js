import React from 'react'
import { FormGroup, Label, Input } from "reactstrap"
export default function SelectId({ users, setId }) {

    return (

        <FormGroup onChange={(e) => setId(e.target.value)}>
            <Label for="select">
                User id:
            </Label>
            <Input
                id="select"
                name="select"
                type="select"
            >
                <option>select user</option>
                {users.map(user =>
                    user.isActive ? <option key={user.passportID}>
                        {user.passportID}
                    </option> : <></>
                )}
            </Input>
        </FormGroup>
    )
}
