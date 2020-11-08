import React from 'react';
import '../styles/Subtotal.css';
import { ShoppingBasket } from '@material-ui/icons';
import CurrencyFormat from 'react-currency-format';

export const Subtotal = () => {
  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => {
          <>
            <p>
              Subtotal (x items): <strong>X</strong>
            </p>
            <small className='subtotal__gift'>Gift</small>
          </>;
        }}
        decimalScale={2}
        value={0}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'€'}
      ></CurrencyFormat>
      <button>Proceed to checkout</button>
    </div>
  );
};
