export const ACCOUNTS_REQUESTED = 'ACCOUNTS_REQUESTED';
export const ACCOUNTS_RECEIVED = 'ACCOUNTS_RECEIVED';

const initialState = {
    accounts: [],
    isRequesting: false,
};

const fetchAccounts = () => {
    return {
        type: ACCOUNTS_REQUESTED
    }
};

export function getAccounts(){
    const { web3 } = this.props;

    return dispatch => {

        dispatch(fetchAccounts);

        web3 && web3.eth.getAccounts(function (err, accounts) {
            if (err != null) {
                window.alert('There was an error fetching your accounts.')
                console.error(err);
                return;
            }

            if (accounts.length === 0) {
                window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
                return;
            }

            dispatch({
                type: ACCOUNTS_RECEIVED,
                accounts
            });
        })

    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'ACCOUNTS_REQUESTED':
            return {
                ...state,
                isRequesting: true
            };
        case 'ACCOUNTS_RECEIVED':
            return {
                ...state,
                accounts: [1, 2],
                isRequesting: !state.isRequesting
            };
    }
}



