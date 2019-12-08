import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavItem, Button, NavLink } from 'reactstrap'

const Menu = (props) => {

	const goto = (path) => props.history.push(path)
	const handleLogOut = () => props.logout()

	return (
		<div>
			<Navbar color="light" light expand="md">
				<Nav className="mr-auto" navbar>
					<NavItem>
						<NavLink onClick={() => goto('/')}>blogs </NavLink>
					</NavItem>
					<NavItem>
						<NavLink onClick={() => goto('/users')}>  Users </NavLink>
					</NavItem>
				</Nav>
				<Button onClick={handleLogOut} color="warning">logout</Button>
				<NavLink disabled>	{props.user.username} is logged in </NavLink>
			</Navbar>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = { logout }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))