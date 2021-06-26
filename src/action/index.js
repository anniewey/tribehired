import {
    POST_URL,
    COMMENT_URL
} from '../../global'

const handleResponse = (response) => {
    return new Promise((resolve, reject) => {
        if(response.ok){
            response.json().then(json => resolve(json))
        }
        else{
            response.json().then(json => reject(json))
        }
    })
}

const handleError = (error) => {
    return Promise.reject(error?.message)    
}

/* Post */

export const getPost = () => {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(
        `${POST_URL}`, requestOptions)
        .then(handleResponse, handleError)
}

export const getPostDetail = (id) => {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(
        `${POST_URL}/${id}`, requestOptions)
        .then(handleResponse, handleError)
}

export const getPostComment = (id) => {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(
        `${COMMENT_URL}?postId=${id}`, requestOptions)
        .then(handleResponse, handleError)
}


