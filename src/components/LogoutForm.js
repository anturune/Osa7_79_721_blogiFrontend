import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutFromBlogApp } from '../reducers/loginReducer'
import { Button } from 'react-bootstrap'


//----------------------- LOGOUT -----------------------------------
//Tuodaan käyttäjän nimi "App.js:stä"
const LogoutForm = (name) => {
    //console.log('LOGOUT FORM USER', name)
    const dispatch = useDispatch()

    //Logout napin lähettämisestä vastaava metodi
    const handleLogout = (event) => {
        //Login reducerille logout action creatorille
        dispatch(logoutFromBlogApp())

    }

    return (
        
            <>
                {name.user} logged in
                <Button onClick={handleLogout} >logout</Button>
            </>

       
    )

}

export default LogoutForm