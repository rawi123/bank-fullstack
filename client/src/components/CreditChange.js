import React, { useState } from 'react'
import SelectInputForm from './utilities/SelectInputForm'
import { handelDeposit } from './utilities/withdrawDeposit';

export default function CreditChange({ data, setData, updateSingleUser }) {

    const [err, setERR] = useState(false);
    const [message, setMessage] = useState("");


    const setErrorMessage = (message) => {
        setERR(true);
        setMessage(message);
    }


    const sendToHandelDeposit=(e, input)=>{
        handelDeposit(e,input,setErrorMessage,updateSingleUser,process.env.REACT_APP_API + "credit/" + input.id,data);
    }



    return (
        <div>
            <h2>Change credit</h2>
            <SelectInputForm errMsg={message} err={err} handelDeposit={sendToHandelDeposit} setERR={setERR} data={data} />
        </div>
    )
}
