import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
//import { removeNotification, deleteNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import {
  useRouteMatch
} from "react-router-dom"

//Sisältää liketysten päivityksen ja päivitys tietokantaan
//tehdään updateBlog komponentilla, joka tuodaan tähän "updateBlog:lla"
//HUOM! App.js filessä olevassa updateBlog komponentissa on mukana id:n vastaanottokin
const Blog = ({ user }) => {

  console.log('TULEEKO BLOG COMPONENTTIIN USERI', user.username)
  /*
    //Blogin tila, joka määrittelee kumpi return palautetaan
    const [view, setView] = useState(false)
    
    //Tämä muuttaa blogin tilaa eli määärää sen kumpa return palautetaan
    const toggleVisibility = () => {
      if (!view) {
        setView(true)
      }
      else if (view) {
        setView(false)
      }
    }
  */


  /*
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
*/

  const blogs = useSelector(state => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blogById = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  console.log('BLOGBYID', blogById)

  //-------------------LIKETYSTEN PÄIVITTÄMINEN JA COMMENTOINTI ALKAA REDUX--------------------------
  const dispatch = useDispatch()
  //Blogin liketys reduxilla
  const likes = () => {
    dispatch(likeBlog(blogById))
  }
  //Blogin commentointi reduxilla
  const addComment = (event) => {
    event.preventDefault()
    //Luodaan uusi commentti, jotta voidaan uudn taulukon luonnin yhteydessä lisätä uusi commentti
    //"blogReducer.js" filessä
    const newComment = event.target.newComment.value
    //Tyhjätään arvot kentästä
    event.target.newComment.value = ''

    dispatch(commentBlog(blogById, newComment))

  }

  //-------------------LIKETYSTEN PÄIVITTÄMINEN JA COMMENTOINTI ALKAA REDUX--------------------------


  //deleteBlog(blog)

  //-------------------BLOGIN DELETOINTI LOPPUU REDUX------------------------------------

  /*
    //Ulkoasun muokkaukseen. Kehä ympärille jokaiselle blogille
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    */

  /*
  //Näytetään vain blogin title, jos ei ole painettu view nappia
  //Linkit yksittäisiin blogeihin
  if (!blogById) {
    return (
      <div style={blogStyle}>
        <div>
          <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link>
        </div>
      </div>
    )
  }
  */
  //Tämä tarvitaan, koska muuten blogi ei heti ehdi reactille
  //ja päätyy muuten virheeseen
  if (!blogById) {
    return null
  }

  return (
    <div>
      <div>
        <h2>{blogById.title} {blogById.author}</h2>
      </div>
      <div>
        {blogById.url}
        <br></br>
          likes: {blogById.likes}
        <button id='like' onClick={likes}>like</button>
        <br></br>
          Added by: {blogById.user.name}
      </div><br></br>
      <div>
        <h3>comments:</h3>
        <form onSubmit={addComment}>
          <div>
            <input name="newComment" />
            <button id='submit-button' type="submit">add comment</button>
          </div>
        </form>
        {blogById.comments
          .map((comment, index) =>
            <li key={index}> {comment}</li>
          )}
      </div>
    </div>
  )
}


/*
  //Näytetään kaikki blogin tiedot, jos on painettu view nappia
  //Hide napilla sitten uudelleen piiloon

  else if (view && blog.user.username !== user.username) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
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
  */


export default Blog