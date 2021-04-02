import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
//import { removeNotification, deleteNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import {
  useRouteMatch
} from "react-router-dom"
import { Table, Form, Button } from 'react-bootstrap'



const Blog = ({ user }) => {

  //console.log('TULEEKO BLOG COMPONENTTIIN USERI', user.username)

  const blogs = useSelector(state => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blogById = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  //console.log('BLOGBYID', blogById)

  //-------------------LIKETYSTEN PÄIVITTÄMINEN JA COMMENTOINTI ALKAA REDUX--------------------------
  const dispatch = useDispatch()
  //Blogin liketys reduxilla
  const likes = () => {
    dispatch(likeBlog(blogById))
  }
  //Blogin commentointi reduxilla
  const addComment = (event) => {
    event.preventDefault()
    //Luodaan uusi commentti, jotta voidaan uuden taulukon luonnin yhteydessä lisätä uusi commentti
    //"blogReducer.js" filessä
    const newComment = event.target.newComment.value
    //Tyhjätään arvot kentästä
    event.target.newComment.value = ''
    //Viedään reducerille
    dispatch(commentBlog(blogById, newComment))

  }
  //-------------------LIKETYSTEN PÄIVITTÄMINEN JA COMMENTOINTI LOPPUU REDUX--------------------------

  if (!blogById) {
    return null
  }

  //Tyylit bootsrtapilla
  return (
    <div>
      <br></br>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Blog title</th>
            <th>Url</th>
            <th>Added by</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {blogById.title}
            </td>
            <td>
              {blogById.url}
            </td>
            <td>
              {blogById.user.name}
            </td>
            <td>
              {blogById.likes}
            </td>
          </tr>
        </tbody>
      </Table>
      <Button id='like' onClick={likes}>like</Button>
      <Form onSubmit={addComment}>
        <Form.Group>
          <br></br>
          <Form.Label>Comments:</Form.Label>
          <Form.Control name="newComment" />
          <Button id='submit-button' type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {blogById.comments
            .map((comment, index) =>
              <tr key={index}>
                <td >{comment}</td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}






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
//-------------------BLOGIN DELETOINTI LOPPUU REDUX-----------------------------------

export default Blog