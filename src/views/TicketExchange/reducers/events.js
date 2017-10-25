import store from '../../../store';
const contract = require('truffle-contract');

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const EVENTS_RECEIVED = 'EVENTS_RECEIVED';
export const ACCOUNTS_REQUESTED = 'ACCOUNTS_REQUESTED';
export const ACCOUNTS_RECEIVED = 'ACCOUNTS_RECEIVED';
export const TICKET_EXCHANGE_INITIATED = 'TICKET_EXCHANGE_INITIATED';
export const TICKET_EXCHANGE_COMPLETE = 'TICKET_EXCHANGE_COMPLETE';
export const TRANSACTION_RECEIPT_REQUESTED = 'TRANSACTION_RECEIPT_REQUESTED';

import RavensSchedule from '../../../api/ravens-schedule';

import TicketExchange from '../../../../build/contracts/Exchange.json';

const initialState = {
    events: [],
    accounts: [],
    isRequesting: false,
    isExchanging: false,
    transactions: []
};

const eventsReceived = (events) => ({
    type: EVENTS_RECEIVED,
    events
});

const fetchAccounts = () => {
    return {
        type: ACCOUNTS_REQUESTED
    }
};

export function getEvents() {
    console.log('getEvents');
    return dispatch => {
        dispatch({
            type: FETCH_EVENTS
        });

        return new Promise((resolve) => {
            resolve(dispatch(eventsReceived(RavensSchedule)))
        })
    }
}

export function getAccounts(){
    return dispatch => {
        dispatch(fetchAccounts);

        console.log('the store', store);

        store.getState().web3.web3Instance.eth.getAccounts(function (err, accounts) {
            if (err != null) {
                window.alert('There was an error fetching your accounts.')
                console.error(err);
                return;
            }

            if (accounts.length === 0) {
                window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
                return;
            }

            console.log('the accounts', accounts);

            dispatch({
                type: ACCOUNTS_RECEIVED,
                accounts
            });
        })

    }
}

export function exchangeTickets(from, to, quantity) {
    return dispatch => {
        dispatch({
            type: TICKET_EXCHANGE_INITIATED
        });

        const ticket = contract(TicketExchange);
        ticket.setProvider(store.getState().web3.web3Instance.currentProvider);
    }
}

export function createTransactionReceipt(transaction) {
    console.log('createTransactionReceipt', transaction);
    return dispatch => {
        dispatch({
            type: TRANSACTION_RECEIPT_REQUESTED,
            transaction
        })
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                isRequesting: true
            };
        case EVENTS_RECEIVED:
            return {
                ...state,
                events: action.events,
                isRequesting: !state.isRequesting
            };
        case ACCOUNTS_RECEIVED:
            return {
                ...state,
                accounts: action.accounts
            };
        case TICKET_EXCHANGE_INITIATED:
            return {
                ...state,
                isExchanging: true
            };
        case TICKET_EXCHANGE_COMPLETE:
            return {
                ...state,
                isExchanging: false
            };
        case TRANSACTION_RECEIPT_REQUESTED:
            console.log('tx recvd');
            return {
                ...state,
                transactions: [...state.transactions, action.transaction]
            };
        default:
            return state;
    }
}




