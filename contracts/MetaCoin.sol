pragma solidity ^0.4.0;
import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
	mapping (address => uint) public balances;
	event CoinTransfer(address sender, address receiver, uint amount);

	function MetaCoin() {
		balances[msg.sender] = 10000;
	}

	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		require(balances[msg.sender] < amount);

		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		CoinTransfer(msg.sender, receiver, amount);

		return true;
	}

	function getBalanceInEth(address addr) returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) returns(uint) {
  	    return balances[addr];
	}
}
