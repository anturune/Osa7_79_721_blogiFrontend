import React from 'react'
import { useSelector } from 'react-redux'

//Notificaatio joka renderöidään. Tähän viittaus "App.js" filessä
//"App.js" filessä ensin importattu käyttöön
const Notification = () => {

    const notification = useSelector(state => state.notification)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    //Ks. notificationReducder.js filestä 
    //const initialState = { value: 'INITIAL NOTIFICATION' }
    //siksi alla tarvitaan "notification.value"
    //console.log('MIKÄ ARVO NOTIFICAATIOLLA ', notification.value)

    if (notification.value !== null) {
        return (
            <div style={style}>
                {notification.value}
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