import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginToBlogApp } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

//Login lomakkeelle oma komponentti
//HUOM! Bootstrap tyylit
const LoginLomake = ({ onChangeUsername, onChangePassword, valueUsername, valuePassword, onSubmit }) => {
    return (
        <div>
            <h2>Login to apllication</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        id='username'
                        type="text"
                        value={valueUsername}
                        name="Username"
                        onChange={onChangeUsername}
                    />
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        id='password'
                        type="password"
                        value={valuePassword}
                        name="Password"
                        onChange={onChangePassword}
                    />
                    <Button variant="primary" type="submit" id='login-button'>
                        login
                    </Button>
                </Form.Group>
            </Form>
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