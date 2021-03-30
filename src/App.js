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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom"


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


  //"routeMatch":n käyttö, kun halutaan käyttää yksittäisen userin
  //etsiminen ID:n perusteella ennen komponentille lähettämistä
  //HUOM! Käytettäessä useRouteMatch:a pitää siirtää Router tägi ulkopuolelle,
  //tässä siirretty "index.js"-fileen
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const userById = match
    ? users.find(user => user.id === match.params.id)
    : null

  console.log('blogsUserById', userById)
  //HUOM! Routereiden järjestys, koska jos path "/" olisi ensimmäisenä,
  //niin näkyisi aina kaikki blogit
  return (
    <div>
      <Notification />
      {user.value === null
        ?
        <LoginForm />
        :
        <div>
          <h2 >blogs</h2>
          <LogoutForm user={user.value.name} />
          <Switch>
            <Route path="/users/:id">
              <User user={userById} />
            </Route>
            <Route path="/users">
              <h2>USERS</h2>
              <UserList />
            </Route>
            <Route path="/">
              <BlogForm />
              <h2>YOUR BLOGS</h2>
              <BlogList user={user.value} />
            </Route>
          </Switch>
        </div>}
    </div>
  )
}

export default App