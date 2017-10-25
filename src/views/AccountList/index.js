import React, { Component } from 'react';
import { connect } from 'react-redux';

import EventsContainer from '../TicketExchange/components/Events';
import Transactions from '../TicketExchange/components/Transactions';

import MetaCoin from '../../../build/contracts/MetaCoin.json';

const contract = require('truffle-contract');

var metaCoin;

class AccountList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            coinbase: '',
            ticketPrice: '10'
        };

        this._getAccountBalance = this._getAccountBalance.bind(this);
        this._getAccountBalances = this._getAccountBalances.bind(this)
    }

    componentWillMount(){
        const { web3 } = this.props;
        metaCoin = contract(MetaCoin);
        web3 && metaCoin.setProvider(web3.currentProvider);
    }

    componentDidMount() {
        const refreshBalances = () => {
            this._getAccountBalances()
        };

        refreshBalances();

        setInterval(()=>{
            refreshBalances();
            return refreshBalances
        }, 5000)
    }

    _getAccountBalance  = (account) => {
        const meta = metaCoin.deployed()
            .then(instance => instance.getBalance.call(account, { from: account})
                .then(result => result.c[0]));

        return meta;
    };

    _getAccountBalances = () => {
        const { web3 } = this.props;

        web3.eth.getAccounts(function (err, accounts) {
            if (err != null) {
                window.alert('There was an error fetching your accounts.');
                console.error(err);
                return
            }

            if (accounts.length === 0) {
                window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            this.setState({coinbase: accounts[0]});

            var accountsAndBalances = accounts.map((account) => {
                return this._getAccountBalance(account)
                    .then((balance) => { return { account, balance } })
            });

            Promise.all(accountsAndBalances).then((accountsAndBalances) => {
                this.setState({
                    accounts: accountsAndBalances,
                    coinbaseAccount: accountsAndBalances[0]
                })
            })
        }.bind(this))
    };

    updateSelectedAccount = (account) => {
        this.setState({
            selectedAccount: account
        })
    };

    handlePurchase = (event, account, quantity) => {
        const {
            coinbase,
            ticketPrice,
            accounts
        } = this.state;

        let totalPrice = ticketPrice * quantity.value;

        let sender = accounts[accounts.indexOf(account)].account;
        const meta = MetaCoin.deployed();
        console.log(`Recipient Address: ${coinbase}`);

        meta.sendCoin(coinbase, totalPrice, {from: sender}).then(function() {
            console.log(`Coins sent for ${quantity.value} tickets from ${sender} to ${coinbase}`)
        }).catch(function(e) {
            console.log(e);
        });
    };

    render() {
        return (
            <div style={{display: 'flex', flex: 1, flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'flex-start'}}>
                <div>
                    <EventsContainer/>
                </div>
                <div>
                    <div style={{fontSize: 16, textTransform: 'uppercase', fontWeight: 'bold'}}>Transactions</div>
                   <Transactions/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state  => {
    return {
        web3: state.web3.web3Instance,
        accounts: state.events.accounts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileFormSubmit: (name) => {
            event.preventDefault();
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountList);
