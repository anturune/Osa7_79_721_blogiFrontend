import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteAnyBlog } from '../reducers/blogReducer'
import { removeNotification, deleteNotification } from '../reducers/notificationReducer'

//Sisältää liketysten päivityksen ja päivitys tietokantaan
//tehdään updateBlog komponentilla, joka tuodaan tähän "updateBlog:lla"
//HUOM! App.js filessä olevassa updateBlog komponentissa on mukana id:n vastaanottokin
const Blog = ({ blog, user }) => {

  console.log('TULEEKO BLOG COMPONENTTIIN USERI', user.username)

  //Blogin tila, joka määrittelee kumpi return palautetaan
  const [view, setView] = useState(false)
  const dispatch = useDispatch()
  //Tämä muuttaa blogin tilaa eli määärää sen kumpa return palautetaan
  const toggleVisibility = () => {
    if (!view) {
      setView(true)
    }
    else if (view) {
      setView(false)
    }
  }

  //-------------------LIKETYSTEN PÄIVITTÄMINEN ALKAA REDUX--------------------------
  //Blogin liketys reduxilla
  const likes = () => {
    dispatch(likeBlog(blog))
  }
  //-------------------LIKETYSTEN PÄIVITTÄMINEN LOPPUU REDUX---------------------------

  //-------------------BLOGIN DELETOINTI ALKAA REDUX-----------------------------------
  //Blogin deletointiin reduxilla
  const blogDeletion = () => {

    //Pyydetään vahvistamaan, että haluaa tosiaan poistaa Pop up window
    if (window.confirm("Remove blog " + blog.title + " by " + blog.author + "?")) {
      try {
        //Viedään blogReducerille blogi, joka poistettava ja sekä userin tieto joka
        //haluaa poistaa=kirjautunut käyttäjä
        dispatch(deleteAnyBlog(blog, user))
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



    //deleteBlog(blog)
  }
  //-------------------BLOGIN DELETOINTI LOPPUU REDUX------------------------------------


  //Ulkoasun muokkaukseen. Kehä ympärille jokaiselle blogille
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //Näytetään vain blogin title, jos ei ole painettu view nappia
  if (!view) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button id='view' onClick={toggleVisibility}>view</button>
        </div>
      </div>
    )
  }


  //Näytetään kaikki blogin tiedot, jos on painettu view nappia
  //Hide napilla sitten uudelleen piiloon

  else if (view && blog.user.username !== user.username) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
          <br></br>
          likes: {blog.likes}
          <button id='like' onClick={likes}>like</button>
          <br></br>
          Author: {blog.author}
        </div>
      </div>
    )
  }

  //HUOM! Delete nappi lisätty ja näkyviin vain kun blogin luoja
  else if (view) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
          <br></br>
          likes: {blog.likes}
          <button onClick={likes}>like</button>
          <br></br>
          Author: {blog.author}
        </div>
        <div>
          <button onClick={blogDeletion}>delete</button>
        </div>
      </div>
    )
  }
}

export default Blog