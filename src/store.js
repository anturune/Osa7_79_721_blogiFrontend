import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

//import blogService from './services/blogs'


//Luodaan combineReducer, jotta voidaan käyttää useamppaa reduceria
const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)
//console.log('JSONISTA KAIKKI', blogService.getAll())
export default store