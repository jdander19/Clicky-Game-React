import React from 'react';
import './clickitem.css';

const clickItem = props => (
  <div className="card" onClick={e => props.handleClick(e.target.src)}>
    <img className="card-img-top card-height" src={props.name} alt="" />
  </div>
);


export default clickItem;

