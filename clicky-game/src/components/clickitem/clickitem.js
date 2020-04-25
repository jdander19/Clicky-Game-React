import React from 'react';
import data from '../../data.json';
import Album from "../album/album"


const Clickitem = props => {
 return(
  <div
    className={
      props.shake
        ? 'container d-flex flex-wrap justify-content-center shake'
        : 'container d-flex flex-wrap justify-content-center'
    }
  >
    {data.map((a, i) => <Album name={a} key={i} clickEvent={props.clickEvent} />)}
  </div>
 )}

export default Clickitem;