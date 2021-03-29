import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginToBlogApp } from '../reducers/loginReducer'

//Login lomakkeelle oma komponentti
const LoginLomake = ({ onChangeUsername, onChangePassword, valueUsername, valuePassword, onSubmit }) => {
    return (
        <div>
            <h2>Login to apllication</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username <input
                        id='username'
                        type="text"
                        value={valueUsername}
                        name="Username"
                        onChange={onChangeUsername} />

                </div>
                <div>
                    password <input
                        id='password'
                        type="password"
                        value={valuePassword}
                        name="Password"
                        onChange={onChangePassword} />
                </div>
                <div>
                    <button
                        id='login-button'
                        type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

//----------------------- LOGIN-----------------------------------
const LoginForm = () => {
    //Kirjautumislomakkeen lähettämisestä vastaava metodi
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = (event) => {
        event.preventDefault()
        //Viedään username ja salasana loginReducerille
        dispatch(loginToBlogApp(username, password))

    }

    return (
        <div>
            <LoginLomake
                valueUsername={username}
                onChangeUsername={({ target }) => setUsername(target.value)}
                valuePassword={password}
                onChangePassword={({ target }) => setPassword(target.value)}
                onSubmit={handleLogin} />
        </div>
    )

}

export default LoginForm
  //----------------------- LOGIN LOPPUU-----------------------------------