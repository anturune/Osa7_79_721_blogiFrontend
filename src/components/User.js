import React from 'react'
import { Table } from 'react-bootstrap'

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
    //HUOM! Bootstrap tyyli
    return (
        <div>
            <br></br>
            <h2>{user.name}</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ADDED BLOGS</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs
                        .map(blog =>
                            <tr key={blog.id}>
                                <td>
                                    {blog.title}
                                </td>
                            </tr>
                        )}
                </tbody>
            </Table>
        </div>)
}

export default User