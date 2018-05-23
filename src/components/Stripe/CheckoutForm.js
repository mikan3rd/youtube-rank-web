// CheckoutForm.js
import React from 'react';
import {injectStripe, CardNumberElement,CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import {Button, Modal, Icon} from 'react-onsenui';

class CheckoutForm extends React.Component {

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    // ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken().then(({token}) => {
      console.log('Received Stripe token:', token);
      if (token) {
        this.props.changeValueForKey({key: 'isOpenModal', value: false});
        this.props.sendToken(token);
      }
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    const {
      isOpenModal,
      changeValueForKey,
    } = this.props;

    return (
      <div>
          <Modal
            isOpen={isOpenModal}
            animation="fade"
          >
            <div className="c-stripe__modal">
              <div className="c-stripe__modal__top">
              <div
                className="c-stripe__modal__top__close"
                onClick={() => changeValueForKey({key: 'isOpenModal', value: false})}
              >閉じる</div>
              <Icon
                icon="md-shopping-cart"
                size={80}
              />
                <div>作者に牛丼をおごる</div>
              </div>
              <div className="c-stripe__modal__content">
                <div>
                  <label>カード番号</label>
                  <CardNumberElement  className="c-stripe__modal__content__input" />
                </div>
                <div>
                  <label>有効期限</label>
                  <CardExpiryElement className="c-stripe__modal__content__input" />
                </div>
                <div>
                  <label>セキュリティーコード</label>
                  <CardCVCElement className="c-stripe__modal__content__input" />
                </div>
              </div>
              <div
                className="c-stripe__modal__bottom"
                onClick={() => this.handleSubmit()}
              >
                ¥380円を支払う
              </div>
            </div>
          </Modal>
        <Button
          className="p-index__side__contact__button__child"
          modifier="cta"
          onClick={() => changeValueForKey({key: 'isOpenModal', value: true})}
        >
          <p className="p-index__side__contact__button__inner">
            作者に牛丼をおごる
          </p>
      </Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);