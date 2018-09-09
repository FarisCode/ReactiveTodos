import React from 'react';
import './Task.css'
export default props => {
  let desStyle = {
    fontSize: '0.9em',
    width: '80%',
    height: '100%'
  }
  if (props.done) {
    desStyle = {
      fontSize: '0.7em',
      textDecoration: 'line-through',
      opacity: '0.5',
      width: '80%',
      lineHeight: '30px'
    }
  }
  let taskZIndex = null;
  if (props.edit) {
    taskZIndex = { zIndex: 200 };
  }
  return (
    <div className='task' style={taskZIndex}>
      <div className='text' style={desStyle} onClick={props.taskClick} >
        {props.des}
      </div>
      <div>
        {
          !props.done
            ? <i
              className="far fa-edit"
              onClick={props.editClick}
              style={{
                color: 'maroon',
                margin: '0 5px',
                fontSize: '0.9em'
              }}></i>
            : null
        }
        <i className="fas fa-trash-alt" onClick={props.taskDel} style={{ color: 'maroon', margin: '0 5px', fontSize: '0.9em' }}></i>
      </div>
    </div>
  );
}
