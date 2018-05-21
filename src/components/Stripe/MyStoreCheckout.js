// MyStoreCheckout.js
import React from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import {Button} from 'react-onsenui';
import PaymentRequestForm from './PaymentRequestForm';

// develop
// const apiKey = "pk_test_hAov2onJwga3U2c8qSXWTi7u"

// production
const apiKey = "pk_live_0bt7bCCqpcjtgak0mKMvNMqz"

const Checkout = (props) => {
  const {
      canMakePayment,
      sendToken,
    } = props;

  if (canMakePayment) {
    return null;
  }

  return (
    <StripeCheckout
      token={sendToken}
      stripeKey={apiKey}
      image="https://stripe.com/img/documentation/checkout/marketplace.png"
      name="作者に牛丼をおごる"
      amount={380}
      currency="JPY"
      locale="ja"
    >
      <Button
      id="customButton"
      className="p-index__side__contact__button__child"
      modifier="cta"
    >
    <p className="p-index__side__contact__button__inner">
      作者に牛丼をおごる
    </p>
  </Button>
  </StripeCheckout>
  );
}

class MyStoreCheckout extends React.Component {

  render() {
    const {
      changeValueForKey,
      canMakePayment,
      sendStripeToken,
    } = this.props;
    return (
      <div style={{width: '100%', textAlign: 'center'}}>
      <StripeProvider apiKey={apiKey}>
        <Elements>
          <PaymentRequestForm
            changeValueForKey={changeValueForKey}
          />
        </Elements>
      </StripeProvider>
      <Checkout
        canMakePayment={canMakePayment}
        sendToken={sendStripeToken}
        />
      </div>
    );
  }
}

export default MyStoreCheckout;