import store from '../../store'
import Web3 from 'web3'

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED';
export function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise(function(resolve, reject) {
    // explicitly setting provider to testrpc development environment
    const provider = new Web3.providers.HttpProvider('http://localhost:8545');

    const web3 = new Web3(provider);

    const results = {
        web3Instance: web3
    };

    console.log('No web3 instance injected, using Local web3.', web3.eth);

    resolve(store.dispatch(web3Initialized(results)))
});

export default getWeb3;
