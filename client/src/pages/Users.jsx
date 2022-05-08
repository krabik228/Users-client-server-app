import React from 'react'
import UserItem from '../components/UserItem'
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { fetchUsers } from '../http/userAPI';

const Users = observer(() => {
    const { user } = useContext(Context)
    let selected
    useEffect(() => {
        fetchUsers().then(data => user.setUsers(data))
    }, [])
    const shuffled = user._users.sort(() => 0.5 - Math.random());
    selected = shuffled.slice(0, 5);
    console.log(selected)
    return (

        <div className='usersContainer'>
            {
                selected.map(user =>
                    <UserItem key={user.id} user={user} />
                )
            }

        </div>
    )
})

export default Users