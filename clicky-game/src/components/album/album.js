import React from 'react';
import data from '.././data/data.json';
import Album from "../album/album";
import './album.css'

// the onClick function is defined as a callback so that the clicked elements value
// can be passed to props.clickEvent to check if the image has been clicked or not
const Album = props => {
  return(
   <div
     className={
       props.shake
         ? 'container d-flex flex-wrap justify-content-center shake'
         : 'container d-flex flex-wrap justify-content-center'
     }
   >
     {data.map((a, i) => <data name={a} key={i} clickEvent={props.clickEvent} />)}
   </div>
  )}

export default Album;