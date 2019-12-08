import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'

const Blogs = ({ blogs }) => {
	// const blogStyle = {
	// 	border: 'solid 4px black',
	// 	margin: '5px',
	// 	padding: '5px'
	// }


	return (
		<ListGroup>
			{blogs.map(blog =>
				<Link key={blog.id} to={`blogs/${blog.id}`}>
					<ListGroupItem>{blog.title} ({blog.author}</ListGroupItem>
				</Link>
			)}
		</ListGroup>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

export default connect(mapStateToProps, null)(Blogs)