import React, { PropTypes } from 'react'
import { Alert } from 'react-bootstrap'

const Message = (props) => (
	<Alert bsStyle="warning" hidden={(props.message === null)}>
    <p>{props.message}</p>
  </Alert>
)
Message.propTypes =  {
	message: PropTypes.string
}

export default Message
