import React from 'react';
import Backdrop from '../Notifier/Backdrop/Backdrop';
import Aux from '../../hoc/Aux';
import Adder from '../Adder/Adder';
import './EditTask.css'

export default props => {
  return (
    <Aux>
      <Backdrop backdropClick={props.backdropClick} abs />
      <div className='editTask'>
        <p>Edit Task!</p>
        <Adder
          value={props.adderValue}
          changeHandler={props.editChange}
          valid={props.valid}
          addClick={props.addClick}
        />
      </div>
    </Aux>
  )
}
