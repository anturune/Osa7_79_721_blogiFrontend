import React from 'react'


//Käyttäjän ja käyttäjän blogien renderöintiin
const User = ({ user }) => {
    //Kun mennään jonkin käyttäjän sivulle, eivät käyttäjien tiedot ole vielä 
    //ehtineet palvelimelta React-sovellukseen. 
    //Ongelman kierretään ehdollisella renderöinnillä
    if (!user) {
        return null
    }
    const blogs = user.blogs
    //console.log('USER COMPONENT BLOGS', blogs)
    return (
        <div><h2>{user.name}</h2>
            <h3>added blogs</h3>
            { blogs
                .map(blog =>
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                )}</div>)
}

export default User