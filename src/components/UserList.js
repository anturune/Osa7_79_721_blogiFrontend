import React from 'react'
import { useSelector } from 'react-redux'
//import User from '../components/User'
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom"


//Usereiden listaus eristetty tähän omaan moduuliin
const UserList = () => {

    //Tähän pitää laittaa "state.users", koska monta reduceria
    //Ks. "store.js" ja "index.js" miten storea käytetään
    const users = useSelector(state => state.users)
    //console.log('USER LIST Component', users)

    //HUOM! Bootstrap tyyli
    return (
        <div>
            <Table striped>
                <tbody>
                    {users
                        .sort((a, b) => a.blogs.length < b.blogs.length ? 1 : -1)
                        .map(user =>
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}> {user.name} </Link>
                                </td>
                                <td>
                                    {user.blogs.length}
                                </td>
                            </tr>
                        )}
                </tbody>
            </Table>
        </div>)
}

export { UserList }