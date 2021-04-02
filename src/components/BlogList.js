import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
//Bootstrap table komponentti
//HUOM! Asenna bootstrap ja päivitä "public/index.html"
import { Table } from 'react-bootstrap'


//Blogien listaus eristetty omaan moduuliin
const BlogList = ({ user }) => {
    //console.log('BLOG LISTIN USER', user)
    //Tähän pitää laittaa "state.blogs", koska monta reduceria
    const blogs = useSelector(state => state.blogs)
    //console.log('BLOG LIST Component', blogs)


    //Blogien renderöintiin. "src/components/Blog.js" renderöidään
    //joilla saa valittua mitä blogista näytetään
    //Sekä sorttaus niin, että eniten tykkäyksiä saanut blogi näytetään ensiksi
    //HUOM! Tässä näytetään kaikki blogit, ei vain kirjautuneen käyttäjän
    //HUOM! Bootstrab Table tyyli ks. yllä myös "Tabel":n importti

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Blog title</th>
                        <th>Number of blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs
                        .sort((a, b) => a.likes < b.likes ? 1 : -1)
                        .map(blog =>
                            <tr key={blog.id}>
                                <td>
                                    <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
                                </td>
                                <td>
                                    {blog.author}
                                </td>
                            </tr>
                        )}
                </tbody>
            </Table>
        </div>)

}

export { BlogList }