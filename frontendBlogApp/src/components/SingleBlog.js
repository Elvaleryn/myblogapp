//handlelikes and handleremoveclick

import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const Blogs = (props) => {
	const blogStyle = {
		border: 'solid 4px black',
		margin: '5px',
		padding: '5px'
	}

	const handleLikeClick = (blog) => {
		props.likeBlog(blog)
		props.setMessage(`you liked '${blog.title}'`, 'success', 2)
	}

	const deleteBlog = async (blog) => {
		const result = window.confirm(`Do you want to remove ${blog.title}`)
		if (result) {
			props.removeBlog(blog)
		}
	}

	if (props.username !== props.blogs.username)
		return (
			<div style={blogStyle}>
				{props.blogs.map(blog =>
					<li key={blog.id}>{blog.title} {blog.author} {blog.likes} likes <button onClick={handleLikeClick}>Like</button></li>
				)}
			</div>
		)
	return (
		<div style={blogStyle}>
			{props.blogs.map(blog =>
				<li key={blog.id}>{blog.title} {blog.author} {blog.likes} likes <button onClick={handleLikeClick}>Like</button><button onClick={deleteBlog}>Delete</button></li>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		notification: state.notification,
		user: state.user,
	}
}

export default connect(mapStateToProps, { setMessage, likeBlog, removeBlog })(Blogs)