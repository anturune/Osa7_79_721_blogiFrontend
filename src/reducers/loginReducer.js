import loginService from '../services/login'
import blogService from '../services/blogs'
import { removeNotification, credentialsNotification } from '../reducers/notificationReducer'

//Initial stateksi haetaan localStoragesta käyttäjä
//ei siis laiteta null, koska muuten selainta refreshatessa
//menee takaisin login formille
const initialState = {
    value:
        JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
}
//const initialState = { value: null }

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
            const user = JSON.parse(loggedUserJSON)
            //console.log('USERII LOGINREDUCER', user.token)
            return { ...state, value: user }

        case 'LOGOUT':
            //Tyhjätään state/asetetaan arvoksi null
            return { ...state, value: null }
        default:
            return state
    }

}

//Käyttäjän loggautuminen
export const loginToBlogApp = (username, password) => {
    return async dispatch => {
        try {
            //Talletus mongoon hyödyntäen "services/login.js"
            const user = await loginService.login({
                username, password,
            })
            //Asetetaan uusi käyttäjä localStorageen
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            //Asetetaan token, jotta saadaan mm. luotua uusia blogeja
            blogService.setToken(user.token)
            console.log('USER TOKEN', user.token)
            //Jos väärä salasana, niin poikkeutus ja notificaatio käyttäjälle
        } catch (exception) {
            dispatch(credentialsNotification())
            console.log('Wrong username or password')
            setTimeout(() => {
                dispatch(removeNotification())
            }, 5000)
        }

        dispatch({
            type: 'LOGIN'
        })
    }
}
//Loggautuminen ulso sovelluksesta
export const logoutFromBlogApp = () => {
    //Tyhjätään localStoragesta käyttäjä
    window.localStorage.clear()
    //Asetetaan token tyhjäksi ettei voi enää esim. luoda uusia blogeja
    blogService.setToken('')
    return ({
        type: 'LOGOUT'
    })
}


export default loginReducer