import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { setMessage } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login, fetchUser } from './reducers/userReducer'
import { useField } from './hooks/usefield'
import { Container, Row, Col, Card, CardHeader, CardText } from 'reactstrap'
import Menu from './components/Menu'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

const App = (props) => {

	const username = useField('text')
	const password = useField('password')

	const fetchBlogs = props.initializeBlogs
	const fetchUser = props.fetchUser
	const fetchUsers = props.initializeUsers

	useEffect(() => { fetchUser() }, [fetchUser])
	useEffect(() => { fetchBlogs() }, [fetchBlogs])
	useEffect(() => { fetchUsers() }, [fetchUsers])

	// useEffect(() => {
	// 	props.initializeBlogs()
	// }, [])

	// useEffect(() => {
	// 	const loggedUserJSON = window.localStorage.getItem('loggedUser')
	// 	if (loggedUserJSON) {
	// 		const user = JSON.parse(loggedUserJSON)
	// 		blogService.setToken(user.token)
	// 		props.setUser(user)
	// 	}
	// }, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			await props.login({
				username: username.value,
				password: password.value
			})
			username.reset()
			password.reset()
		} catch (exception) {
			props.setMessage('Wrong username or password', 'error', 2)
		}
	}


	// const Blogs = () => {
	// 	return (
	// 		<div>
	// 			<BlogForm />
	// 			{props.blogs.map(blog => <li key={blog.id}>{blog.title} {blog.author}</li>)}
	// 		</div>
	// 	)
	// }

	const loginForm = () => (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						{...username}
						reset={null}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						{...password}
						reset={null}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)

	const blogById = (id) =>
		props.blogs.find(blog => blog.id === id)

	const userById = (id) =>
		props.users.find(user => user.id === id)


	return (
		<Container>
			{
				props.user === null ? loginForm() :
					<Router>
						<Menu />
						<Card body className="text-center">
							<CardHeader>BlogApp</CardHeader>
							<Notifications />
							<CardText>
								<Route exact path='/' render={() =>
									<div>
										<Togglable buttonLabel="Create">
											<BlogForm />
										</Togglable>
										<Blogs />
									</div>
								} />
								<Route exact path='/users' render={() => <Users />} />
								<Route path='/users/:id' render={({ match }) =>
									<User user={userById(match.params.id)} />
								} />
								<Route path='/blogs/:id' render={({ match }) =>
									<Blog blog={blogById(match.params.id)} />
								} />
							</CardText>
						</Card>
					</Router >
			}

		</Container>
	)
}

const sortedBlogs = ({ blogs }) => {
	return blogs.sort((b1, b2) => b2.likes - b1.likes)
}


const mapStateToProps = (state) => {
	return {
		blogs: sortedBlogs(state),
		user: state.user,
		users: state.users
	}
}

export default connect(mapStateToProps, { login, fetchUser, initializeBlogs, setMessage, initializeUsers })(App)


