// MyStoreCheckout.js
import React from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';
import PaymentRequestForm from './PaymentRequestForm';

// develop
// const apiKey = "pk_test_hAov2onJwga3U2c8qSXWTi7u"

// production
const apiKey = "pk_live_0bt7bCCqpcjtgak0mKMvNMqz"


class MyStoreCheckout extends React.Component {

  render() {
    const {
      sendStripeToken,
    } = this.props;

    return (
      <div style={{width: '100%', textAlign: 'center', marginTop: '10px'}}>
        <StripeProvider apiKey={apiKey}>
            <Elements>
            <PaymentRequestForm
                apiKey={apiKey}
                sendToken={sendStripeToken}
            />
            </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default MyStoreCheckout;