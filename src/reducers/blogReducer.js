
//Tämä import tarvitaan, kun haetaan data serveriltä
import blogService from '../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'INIT_BLOGS':
            //console.log('INIT BLOGS', action.data)
            return action.data

        case 'NEW_BLOG':
            console.log('TULEEKO UUSI NEW_BLOG', action.data)
            return [...state, action.data]

        default:
            return state
    }

}

//Haetaan aluksi kaikki blogit
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

//Tällä Luodaan uusi blogi ja importataan esim. "App.js" fileen, josta
//tänne tuodaan blogin contentti
//Action on javascript objekti jolla on type -field.
export const createNewBlog = (content) => {
    console.log('TULIKO CREATE BLOGIIN', content)
    return {
        type: 'NEW_BLOG',
        data: {
            id:content.id,
            user: content.user,
            title: content.title,
            author: content.author,
            url: content.url,
            likes: 0
        }
    }
}


export default blogReducer