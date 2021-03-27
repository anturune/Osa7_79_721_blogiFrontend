import React from 'react'
import { useSelector } from 'react-redux'



//Blogien listaus eristetty omaan moduuliin
const User = () => {

    //Tähän pitää laittaa "state.blogs", koska monta reduceria
    const user = useSelector(state => state.user)
    //console.log('BLOG LIST Component', blogs)


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

export { User }