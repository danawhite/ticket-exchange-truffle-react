import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Accounts from './components/Accounts';
import Exchange from './components/Exchange';
import EventsContainer from './components/Events';

import {
    getAccountBalances,
    handleTicketTransfer
} from './TicketExchangeActions';

import './TicketExchange.css';

import MetaCoin from '../../../build/contracts/MetaCoin.json';

const contract = require('truffle-contract');

class TicketExchange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            coinbase: '',
            ticketPrice: '10'
        };
    }

    componentDidMount() {
        const {
            web3,
            getAccountBalances
        } = this.props;

        // getAccountBalances(web3);

        // const refreshBalances = () => {
        //     // this.getAccountBalances()
        // };

        // refreshBalances();

        // setInterval(()=>{
        //     refreshBalances();
        //     return refreshBalances
        // }, 5000)
    }

    // getAccountBalances = () => {
    //     const { web3 } = this.props;
    //
    //     web3 && web3.eth.getAccounts(function (err, accs) {
    //         if (err != null) {
    //             window.alert('There was an error fetching your accounts.')
    //             console.error(err);
    //             return
    //         }
    //
    //         if (accs.length === 0) {
    //             window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
    //             return
    //         }
    //
    //         this.setState({
    //             coinbase: accs[0]
    //         });
    //
    //         const accountsAndBalances = accs.map((account) => {
    //             console.log('account', account, this);
    //
    //             this.getAccountBalance(account)
    //                 .then((balance) => ({
    //                     account,
    //                     balance
    //                 }))
    //         });
    //
    //         Promise.all(accountsAndBalances).then((accountsAndBalances) => {
    //             this.setState({
    //                 accounts: accountsAndBalances,
    //                 coinbaseAccount: accountsAndBalances[0]
    //             })
    //         })
    //     }.bind(this))
    // };

    updateSelectedAccount = (account) => {
        this.setState({
            selectedAccount: account
        })
    };

    handlePurchase = (event, account, quantity) => {
        const { coinbase, ticketPrice, accounts } = this.state;

        let totalPrice = ticketPrice * quantity.value;

        let sender = accounts[accounts.indexOf(account)].account;
        console.log('onPurchase', coinbase, totalPrice, event, sender, quantity);
        // let meta;
        //
        // MetaCoin.deployed();
        // console.log(`Recipient Address: ${coinbase}`);
        //
        // meta.sendCoin(coinbase, totalPrice, {from: sender}).then(function() {
        //     console.log(`Coins sent for ${quantity.value} tickets from ${sender} to ${coinbase}`)
        // }).catch(function(e) {
        //     console.log(e);
        // });
    };

    render() {
        const {
            accounts,
            selectedAccount,
            coinbase
        } = this.state;

        const { web3 } = this.props;

        if(!web3) {
            return <div>Loading</div>
        }

        return (
            <div style={{display: 'flex', flex: 1, flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'flex-start'}}>
                <div>
                    <Accounts accounts={accounts}
                              handleAccountSelect={this.updateSelectedAccount}
                    />
                    <Exchange sender={coinbase} account={selectedAccount}/>
                </div>
                <div>
                    <EventsContainer accounts={accounts}
                                     handleOpenModal={() => console.log('Kevin')}
                                     onPurchase={this.handlePurchase}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    web3: state.web3.web3Instance
});

const mapDispatchToProps = dispatch => bindActionCreators({
    // getAccountBalances
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TicketExchange);
