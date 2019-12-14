import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const Togglable = React.forwardRef((props, ref) => {

	const buttonSize = {
		width: '80px'
	}


	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => { return { toggleVisibility } })
	return (
		<div>
			<div style={hideWhenVisible}>
				<Button style={buttonSize} className="m2" color="warning" onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button style={buttonSize} className="m2" color="danger" onClick={toggleVisibility}>Cancel</Button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Togglable