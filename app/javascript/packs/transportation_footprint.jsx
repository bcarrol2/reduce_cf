// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const TransportationFootprint = props => (
  <div>Hello, {props.user}!</div>
)

Transportation.defaultProps = {
  user: 'Terry'
}

Transportation.propTypes = {
  user: PropTypes.string,
  user_id: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TransportationFootprint name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
