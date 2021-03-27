import loginService from '../services/login'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import BlogForm from '../components/BlogForm'
import { BlogList } from '../components/BlogList'


const initialState = { value: null }

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return { ...state, value: action.data }
        default:
            return state
    }

}

export const loginToBlogApp = (user) => {
    return {
        type: 'LOGIN',
        data: { user }
    }
}

/*
export const loginToBlogApp = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password,
        })
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}
*/


export default loginReducer