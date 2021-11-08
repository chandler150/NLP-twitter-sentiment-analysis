import React from 'react'
import './Body.css'
import Graph from './Graph'
import Legend from '../Legend'

function Body(props) {
  return (
    <div className='Body'>
      <Graph data={props.data} />
      <Legend />
    </div>
  );
}

export default Body;
