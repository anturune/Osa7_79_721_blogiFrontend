import { createNewNotification, removeNotification } from '../reducers/notificationReducer'
//Tämä import tarvitaan, kun haetaan data serveriltä
import blogService from '../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'INIT_BLOGS':
            //console.log('INIT BLOGS', action.data)
            return action.data

        case 'NEW_BLOG':
            //console.log('TULEEKO UUSI NEW_BLOG', action.data)
            return action.data

        case 'LIKE':
            //Palautetaan data sortattuna liketysten mukaan
            return action.data.sort((a, b) => a.likes <= b.likes ? 1 : -1)

        case 'DELETE_BLOG':
            //console.log('DELETE BLOG CASE:', action.data)
            return action.data

        default:
            return state
    }

}

//Haetaan kaikki blogit eli kun loggauduttu sisään, ohjelma listaa
//selaimelle kaikki blogit
export const initializeBlogs = () => {
    return async dispatch => {
        //Haetaan kaikki blogit kannasta
        const initialBlogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: initialBlogs
        })
    }
}

//Luodaan uusi blogi
export const createNewBlog = (newBlogi, user) => {
    console.log('TULIKO CREATE BLOGIIN', newBlogi)

    return async dispatch => {
        try {
            //Luodaan uusi blogi mongoon, uusi blogi objecti tulee "components/BlogForm" -komponentilta
            console.log('CreateBlogreducer', user)
            //Asetetaan token "services/blogs.js" filelle, jotta luominen onnistuu myös
            //sivun refreshauksen jälkeen
            blogService.setToken(user.token)
            await blogService.createBlog(newBlogi)
            dispatch(createNewNotification(`A new blog  ${newBlogi.title}  ${newBlogi.author} successfully added`))
            setTimeout(() => {
                dispatch(removeNotification())
            }, 5000)
            //Haetaan luonnin jälkee tietokannasta blogit (sisältää nyt myös uuden luodun)

            const blogsAfterCreation = await blogService.getAll()
            dispatch({
                type: 'NEW_BLOG',
                data: blogsAfterCreation
            })
        } catch (exception) {
            //setErrorMessage('Jokin meni pieleen')
            console.log('JOKIN MENI PIELEEN')
            dispatch(createNewNotification(`Blog creation failed, contact to system admin`))
            setTimeout(() => {
                dispatch(removeNotification())
            }, 5000)
        }
    }
}

//Blogin liketykseen
export const likeBlog = (blogObject) => {
    return async dispatch => {
        //Lisätään blogille yksi uusi tykkäys
        const blogObjectLiked = ({ ...blogObject, likes: blogObject.likes + 1 })
        //Päivitetään blogi kantaan hyödyntäen "services/blogs.js"
        //const likedBlog = await blogService.updateBlog(blogObjectLiked, blogObject.id)
        await blogService.updateBlog(blogObjectLiked, blogObject.id)
        const blogsAfterLiked = await blogService.getAll()
        //const id = likedBlog.id
        dispatch({
            type: 'LIKE',
            data: blogsAfterLiked
        })
    }
}

export const deleteAnyBlog = (blogObject, user) => {
    return async dispatch => {
        //Käyttäjän token annetaan, jotta varmistetaan, että on kirjautunut
        //käyttäjä
        blogService.setToken(user.token)
        //Deletoidaan blogi kannasta
        await blogService.deleteBlog(blogObject.id)
        //Otetaan blogit kannasta deletoinnin jälkeen ja palautetaan ne
        //reducerille ja storen päivitykselle
        const blogsAfterDelete = await blogService.getAll()
        //Viedään uusi blogilista storen tilan päivttämiseksi
        dispatch({
            type: 'DELETE_BLOG',
            data: blogsAfterDelete
        })
    }
}

export default blogReducer