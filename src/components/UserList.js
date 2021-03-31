import React from 'react'
import { useSelector } from 'react-redux'
//import User from '../components/User'

import {
    Link
} from "react-router-dom"


//Usereiden listaus eristetty tähän omaan moduuliin
const UserList = () => {

    //Tähän pitää laittaa "state.users", koska monta reduceria
    //Ks. "store.js" ja "index.js" miten storea käytetään
    const users = useSelector(state => state.users)
    console.log('USER LIST Component', users)

    //Mapataan kaikki käyttäjät ja ensin sortataan blogien määrän mukaan
    //Ks. "User.js" komponentti
    return (
        users
            .sort((a, b) => a.blogs.length < b.blogs.length ? 1 : -1)
            .map(user =>
                <div key={user.id}>
                    <Link to={`/users/${user.id}`}> {user.name} </Link>{user.blogs.length}
                </div>
            ))
}

export { UserList }