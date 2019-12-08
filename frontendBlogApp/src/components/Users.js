import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
	return (
		<div>
			<h1>users</h1>
			<h2>Create</h2>
			{
				props.users.map(user =>
					<li key={user.id}>
						<Link key={user.id} to={`users/${user.id}`}>{user.name}</Link>
						{user.blogs.length}
					</li>
				)
			}
		</div>
	)
}

const mapStateToProps = (state) => {
	return { users: state.users }
}


export default connect(mapStateToProps)(Users)