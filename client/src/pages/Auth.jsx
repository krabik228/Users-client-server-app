import React, { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import { registration, login } from './../http/userAPI';
import { observer } from 'mobx-react-lite';
import UserStore from './../store/UserStore';
import { Context } from './../index';
import { USERS_ROUTE } from './../utils/consts';

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(USERS_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <div className='container authContainer'>
            <div className="authContainer__modal">
                <h2>{isLogin ? 'Authorization' : 'Registration'}</h2>
                <form >
                    <input
                        type="text"
                        placeholder='enter email..'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='enter password..'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className='authContainer__modal__buttons'>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <br /><Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                            </div>
                            :
                            <div>
                                Уже есть аккаунт? <br /><Link to={LOGIN_ROUTE}>Войти</Link>
                            </div>
                        }
                        <button type="button" onClick={click}>{isLogin ? 'Login' : 'Register'}</button>
                    </div>
                </form>
            </div>
        </div >
    )
})

export default Auth