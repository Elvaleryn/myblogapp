import React from 'react'

const User = ({ user }) => {
	if (!user) return null

	return (
		<div>
			<h1>{user.name}</h1>
			<h2>added blogs</h2>
			{
				user.blogs.length > 0 ?

					user.blogs.map(blog =>
						<li key={blog.id}>{blog.title}</li>
					)

					: <span>nothing yet!</span>
			}
		</div>
	)
}

export default User