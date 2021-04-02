import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
//import { createNewNotification, removeNotification } from '../reducers/notificationReducer'
import Togglable from '../components/Togglable'
//import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'


//Uuden blogin luominen
const BlogForm = ({ user }) => {
    //-----------------REDUX------------------------------------------------------------
    const dispatch = useDispatch()
    //useRef hookilla luodaan ref blogFormRef, joka kiinnitetään blogin luomislomakkeen sisältävälle 
    //Togglable-komponentille. Nyt siis muuttuja blogFormRef toimii viitteenä komponenttiin.
    const blogFormRef = useRef()
    //Alla olvassa "onSubmit" -käskyssä viittaus tänne
    const addBlog = async (event) => {
        event.preventDefault()
        //console.log('ADDBLOG EVENT TITLE', event.target.newTitle.value)

        //Haidataan luomisformi heti, kun on painettu "create"-nappia
        //hyödynnetään blogFormRef viitteenä "Togglable" komponenttiin
        blogFormRef.current.toggleVisibility()

        //Otetaan kenttiin tallennetut arvot talteen
        //ja luodann blogi object
        const newBlogi = ({
            title: event.target.newTitle.value,
            author: event.target.newAuthor.value,
            url: event.target.newUrl.value
        })
        //Tyhjätään arvot
        event.target.newTitle.value = ''
        event.target.newAuthor.value = ''
        event.target.newUrl.value = ''

        //Luodaan uusi blogi Mongoon ks. "src/services/blogs.js"
        //Viedään uusi blogi reducerille sekä useri, jotta voidaan välittää userin
        //Token "services/blogs.js":lle
        dispatch(createNewBlog(newBlogi, user))

    }
    //-----------------REDUX------------------------------------------------------------
    //console.log('BLOGFORM USER', user)



    //Luomisformi on kääritty "Togglable" -komponentin sisälle, jotta "new blog" ja "cancel" 
    //napit joko näyttää tai haidaa luomisformin. Kun mennään "addBlog" funktioon "create"
    //napin klikkauksen jälkeen, niin funktiossa "addBlog" haidataan formi
    return (
        < div >
            <br></br>
            <h6>CREATE NEW BLOG</h6>
            <Togglable hideLabel="cancel" buttonLabel="new blog"  ref={blogFormRef}>
                <Form onSubmit={addBlog}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control name="newTitle" />
                        <Form.Label>Author:</Form.Label>
                        <Form.Control name="newAuthor" />
                        <Form.Label>Url:</Form.Label>
                        <Form.Control name="newUrl" />
                        <br></br>
                        <Button id='submit-button' type="submit">create</Button>
                    </Form.Group>
                </Form>
            </Togglable>
        </div >
    )
}

export default BlogForm