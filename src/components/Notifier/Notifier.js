import React from 'react';
import Aux from  '../../hoc/Aux';
import './Notifier.css';
import Backdrop from './Backdrop/Backdrop'
export default props => {
  let notifierStyle={
    transform: 'translateY(-100vh)'
  }
  if (props.show) {
    notifierStyle={
      transform:'translateY(0)'
    }
  }
  return (
     <Aux>
          {props.show ?<Backdrop abs backdropClick={props.noClick} /> :null}
          <div className='notifier' style={notifierStyle}>
            <p>{props.data}</p>
            <div>
              <button className='no' onClick={props.noClick}>No</button>
              <button className='yes' onClick={props.yesClick}>Yes</button>
            </div>
          </div>
     </Aux>
  )
}
