import React from 'react'

function Alerts(props) {
    
    return (
        <div style={{height: '50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <b> {props.alert.msg} </b>
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
        </div>
    )
}

export default Alerts
