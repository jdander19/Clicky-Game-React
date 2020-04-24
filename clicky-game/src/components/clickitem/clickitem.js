import React from 'react';
import Album from '../data.json';


const Clickitem = props => (
 
  <div
    className={
      props.shake
        ? 'container d-flex flex-wrap justify-content-center shake'
        : 'container d-flex flex-wrap justify-content-center'
    }
  >
    {props.Album.map((a, i) => <Album name={a} key={i} clickEvent={props.clickEvent} />)}
  </div>
);

export default Clickitem;