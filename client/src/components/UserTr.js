import axios from 'axios'
import React from 'react'
import UserActive from './UserActive';
export default function UserTr({ data,setErr, setData, user,updateSingleUser }) {
    const delUser = async () => {
        try {
            await axios.delete(process.env.REACT_APP_API + user.passportID);
            const dataTemp = data.filter(val => Number(user.passportID) !== Number(val.passportID));
            setData(dataTemp);
        }
        catch (err) {
            setErr(true);
            setTimeout(() => {
                setErr(false);
            }, 2000);
        }
    }

    return (
        <tr>
            <th scope="row">
                {user.passportID}
            </th>
            <td>
                {user.cash}$
            </td>
            <td>
                {user.credit}$
            </td>
            <td>
                <UserActive setErr={setErr} updateSingleUser={updateSingleUser} data={data} setData={setData} user={user}/>
            </td>
            <td>
                <i className="fas fa-trash-alt cursor" onClick={delUser}></i>
            </td>

        </tr>
    )
}
