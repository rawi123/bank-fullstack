import React, { useState } from 'react'
import { Table } from 'reactstrap'
import UserTr from "./UserTr"
import { Alert } from 'reactstrap';

export default function Home({ updateSingleUser,data, setData }) {
    const [err, setErr] = useState(false);
    const [flag,setFlag]=useState(false);

    const sortBy=(variable)=>{
        const dataTemp=[...data].sort((a,b)=>flag?a[variable]-b[variable]:b[variable]-a[variable]);
        setFlag(!flag)
        setData([...dataTemp]);
    }

    return (<>
        <Table
            responsive
        >
            <thead >
                <tr>
                    <th className="cursor" onClick={()=>sortBy("passportID")}>
                        #
                    </th>
                    <th className="cursor" onClick={()=>sortBy("cash")}>
                        Cash
                    </th>
                    <th className="cursor" onClick={()=>sortBy("credit")}>
                        Credit
                    </th>
                    <th className="cursor" onClick={()=>sortBy("isActive")}>
                        Active
                    </th>
                </tr>
            </thead>
            <tbody >
                {data.map(user => <UserTr key={user.passportID} setErr={setErr} setData={setData} data={data} user={user} updateSingleUser={updateSingleUser}/>)}
            </tbody>
        </Table>
        {err ? <Alert
            color="danger"
        >
            "Delete Failed"
        </Alert> : null}
    </>
    )
}
