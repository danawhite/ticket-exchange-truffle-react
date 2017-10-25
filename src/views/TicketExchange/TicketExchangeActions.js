import MetaCoin from '../../../build/contracts/MetaCoin.json';
import store from '../../store';

const ACCOUNTS_FETCHED = 'ACCOUNTS_FETCHED';

const contract = require('truffle-contract');

// const metaCoin = contract(MetaCoin);
// metaCoin.setProvider(store.getState().web3.web3Instance);

export const getAccountBalances = (web3) => {
    console.log('metacoin')
    return dispatch => {
        dispatch({
            type: ACCOUNTS_FETCHED
        });

        // console.log('getAccountBalances', web3);
        // Using truffle-contract we create the metaCoin object
        // by turning contract artifacts into contract abstractions
        web3.eth.getAccounts(function (err, accounts) {
            if (!err) {
                console.error(err, accounts);
                return
            }
            //
            if (accounts.length === 0) {
                window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
                return;
            }

            console.log('accounts', accounts);
        });
 }
};

export function handleTicketTransfer(from, to, amount) {
    console.log('exchangeTickets');
}

export const updateSelectedAccount = (account = {}) => {
  console.log('updateSelectedAccount', account);
};

// return an array of objects of type { account, balance }
function getAccountBalance(account) {
    console.log('getAccountBalance', account);
    // ensures the correct network artifacts are used based on
    // the Ethereum client the abstraction is connected to.
    // const metaCoin = contract(MetaCoin);
    // metaCoin.setProvider(this.props.web3.currentProvider);
    // metaCoin.deployed()
    //     .then(instance => {
    //             console.log('instance', instance);
    //             return instance.getBalance.call(account, {from: account})
    //                 .then(function (result) {
    //                     console.log('result', result);
    //                     // resolve({ account: result.valueOf() })
    //                 })
    //                 .catch(function (e) {
    //                         console.log(e);
    //                         // reject()
    //                     }
    //                 )
    //         }
    //     )
};

