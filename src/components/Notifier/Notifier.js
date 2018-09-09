import React from 'react';
import Backdrop from './Backdrop/Backdrop';
import Aux from  '../../hoc/Aux';

export default () => {
  return (
     <Aux>
         <Backdrop/>
          <div className='notifier'>
            <p>{props.data}</p>
            
          </div>
     </Aux>
  )
}
