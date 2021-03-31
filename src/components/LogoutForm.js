import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutFromBlogApp } from '../reducers/loginReducer'


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
        <div>
            <div>
                {name.user} logged in
            </div>
            <div>
                <button onClick={handleLogout} >logout</button>
            </div>
            <br></br>
        </div>
    )

}

export default LogoutForm