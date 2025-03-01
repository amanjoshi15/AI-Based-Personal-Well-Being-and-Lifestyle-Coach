import React from 'react'
import Card from '../Card/Card'

const myStyle = {
  border: '2px groove rgb(115, 186, 116)',
  borderRadius: '8px',
  backgroundColor: '#41ad4ef5'
}

const Style2 = {
  display: 'flex',
  justifyContent: 'space-around',
  padding: '0px 0px 0px 0px',
  listStyle: 'none'
}

const MetricsPanel = () => {
  return (
    <div style={myStyle}>
      <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '"Itim", cursive', color: 'white', fontSize: '40px' }}>Metrics</h2>
      <ul style={Style2}>
        <li>
          <Card title="Average Heart Rate">
            <p>84 bpm</p>
          </Card>
        </li>
        <li>
          <Card title="Total Calorie Burned">
            <p>374 kcal</p>
          </Card>
        </li>
        <li>
          <Card title="Total Steps Walked">
            <p>1,23,564</p>
          </Card>
        </li>
        <li>
          <Card title="Total Workout Time">
            <p>15 min</p>
          </Card>
        </li>
      </ul>
    </div>
  )
}

export default MetricsPanel
