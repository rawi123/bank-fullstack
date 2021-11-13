import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function UserActive({ user, updateSingleUser, setErr }) {
    const [active, setActive] = useState(user.isActive);

    useEffect(() => {
        const time = setTimeout(() => {
            handelChange()
        }, 500);
        return () => {
            clearTimeout(time);
        }
        // eslint-disable-next-line
    }, [active])

    const handelChange = async () => {
        try {
            if (user.isActive !== active) {
                const userTemp = await axios.put(`${process.env.REACT_APP_API}active/${user.passportID}`, { isActive: active })
                updateSingleUser(user.passportID, userTemp.data)
            }
        }
        catch (err) {
            setErr(true)
        }
    }
    return (
        <div>
            <span onClick={() => setActive(!active)}>{active ? <i className="fas fa-check cursor"></i> : <i className="fas fa-times cursor"></i>}</span>
        </div>
    )
}
