import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

//Notificaatio joka renderöidään. Tähän viittaus "App.js" filessä
//"App.js" filessä ensin importattu käyttöön
const Notification = () => {

    const notification = useSelector(state => state.notification)

    //Bootstrap stylellä Alert
    //Ks. https://react-bootstrap.github.io/components/alerts/
    if (notification.value !== null) {
        return (
            <div className="container">
                {notification.value &&
                    <Alert variant="success">
                        {notification.value}
                    </Alert>}
            </div>
        )
    }
    //Jos ei ole lisätty uutta blogia tai liketetty tai 5sec kulunut
    //notificaation näyttämisestä, niin ei renderöidä mitään eli arvo on null
    //tai muutettu ohjelmallisesti null:ksi
    else if (notification.value === null) {
        return null
    }
}
export { Notification }