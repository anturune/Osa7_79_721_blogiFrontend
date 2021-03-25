import React from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'
//import { voteAnecdote } from '../reducers/anecdoteReducer'
//import { voteNotification, removeNotification } from '../reducers/notificationReducer'


//Blogien listaus eristetty omaan moduuliin
const BlogList = ({ user }) => {

    //Tähän pitää laittaa "state.anecdotes", koska monta reduceria
    const blogs = useSelector(state => state.blogs)
    //console.log('BLOG LIST Component', blogs)

    //Blogien renderöintiin. "src/components/Blog.js" renderöidään show ja hide napit
    //joilla saa valittua mitä blogista näytetään
    //Sekä sorttaus niin, että eniten tykkäyksiä saanut blogi näytetään ensiksi
    //HUOM! Tässä näytetään kaikki blogit, ei vain kirjautuneen käyttäjän
    //Sisältää myös "deleteBlog" toiminnallisuuden lähettämisen "src/components/Blog.js" fileen
    return (
        blogs
            .sort((a, b) => a.likes < b.likes ? 1 : -1)
            .map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                />
            ))
}

export { BlogList }