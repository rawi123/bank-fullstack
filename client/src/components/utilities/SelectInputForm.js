import React, { useEffect, useState } from 'react'
import { Form, Col, Input, FormGroup, Button } from 'reactstrap'
import AlertMsg from './AlertMsg';
import SelectId from './SelectId';

export default function SelectInputForm({ errMsg, err, setERR, handelDeposit, data }) {

    const [input, setInput] = useState({
        id: false,
        ammount: 0
    })
    const [pickedUser, setPickedUser] = useState(false);

    useEffect(() => {
        setPickedUser(data.find(user => user.passportID === Number(input.id)));
        // eslint-disable-next-line
    }, [data])

    const setId = (id) => {
        setInput({
            ...input,
            id: Number(id)
        })
        setPickedUser(data.find(user => user.passportID === Number(id)))
    }

    return (
        <>
            {pickedUser ? <>
                <p>User cash: {pickedUser.cash}$</p>
                <p>User credit: {pickedUser.credit}$</p>
            </> : null}
            <Form onSubmit={(e) => input.id? handelDeposit(e, input):e.preventDefault()} onChange={() => setERR(false)}>
                <Col md={5}>
                    <SelectId users={data} setId={setId} />
                    <Input
                        placeholder="Ammount"
                        onChange={(e) => setInput({ ...input, ammount: e.target.value })} />
                    <FormGroup />
                    <Button>Confirm</Button>
                </Col>
            </Form>
            <AlertMsg message={errMsg} err={err} condition={errMsg === "Updated Successfully!" ? "success" : "danger"}></AlertMsg>
        </>
    )
}
