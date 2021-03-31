import React, { useEffect } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { Notification } from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import { BlogList } from './components/BlogList'
import { UserList } from './components/UserList'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import './index.css'

import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  Link,
} from "react-router-dom"
/*
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom"
*/

const Menu = ({ user }) => {
  const padding = {
    paddingRight: 10
  }
  return (
    <div className="navbar">
      <Link to='/blogs' style={padding}>Blogs</Link>
      <Link to='/users' style={padding}>Users</Link>
      <LogoutForm user={user.value.name} />
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  //Haetaan login storen tilasta käyttäjä
  const user = useSelector(state => state.login)
  //console.log('UUSERI', user.value)

  //Haetaan aluksi effect -hookilla kaikki blogit
  useEffect(() => {
    dispatch(initializeBlogs())
    //Jos ei lisätä hakasulkeiden sisään "dispatch" tulee eslint herja
    //toimisi ilman "dispatch" tekstiä myös vaikka herja jäisikin
  }, [dispatch])


  useEffect(() => {
    dispatch(initializeUsers())
    //Jos ei lisätä hakasulkeiden sisään "dispatch" tulee eslint herja
    //toimisi ilman "dispatch" tekstiä myös vaikka herja jäisikin
  }, [dispatch])

  //--------------YKSITTÄISEN USERIN JA BLOGIN HAKEMINEN ID:N PERUSTEELLA/ROUTER ALKAA----------------
  //"routeMatch":n käyttö, kun halutaan käyttää yksittäisen userin
  //etsiminen ID:n perusteella ennen komponentille lähettämistä
  //HUOM! Käytettäessä useRouteMatch:a pitää siirtää Router tägi ulkopuolelle,
  //tässä siirretty "index.js"-fileen
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const userById = match
    ? users.find(user => user.id === match.params.id)
    : null
  console.log('USERBYID', userById)
  /*
    const blogs = useSelector(state => state.blogs)
    const match = useRouteMatch('/blogs/:id')
    const blogById = match
      ? blogs.find(blog => blog.id === match.params.id)
      : null
    console.log('BLOGBYID', blogById)
    */
  //--------------YKSITTÄISEN USERIN JA BLOGIN HAKEMINEN ID:N PERUSTEELLA/ROUTER LOPPUU-----------------
  /*
  console.log('USER AFTER LOGOUT', user)
  if (!user.value) {
    return (
      <Switch>
        <Route >
          <Redirect to="/" />
        </Route>
      </Switch>
    )
  }
*/
  //HUOM! Routereiden järjestys, koska jos path "/" olisi ensimmäisenä,
  //niin näkyisi aina kaikki blogit
  return (
    <div>

      {user.value === null
        ?
        <LoginForm />
        :
        <div>
          <Menu user={user} />
          <Notification />
          <Switch>
            <Route path="/users/:id">
              <User user={userById} />
            </Route>
            <Route path="/blogs/:id">
              <Blog user={user} />
            </Route>
            <Route path="/users">
              <h2>USERS</h2>
              <UserList />
            </Route>
            <Route path="/blogs">
              <h3>Blog app</h3>
              <BlogForm user={user.value} />
              <BlogList user={user.value} />
            </Route>
            <Route path="/">
              <h2 >Blog App</h2>
              <BlogForm />
              <h2>All blogs</h2>
              <BlogList user={user.value} />
            </Route>
          </Switch>
        </div>}
    </div>
  )
}

export default App