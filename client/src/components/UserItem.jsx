import React from 'react'

const UserItem = (props) => {
    return (
        < div className="userItem" >
            {props.user.email}
        </div >
    )
}

export default UserItem