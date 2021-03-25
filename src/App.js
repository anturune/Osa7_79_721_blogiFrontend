import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import './index.css'
import blogService from './services/blogs'
//Login pyyntö 
import loginService from './services/login'
//Buttonien näkyvyyttä säätelemään
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { removeNotification, likeNotification, credentialsNotification, deleteNotification } from './reducers/notificationReducer'
import { Notification } from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { BlogList } from './components/BlogList'


const App = () => {
  const [blogs, setBlogs] = useState([])
  //Tilat usernamelle ja salasanalle
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  //console.log('APP:sta kaikki blogit', blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    //Jos ei lisätä hakasulkeiden sisään "dispatch" tulee eslint herja
    //toimisi ilman "dispatch" tekstiä myös vaikka herja jäisikin
  }, [dispatch])

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

  //Tämä tarvitaan reduxia/reducereita varten
  //const dispatch = useDispatch()
  //----------------------- LOGOUT JA LOGIN-----------------------------------
  //Kirjautumislomakkeen lähettämisestä vastaava metodi
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      //Kirjautuneen käyttäjän tiedot local storageen, jotta pysyy aktiivisena
      //koko session ajan eikä esim. sivun uudelleen lataamisen yhteydessä pyydä
      //kirjautumaan uudelleen
      //Käyttäjän tietoja pystyy nyt tarkastella selaimen konsolista
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      console.log('LOGGAUTUNUT KÄYTTÄJÄ', user)
      //Lisätään käyttäjän token saataville "services/blogs.js" fileen
      //missä mm. tehdään http post pyyntö palvelimelle uuden blogin lisäämiseksi
      blogService.setToken(user.token)
      setUser(user)
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

  //Tämä sitä varten, että voidaan renderöidä ehdollisesti eli jos ei ole loggautunut
  //Näytetään login formi, muutoin blogiformi
  const loginForm = () => (

    <form onSubmit={handleLogin}>
      <div>
        <h2>Login to apllication</h2>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        id='login-button'
        type="submit">login</button>
    </form>
  )
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

  //----------------------- LOGOUT JA LOGIN LOPPUU-----------------------------------
  /*

  
 */

  //-----------------LIKETYKSEN LISÄÄMINEN ALKAA-------------------------------------------

  const updateBlog = async (blogObject, id) => {

    //Estää lomakkeen lähetyksen oletusarvoisen toiminnan, 
    //joka aiheuttaisi mm. sivun uudelleenlatautumisen. 
    //event.preventDefault()
    console.log('UUSI BLOGI ON PÄIVITTYMÄSSÄ JA SEN ID', id)

    /*
    //Piilotetaan luomislomake kutsumalla noteFormRef.current.toggleVisibility() 
    //samalla kun uuden muistiinpanon luominen tapahtuu
    blogFormRef.current.toggleVisibility()

    //Viedään käyttäjän token "services/blogs" fileen, jossa uuden blogin
    blogService.setToken(user.token)
*/
    try {
      //Luodaan blogi kantaan HUOM! async/await
      await blogService.updateBlog(blogObject, id)

      //Haetaan kaikki blogit kannasta uuden lisäyksen jälkeen
      //HUOM! async/await
      const blogsAfterUpdate = await blogService.getAll()

      //Päivitetään näytettävää blogilistaa sis. uuden blogin
      setBlogs(blogsAfterUpdate.map(blog => blog))

      //Luodaan notificaatio notificationReducerilla ks. "src/components/reducers/notificationReducer.js"
      //"src/components/Notification.js", "store.js" sekä "index.js"
      dispatch(likeNotification(`A blog ${blogObject.title} by  ${user.name}  successfully updated`))

      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      /*
      //Onnistuneesta lisäyksestä selaimeen viesti 5 sec
      setAddedMessage(`A blog ${blogObject.title} by  ${user.name}  successfully updated`)
      setTimeout(() => {
        setAddedMessage(null)
      }, 5000)
      */
      //Jos lisääminen ei onnistu, annetaan herja käyttäjälle
    } catch (exception) {
      //setErrorMessage('Jokin meni pieleen')
      console.log('Jokin meni pieleen')
      setTimeout(() => {
        //setErrorMessage(null)
      }, 5000)
    }

  }

  //-----------------LIKETYKSEN LISÄÄMINEN LOPPUU-------------------------------------------

  //-----------------BLOGIN POISTAMINEN ALKAA-------------------------------------------
  const deleteBlog = async (blogToBeDeleted) => {
    console.log('BLOG TO BE DELETED ', blogToBeDeleted)
    //Viedään käyttäjän token "services/blogs" fileen, jossa blogin
    blogService.setToken(user.token)

    //Blogin poistamine jos hyväksyy pop upissa "OK" buttonilla
    if (window.confirm("Remove blog " + blogToBeDeleted.title + " by " + blogToBeDeleted.author + "?")) {
      try {
        //Luodaan blogi kantaan HUOM! async/await
        await blogService.deleteBlog(blogToBeDeleted.id)
        //Haetaan kaikki blogit kannasta deletoinnin jälkeen
        //HUOM! async/await
        const blogsAfterDelete = await blogService.getAll()
        //Päivitetään näytettävää blogilistaa ei sis. deletoitua blogia
        setBlogs(blogsAfterDelete.map(blog => blog))

        //Onnistuneesta deletoinnista selaimeen viesti 5 sec
        //Luodaan notificaatio notificationReducerilla ks. "src/components/reducers/notificationReducer.js"
        //"src/components/Notification.js", "store.js" sekä "index.js"
        dispatch(deleteNotification())

        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)


        //Jos lisääminen ei onnistu, annetaan herja käyttäjälle
      } catch (exception) {
        //setErrorMessage('Jokin meni pieleen')
        console.log('Jokin meni pieleen ')
        setTimeout(() => {
          //setErrorMessage(null)
        }, 5000)

      }
    }

  }

  //-----------------BLOGIN POISTAMINEN LOPPUU-------------------------------------------


 
  return (
    <div>
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in {logoutForm()}</p>
          <BlogForm />
          <h2>YOUR BLOGS</h2>
          <BlogList user={user} />
        </div>
      }
    </div>
  )
}

export default App