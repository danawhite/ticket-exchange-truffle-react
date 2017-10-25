import React, { Component } from 'react'
import { connect } from 'react-redux';

import MetaCoin from '../../../../build/contracts/MetaCoin.json';

const contract = require('truffle-contract');

import './Exchange.scss'

class Exchange extends Component {
  constructor(props) {
      super(props)

      console.log(this, props.coinbase);

    this.handleSendMeta = this.handleSendMeta.bind(this)
  }

    handleSendMeta(e) {
      const {
          web3,
          accounts
      } = this.props;

      console.log('acc', accounts[0]);

      e.preventDefault();

      const meta = contract(MetaCoin);
        meta.setProvider(web3.currentProvider);

        meta.deployed().then(instance => instance.sendCoin(
            this.recipientAddressInput.value,
            this.sendAmountInput.value)
            .then(function(result) {
                console.log('SENT', result)
            }).catch(function(e) {
                console.log(e);
            }));

        console.log(`Recipient Address: ${this.recipientAddressInput.value}, ${this.sendAmountInput.value}`)
    }

  render() {
      const {selectedAccount} = this.props;
    return (
      <form className='SendCoin'>
        <label htmlFor='recipient_address'>Recipient Address</label>
        <input id='recipient_address'
               className='RecipientAddress'
               type='text'
               value={selectedAccount}
               ref={(i)=>{ if(i) { this.recipientAddressInput = i}}} />
        <label htmlFor='send_amount'>Amount</label>
        <input id='send_amount' className='SendAmount' type='text' ref={(i) => { if(i) { this.sendAmountInput = i}}} />
        <button className='SendBtn' onClick={this.handleSendMeta}>Send</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
    web3: state.web3.web3Instance,
    accounts: state.events.accounts
});

// const mapDispatchToProps = dispatch => {};


export default connect(
    mapStateToProps,
    null)(Exchange)
