import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = (props) => {

	const buttonSize= {
		maxWidth: '75px'
	}

	const navTextStyle = {
		fontWeight: '600',
		color: 'black'
	}

	const goto = (path) => props.history.push(path)
	const handleLogOut = () => props.logout()

	return (
		<Navbar collapseOnSelect expand="lg" bg="white">
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link style={navTextStyle} onClick={() => goto('/')}>blogs</Nav.Link>
					<Nav.Link style={navTextStyle} onClick={() => goto('/users')}>users</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link style={navTextStyle} disabled >{props.user.username} is logged in</Nav.Link>
					<Button style={buttonSize} onClick={handleLogOut} color="warning">logout</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = { logout }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))