import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { USERS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
    const [burgerActive, setBurgerActive] = useState(false)
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <header>
            <div className={burgerActive ? "burger active" : "burger"} onClick={() => {
                setBurgerActive(!burgerActive)
            }}>
                <span className={burgerActive ? "active" : ""}></span>
            </div>

            <div className="header">
                <Link
                    to={USERS_ROUTE}
                    className={burgerActive ? "logo active" : "logo"}
                    onClick={() => { setBurgerActive(false) }}>
                    USERS
                </Link>
                <div className={burgerActive ? "main-header active" : "main-header"}>
                    {user.isAuth ?
                        <nav className={burgerActive ? "nav active" : "nav"}>
                            <button
                                className='nav__btn'
                                onClick={() => logOut()}>
                                Logout
                            </button>
                        </nav>
                        :
                        <nav className={burgerActive ? "nav active" : "nav"}>
                            <button className='nav__btn' onClick={() => navigate(LOGIN_ROUTE)}>Authorization</button>
                        </nav>}
                </div>
            </div>
        </header >
    )
})

export default NavBar