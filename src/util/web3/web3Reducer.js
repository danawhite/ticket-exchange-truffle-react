const initialState = {
  web3Instance: null
};

// const fetchAccounts = () => {
//     return {
//         type: ACCOUNTS_REQUESTED
//     }
// };

// export function getAccounts(web3){
//
//     return dispatch => {
//
//         dispatch(fetchAccounts);
//
//         web3.eth.getAccounts(function (err, accounts) {
//             if (err != null) {
//                 window.alert('There was an error fetching your accounts.')
//                 console.error(err);
//                 return;
//             }
//
//             if (accounts.length === 0) {
//                 window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
//                 return;
//             }
//
//             dispatch({
//                 type: ACCOUNTS_RECEIVED,
//                 accounts
//             });
//         })
//
//     }
// }

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED')
  {
    console.log('webInstance', action.payload.web3Instance);
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance
    })
  }
  if(action.type === 'GET_ACCOUNTS') {
    console.log('getAccounts');
  }
  return state
};

export default web3Reducer