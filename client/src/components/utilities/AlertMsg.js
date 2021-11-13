import React from 'react'

export default function AlertMsg({message,err,condition}) {
    return (
        <>
            {err ? <div className={`alert alert-${condition}`} role="alert">
                {message}
            </div> : null}
        </>
    )
}
