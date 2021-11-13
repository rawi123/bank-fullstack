import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import AlertMsg from "./utilities/AlertMsg"

export default function Add({ data, setData }) {
    const [err, setERR] = useState(false);
    const [message, setMessage] = useState("");
    const [input, setInput] = useState({
        passportID: "",
        cash: 0,
        credit: 0,
        isActive: true
    })

    const setErrorMessage = (message) => {
        setERR(true);
        setMessage(message);
    }

    const add = async (e) => {
        e.preventDefault()
        try {
            if (data.find(user => Number(user.passportID) === Number(input.passportID))) {
                return setErrorMessage("User alreday exists");
            }
            if (!input.passportID || !/^[0-9]*$/g.test(input.passportID)) {
                return setErrorMessage("Inavlid passport id");
            }
            const user = await axios.post(process.env.REACT_APP_API, input);
            setData([...data, user.data])
            setErrorMessage("User added successfully");
        }
        catch (err) {

            setErrorMessage("ERROR")
        }

    }

    const handelChange = (e) => {
        setERR(false);
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <Form onSubmit={add}>
                <Row form>
                    <Col md={5}>
                        <Label >Passport number </Label>
                        <Input
                            name="passportID"
                            placeholder="Passport"
                            onChange={handelChange}
                        />
                        <FormGroup />
                        <Label >cash</Label>
                        <Input
                            name="cash"
                            placeholder="Cash"
                            type="Number"
                            onChange={handelChange}
                        />
                        <FormGroup />
                        <Label >credit</Label>
                        <Input
                            name="credit"
                            placeholder="Credit"
                            type="Number"
                            onChange={handelChange}
                        />
                        <FormGroup />
                        <Label >Active</Label>
                        <Input
                            onChange={(e) => e.target.value === "True" ? setInput({ ...input, isActive: true }) : setInput({ ...input, isActive: false })}
                            name="select"
                            type="select"
                        >
                            <option>
                                True
                            </option>
                            <option>
                                False
                            </option>
                        </Input>
                        <FormGroup />
                    </Col>
                </Row>
                <Button>
                    Add
                </Button>
            </Form>
            <AlertMsg err={err} message={message} condition={message === "User added successfully" ? "success" : "danger"} ></AlertMsg>
        </div>
    )
}
