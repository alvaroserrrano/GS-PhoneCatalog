import React from 'react';
import spinner from '../images/spinner.gif';

export const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt=''
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};
