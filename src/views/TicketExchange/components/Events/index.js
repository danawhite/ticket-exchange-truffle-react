import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    getEvents,
    getAccounts,
    createTransactionReceipt,
    exchangeTickets
} from '../../reducers/events';

// import { getAccounts } from '../../reducers/accounts';

import EventsListItem from './components/EventListItem';

import TicketExchange from '../../../../../build/contracts/Exchange.json';
import MetaCoin from '../../../../../build/contracts/MetaCoin.json';
const contract = require('truffle-contract');
const BigNumber = require('bignumber.js');


import Rodal from 'rodal';
import Select from 'react-select'


import EventsList from './EventsList';

import './rodal.css';
import './react-select.css';

const quantityOptions = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value:3, label: 3},
    {value: 4, label: 4},
    {value:5, label: 5},
    {value: 6, label: 6},
    {value: 7, label: 7},
    {value: 8, label: 8}
];

const styles = {
    modal: {
        height: 800,
        width: 600,
        background: 'steelblue'
    },
    header: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end'
    },
    eventImage: {
        height: 170,
        width: 200
    },
    buyInfoContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'grey',
        borderRadius: 10
    },
    purchaseBtn: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'green',
        borderRadius: 4,
        height: 42,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    }
};

class Events extends Component {
    state = {
        events: [],
        showModal: false,
        selectedEvent: {},
        selectedAccount: {}
    };

    static propTypes = {};

    static defaultProps = {};

    componentDidMount = () => {
        const {
            getEvents,
            getAccounts
        } = this.props;

        getEvents()
            .then(events => {
                console.log('the events tho', events)
                this.setState({
                    events
                })
            });

        getAccounts()
    };

    openModal = (event, account) => {
        console.log('openModal', event, account);
        const { selectedEvent, selectedAccount } = this.state;
        this.setState({
            showModal: true,
            selectedEvent: event,
            selectedAccount: account
        }, () => console.log(selectedEvent, selectedAccount))
    };

    handleCloseModal = () => {
        this.setState({
            showModal: false
        })
    };

    test = (opp) => {
        this.exchangeTickets(opp);
    };

    exchangeTickets = () => {
        const {
            web3,
            accounts,
            createTransactionReceipt
        } = this.props;

        const Exchange = contract(TicketExchange);
        Exchange.setProvider(web3.currentProvider);
        Exchange.deployed()
            .then(instance => {
                return instance.exchangeEtherForTickets(accounts[1], 30, {from: accounts[0]});
            })
            .then(result => {
                web3.eth.getBlock(result.logs.blockNumber - 1, (error, result) => console.log('block', result))
                createTransactionReceipt(result);
            })
            .catch(err => console.log(err))
    };

    render() {
        const {
            events,
        } = this.state;

        return (
            <div style={{paddingTop: 50}}>
                {events.events
                && events.events.map(
                    (event, index) => <EventsListItem key={index}
                                                      event={event}
                                                      onItemClick={(opponent) => this.test(opponent)}/>
                )}
            </div>

        )
    }
}

const mapStateToProps = state => ({
    events: state.events.events,
    web3: state.web3.web3Instance,
    accounts: state.events.accounts
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getEvents,
    getAccounts,
    createTransactionReceipt
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events)
