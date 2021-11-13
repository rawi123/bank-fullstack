import React, { useState, useEffect } from 'react'
import { Button, Col, Form, FormGroup, Input } from 'reactstrap'
import SelectId from "./utilities/SelectId"
import axios from 'axios';
import AlertMsg from './utilities/AlertMsg';

export default function Transfer({ data, setData, updateSingleUser }) {
    const [dataSend, setDataSend] = useState({
        send: [],
        recive: []
    });
    const [input, setInput] = useState({
        id1: false,
        id2: false,
        ammount: 0
    })
    const [err, setERR] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setDataSend({
            send: [...data],
            recive: [...data]
        })
    }, [data])

    const setErrorMessage = (message) => {
        setERR(true);
        setMessage(message);
    }

    const setId1 = (id) => {
        setInput({
            ...input,
            id1: Number(id)
        })
        const temp = [...data].filter(user => user.passportID !== Number(id));
        setDataSend({
            ...dataSend,
            send: temp
        })
    }

    const setId2 = (id) => {
        setInput({
            ...input,
            id2: Number(id)
        })
        const temp = [...data].filter(user => user.passportID !== Number(id));
        setDataSend({
            ...dataSend,
            recive: temp
        })
    }

    const handelTransfer = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}send/${input.id1}/recive/${input.id2}`, { ammount: Number(input.ammount) });
            updateSingleUser(input.id1, res.data.sender);
            updateSingleUser(input.id2, res.data.reciver);
            setErrorMessage("Transaction completed")
        }
        catch {
            setErrorMessage("Invalid transaction")
            console.log("err");
        }
    }

    return (
        <div>
            <h2>Transfer</h2>
            <Form onSubmit={handelTransfer}>
                <Col md={5}>
                    Sender :<SelectId users={dataSend.recive} setId={setId1}></SelectId>
                    Reciver: <SelectId users={dataSend.send} setId={setId2}></SelectId>
                    <Input placeholder="Ammount" onChange={(e) => setInput({ ...input, ammount: e.target.value })}></Input>
                </Col>
                <FormGroup />
                <Button>Confirm</Button>
            </Form>
            <AlertMsg message={message} err={err} condition={message === "Transaction completed" ? "success" : "danger"}></AlertMsg>
        </div>
    )
}
