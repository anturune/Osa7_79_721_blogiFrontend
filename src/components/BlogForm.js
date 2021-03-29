import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
//import { createNewNotification, removeNotification } from '../reducers/notificationReducer'
import Togglable from '../components/Togglable'


//Uuden blogiin liittyvät tilankäsittelijät
const BlogForm = () => {
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
        //const uusiBlogi = await blogService.createBlog(newBlogi)
        //Viedään uusi blogi reducerille
        dispatch(createNewBlog(newBlogi))

    }
    //-----------------REDUX------------------------------------------------------------

    //Luomisformi on kääritty "Togglable" -komponentin sisälle, jotta "new blog" ja "cancel" 
    //napit joko näyttää tai haidaa luomisformin. Kun mennään "addBlog" funktioon "create"
    //napin klikkauksen jälkeen, niin funktiossa "addBlog" haidataan formi
    return (
        < div >
            <h2>CREATE NEW BLOG</h2>
            <Togglable buttonLabel="new blog" hideLabel="cancel" ref={blogFormRef}>
                <form onSubmit={addBlog}>
                    <div>
                        Title: <input name="newTitle" />
                    </div>
                    <div>
                        Author: <input name="newAuthor" />
                    </div>
                    <div>
                        Url: <input name="newUrl" />
                    </div>
                    <br></br>
                    <button id='submit-button' type="submit">create</button>
                </form>
            </Togglable>
        </div >
    )
}

export default BlogForm