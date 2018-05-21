import React from 'react';
import {injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';

class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);

    // For full documentation of the available paymentRequest options, see:
    // https://stripe.com/docs/stripe.js#the-payment-request-object
    console.log(props);
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
      this.props.changeValueForKey({key: 'canMakePayment', value: !!result});
    });

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  render() {
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
    ) : null;
  }
}

export default injectStripe(PaymentRequestForm);

