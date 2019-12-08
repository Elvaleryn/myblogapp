import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/usefield'
import { updateBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const Blog = (props) => {
	const comment = useField('text')

	const blog = props.blog
	// const [likes, setLikes] = useState(blog.likes)
	if (!blog) return null

	// const handleLikeClick = () => {
	// 	const updatedObject = {
	// 		user: blog.user.id,
	// 		likes: likes + 1,
	// 		author: blog.author,
	// 		title: blog.title,
	// 		url: blog.url
	// 	}
	// 	const id = blog.id
	// 	blogService.update(updatedObject, id)
	// 	props.initBlogs()
	// 	setLikes(likes + 1)
	// }

	// console.log(blog)
	// console.log(blog.likes)

	const update = async (blog) => {
		try {
			await props.updateBlog(blog)
			props.setMessage(`blog "${blog.title}" updated`, 'success', 2)
		} catch (exception) {
			props.setMessage('failed to update', 'error', 2)
		}
	}

	const like = () =>
		update({
			id: blog.id,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
			user: blog.user ? blog.user.id : null
		})

	const addComment = async () => {
		try {
			await props.addComment({
				id: blog.id,
				comment: comment.value
			})
			comment.reset()
			props.setMessage('`new comment added`', 'success', 2)

		} catch (exception) {
			props.setMessage('failed to update', 'error', 2)
		}
	}

	return (
		<div>
			<h1>{blog.title} {blog.author}</h1>
			<p>
				blog has {blog.likes} like(s) <button onClick={like}>like</button>
			</p>
			<p>added by {blog.user ? blog.user.name : '?'}</p>
			<h3>comments</h3>
			<input  {...comment} />
			<button onClick={addComment}>add comment</button>
			{blog.comments.map(comment =>
				<li key={comment.id}>
					{comment.comment}
				</li>
			)
			}
		</div>
	)
}

const mapDispatchToProps = {
	updateBlog,
	removeBlog,
	setMessage,
	addComment
}

export default connect(null, mapDispatchToProps)(Blog)