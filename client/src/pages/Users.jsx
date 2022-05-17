import React from 'react'
import UserItem from '../components/UserItem'
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { fetchUsers } from '../http/userAPI';

const Users = observer(() => {
    const { _users, setUsers } = useContext(Context)
    let selected
    useEffect(() => {
        fetchUsers().then(data => setUsers(data))
    }, [])
    const shuffled = _users.slice().sort(() => 0.5 - Math.random());
    selected = shuffled.slice(0, 5);

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