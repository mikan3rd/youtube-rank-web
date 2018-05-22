import React from 'react';
import {injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import {Button} from 'react-onsenui';


class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);
    // For full documentation of the available paymentRequest options, see:
    // https://stripe.com/docs/stripe.js#the-payment-request-object
    const paymentRequest = props.stripe.paymentRequest({
      country: 'JP',
      currency: 'jpy',
      total: {
        label: '作者に牛丼をおごる',
        amount: 380,
      },
    });

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    });

    paymentRequest.canMakePayment().then(result => {
      console.log("canMakePayment:", result)
      this.setState({canMakePayment: !!result});
    });

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  render() {
    const {
      apiKey,
      sendToken,
    } = this.props;

    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={this.state.paymentRequest}
        className="PaymentRequestButton"
        style={{
          margin: '5px 10px',
          // For more details on how to style the Payment Request Button, see:
          // https://stripe.com/docs/elements/payment-request-button#styling-the-element
          paymentRequestButton: {
            type: 'donate',
            theme: 'dark',
            height: '64px',
          },
        }}
      />
    ) : (
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
}

export default injectStripe(PaymentRequestForm);

