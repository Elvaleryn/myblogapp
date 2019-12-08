import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
	// console.log(action);
	switch (action.type) {
		case 'SET_USER':
			if (action.data) blogService.setToken(action.data.token)
			return action.data
		default: return state

	}
}

export const setUser = (data) => {
	return dispatch => {
		dispatch({
			type: 'SET_USER',
			data
		})
	}
}

export const fetchUser = () => {
	return dispatch => {
		const loggedUser = window.localStorage.getItem('loggedUser')
		const user = JSON.parse(loggedUser)
		if (user) {
			dispatch({
				type: 'SET_USER',
				data: user
			})
		}
	}
}


export const login = (data) => {
	return async dispatch => {
		const user = await loginService.login({
			username: data.username,
			password: data.password
		})
		window.localStorage.setItem('loggedUser', JSON.stringify(user))
		dispatch({
			type: 'SET_USER',
			data: user
		})
	}
}


export const logout = () => {
	return dispatch => {
		window.localStorage.removeItem('loggedUser')
		dispatch({
			type: 'SET_USER',
			data: null
		})
	}
}

export default userReducer