import React, { useEffect, useState } from 'react'
import './index.css'
import { useDispatch } from 'react-redux'
import { Notification } from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'


const App = () => {

  const dispatch = useDispatch()

  //Haetaan aluksi effec -hookilla kaikki blogit
  useEffect(() => {
    dispatch(initializeBlogs())
    //Jos ei lisätä hakasulkeiden sisään "dispatch" tulee eslint herja
    //toimisi ilman "dispatch" tekstiä myös vaikka herja jäisikin
  }, [dispatch])

  return (
    <div>
      <Notification />
      <LoginForm />
    </div>
  )
}

export default App