import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/usefield'
import { createBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { Form, Input, Button } from 'reactstrap'

const BlogForm = (props) => {

	const newTitle = useField('text')
	const newAuthor = useField('text')
	const newUrl = useField('text')

	const addBlog = async blog => {
		try {
			await props.createBlog(blog)
			newTitle.reset()
			newAuthor.reset()
			newUrl.reset()
			props.setMessage(`a new blog ${newTitle.value} by ${newAuthor.value} added succesfully`, 'success', 2)
		}
		catch (exception) {
			props.setMessage(exception.response.data.error, 'error', 2)
		}
	}

	const submitBlog = (event) => {
		event.preventDefault()
		addBlog({
			title: newTitle.value,
			author: newAuthor.value,
			url: newUrl.value
		})
	}

	return (
		<>
			<Form onSubmit={submitBlog}>
				<Input className="m-2" {...newTitle} placeholder="title" reset={null} />
				<Input  className="m-2" {...newAuthor} placeholder="author" reset={null} />
				<Input className="m-2" {...newUrl} placeholder="URL" reset={null} />
				<Button className="m-2" color="success" type="submit">Submit</Button>
			</Form>
		</>
	)
}

export default connect(null, { setMessage, createBlog })(BlogForm)