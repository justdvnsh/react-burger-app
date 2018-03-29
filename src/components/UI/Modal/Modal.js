import React from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Wrap from '../../../Hoc/Wrapper';

const modal = (props) => (
  <Wrap>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className ={ classes.Modal}
      style = {{
      transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
      opacity: props.show ? '1' : '0'
      }}
      >
      {props.children}
    </div>

  </Wrap>
)
export default modal;
