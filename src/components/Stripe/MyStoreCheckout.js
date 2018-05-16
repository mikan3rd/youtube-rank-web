// MyStoreCheckout.js
import React from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './PaymentRequestForm';

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <StripeProvider apiKey="pk_live_0bt7bCCqpcjtgak0mKMvNMqz">
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}

export default MyStoreCheckout;