import React, { Component } from 'react'

import './Exchange.css'

// replace with truffle-contract
import MetaCoin from '../../../../../build/contracts/MetaCoin.json';
import Tickets from '../../../../../build/contracts/Ticket.json';

const contract = require('truffle-contract');

// import Web3 from 'web3';
//
// const provider = new Web3.providers.HttpProvider('http://localhost:8545');
// MetaCoin.setProvider(provider);

class SendCoin extends Component {
    constructor(props) {
        super(props)

        console.log(this, props.coinbase);

        this.handleSendMeta = this.handleSendMeta.bind(this)
    }

    componentDidUpdate = (prevProps, prevState) => {
        // console.log(this.props);
        // if(prevProps !== this.props) {
        //     this.setState({
        //         selectedAccount
        //     });
        // }
    };

    handleSendMeta(e) {
        e.preventDefault();

        const meta = contract(MetaCoin);


        meta.deployed().then(instance => instance.sendCoin(
            this.recipientAddressInput.value,
            this.sendAmountInput.value,
            {from: this.props.sender})
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

export default SendCoin
