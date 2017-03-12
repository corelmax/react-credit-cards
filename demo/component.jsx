import React from 'react';
import Payment from 'payment';
import cx from 'classnames';

import Cards from '../src';

let hasTouch = false;

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '',
      name: '',
      exp: '',
      cvc: '',
      focused: '',
      type: {
        name: '',
        maxLength: 16,
      },
      isValid: null,
    };

    this.inputs = [];
  }

  componentDidMount() {
    Payment.formatCardNumber(document.querySelector('[name="number"]'));
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'));

    window.addEventListener('touchstart', function setHasTouch() {
      hasTouch = true;
      window.removeEventListener('touchstart', setHasTouch);
    }, false);

    /*
     this.inputs.forEach(d => {
     d.addEventListener('focusin', ev => {
     this.inputs.forEach(e => {
     console.log('focusin', e.name, document.activeElement === e);
     });
     });

     d.addEventListener('focusout', ev => {
     this.inputs.forEach(e => {
     console.log('focusout', e.name, document.activeElement === e);
     });
     });
     });
     */
  }

  handleInputFocus = (e) => {
    const target = e.target;

    this.setState({
      focused: target.name,
    });

    if (hasTouch) {
      const content = document.querySelector('.rccs__demo__content');
      const form = document.querySelector('.rccs__demo__form');

      document.body.classList.add('is-keyboard-visible');
      document.body.style.marginTop = `${-content.offsetTop}px`;
      form.scrollTop = target.parentElement.offsetTop;
    }
  };

  handleInputBlur = () => {
    if (hasTouch) {
      document.body.style.marginTop = 0;
      document.body.classList.remove('is-keyboard-visible');
    }
  };

  handleInputChange = (e) => {
    const target = e.target;

    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    } else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    } else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  handleCallback = (type, isValid) => {
    this.setState({
      type,
      isValid: type.issuer !== 'unknown' ? isValid : null,
    });
  };

  render() {
    const { name, number, expiry, cvc, focused, isValid } = this.state;

    return (
      <div className="rccs__demo">
        <h1>React Credit Cards</h1>
        <div className="rccs__demo__content">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <div className="rccs__demo__form">
            <form>
              <div>
                <input
                  ref={c => this.inputs.push(c)}
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  className={cx({
                    'is-not-valid': isValid === false,
                    'is-valid': isValid,
                  })}
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                />
                <div>e.g.: 49..., 51..., 36..., 37...</div>
              </div>
              <div>
                <input
                  ref={c => this.inputs.push(c)}
                  type="text"
                  name="name"
                  placeholder="Name"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                />
              </div>
              <div>
                <input
                  ref={c => this.inputs.push(c)}
                  type="tel"
                  name="expiry"
                  placeholder="Valid Thru"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                />
                <input
                  ref={c => this.inputs.push(c)}
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="rccs__demo__footer">
          <iframe
            src="https://ghbtns.com/github-btn.html?user=amarofashion&repo=react-credit-cards&type=star&count=true"
            frameBorder="0"
            scrolling="0" width="110px" height="20px"
          />
          <iframe
            src="https://ghbtns.com/github-btn.html?user=amarofashion&type=follow&count=true"
            frameBorder="0"
            scrolling="0" width="150px" height="20px"
          />
        </div>
      </div>
    );
  }
}

