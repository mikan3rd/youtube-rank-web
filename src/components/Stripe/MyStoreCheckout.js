// MyStoreCheckout.js
import React from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './PaymentRequestForm';

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_hAov2onJwga3U2c8qSXWTi7u">
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}

export default MyStoreCheckout;