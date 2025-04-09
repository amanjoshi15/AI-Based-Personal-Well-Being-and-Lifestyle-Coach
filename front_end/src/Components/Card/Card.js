import React from 'react'

const myStyle = {
  border: '2px groove rgb(79, 129, 80)',
  backgroundColor: '#27592df5',
  padding: '0px 15px',
  borderRadius: '40px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  color: 'white'
}

const Card = (props) => {
  return (
    <div style={myStyle}>
      <h3 style={{ fontFamily: '"Host Grotesk", serif', color: 'white' }}>{props.title}</h3>
      <div style={{ fontFamily: '"Gurajada", sans-serif', fontSize: '25px' }}>{props.children}</div>
    </div>
  )
}

export default Card