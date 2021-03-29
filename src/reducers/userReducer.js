import userService from '../services/users'


const initialState = []
//const initialState = { value: null }

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.data
        default:
            return state
    }

}
//Kaikkien usereiden hakeminen kannasta
export const initializeUsers = () => {
    return async dispatch => {
        //Haetaan kaikki userit kannasta
        const initialUsers = await userService.getAll()
        //console.log('USERIT USER REDUCERISTA', initialUsers)
        dispatch({
            type: 'INIT_USERS',
            data: initialUsers
        })
    }
}

export default userReducer