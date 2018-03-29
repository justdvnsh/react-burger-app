import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}>Less</button>
    <button
      className={classes.More}
      onClick={props.added}>More</button>
  </div>
)

// onClick is provided by React and not HTML . This is JSX
// we set the disabled property as default

export default buildControl;
