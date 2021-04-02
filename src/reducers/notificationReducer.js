//Annetaan initial arvo notification objectille
const initialState = { value: null }


const notificationReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'LIKE_BLOG_NOTE':
            //console.log('TULIKO LIKETYS NOTIFICATION REDUCERIIN', action.data.content)
            return { ...state, value: 'BLOG LIKED: ' + action.data.content }
        //Luodaan uusi Blogi
        case 'NEW_BLOG_NOTE':
            return { ...state, value: 'NEW BLOG ADDED: ' + action.data.content }

        //Blogin deletointi
        case 'DELETE_BLOG_NOTE':
            return { ...state, value: 'Blog successfully deleted' }

        case 'CREDENTIALS_NOTE':
            return { ...state, value: 'Wrong username or password' }
        //Poistetaan notificaatio 5sec jälkeen
        case 'REMOVE_NOTE':
            return { ...state, value: null }

        default:
            return state
    }
}


//Tällä actionilla annetaan käsky palauttaa "NEW_BLOG_NOTE" tila 
//Action on javascript objekti jolla on type -field.
export const createNewNotification = (content) => {
    return {
        type: 'NEW_BLOG_NOTE',
        data: { content }
    }
}

//Tällä actionilla annetaan käsky palauttaa "DELETE_BLOG_NOTE" tila 
//Action on javascript objekti jolla on type -field.
export const deleteNotification = () => {
    return {
        type: 'DELETE_BLOG_NOTE'

    }
}

//Tällä actionilla annetaan käsky palauttaa "REMOVE_NOTE" tila
//Eli poistetaan
//Action on javascript objekti jolla on type -field.
export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTE'
    }
}

//Tällä actionilla annetaan käsky palauttaa "LIKE_BLOG_NOTE" tila 
//Action on javascript objekti jolla on type -field.
export const likeNotification = (content) => {
    return {
        type: 'LIKE_BLOG_NOTE',
        data: { content }
    }
}

//Tällä actionilla annetaan käsky palauttaa "CREDENTIALS_NOTE" tila 
//Action on javascript objekti jolla on type -field.
export const credentialsNotification = () => {
    return {
        type: 'CREDENTIALS_NOTE',
        //data: { content }
    }
}

export default notificationReducer