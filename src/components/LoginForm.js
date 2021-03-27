import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNewNotification, removeNotification, credentialsNotification } from '../reducers/notificationReducer'
import BlogForm from '../components/BlogForm'
import { BlogList } from '../components/BlogList'
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

//----------------------- LOGOUT JA LOGIN-----------------------------------
const LoginForm = () => {
    //Kirjautumislomakkeen lähettämisestä vastaava metodi
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)


    //Effect hook hakemaan locla storagesta loggautuneen käyttäjän tiedot
    //ettei pyydä sivun uudelleen latauksen yhteydessä uudelleen kirjautumaan
    //Efektin lopuussa parametrina oleva tyhjä taulukko "[]" varmistaa sen, että efekti suoritetaan 
    //ainoastaan kun komponentti renderöidään ensimmäistä kertaa
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const dispatch = useDispatch()
    //const useri = useSelector(state => state.user)
    const handleLogin = async (event) => {
        event.preventDefault()
        //console.log('logging in with', username, password)
        try {


            //Luodaan kantaan uusi käyttäjä
            const user = await loginService.login({
                username, password,
            })

            dispatch(loginToBlogApp(username, password))
            //Kirjautuneen käyttäjän tiedot local storageen, jotta pysyy aktiivisena
            //koko session ajan eikä esim. sivun uudelleen lataamisen yhteydessä pyydä
            //kirjautumaan uudelleen
            //Käyttäjän tietoja pystyy nyt tarkastella selaimen konsolista

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )


            //Lisätään käyttäjän token saataville "services/blogs.js" fileen
            //missä mm. tehdään http post pyyntö palvelimelle uuden blogin lisäämiseksi
            blogService.setToken(user.token)

            setUser(user)
            console.log('HANDLE LOGIN USER', user)
            //Nollataan kirjautumislomakkeen kentät, kun login nappia painettu
            setUsername('')
            setPassword('')
        } catch (exception) {
            //Luodaan notificaatio notificationReducerilla ks. "src/components/reducers/notificationReducer.js"
            //"src/components/Notification.js", "store.js" sekä "index.js"
            //Tällä ilmotaan, kun syöttää joko väärän usernamen tai passwordin
            dispatch(credentialsNotification())
            console.log('Wrong username or password')
            setTimeout(() => {
                dispatch(removeNotification())
            }, 5000)
        }
    }

    //Logout napin lähettämisestä vastaava metodi
    const handleLogout = (event) => {
        //Pitää tyhjätä selaimen loclastoragesta käyttäjä, jottei sivua uudelleen
        //ladattaessa taas olla loggautuneena
        window.localStorage.clear()
        //Tyhjätään token
        blogService.setToken('')
        //Tyhjätään käyttäjä
        setUser(null)
    }
    //Logoutnapin renderöinti
    const logoutForm = () => (
        <button onClick={handleLogout}>logout</button>
    )


    return (
        <div>
            {user === null
                ?
                <LoginLomake
                    valueUsername={username}
                    onChangeUsername={({ target }) => setUsername(target.value)}
                    valuePassword={password}
                    onChangePassword={({ target }) => setPassword(target.value)}
                    onSubmit={handleLogin} />
                :
                < div >
                    <p>{user.name} logged in {logoutForm()}</p>
                    <BlogForm />
                    <h2>YOUR BLOGS</h2>
                    <BlogList user={user} />
                </div >
            }
        </div>
    )

}

export default LoginForm
  //----------------------- LOGOUT JA LOGIN LOPPUU-----------------------------------