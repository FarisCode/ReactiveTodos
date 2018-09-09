import React from 'react';
import './Backdrop.css';
export default props => {
  let dropStyle=null;
  if (props.abs) {
    dropStyle={position:'absolute'}
  }
  return (
    <div className='backdrop' onClick={props.backdropClick} style={dropStyle}>

    </div>
  )
}
