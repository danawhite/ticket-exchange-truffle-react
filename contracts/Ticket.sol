pragma solidity ^0.4.11;

import "./ConvertLib.sol";
import './zeppelin/lifecycle/Killable.sol';


// similar to Ballot
contract Ticket is Killable {
	uint public price;
	uint256 public id;
	address public seller;
	address public buyer;

	uint constant refundPeriod = 30 minutes; //double-check that unit is valid

	function Ticket() {
		owner = msg.sender;
	}

	modifier onlySeller() {
		require(msg.sender == seller);
		_;
	}

	modifier onlyBuyer() {
		require(msg.sender == buyer);
		_;
	}

	event TicketPriceUpdated(uint price);
	event TicketTransfer(address sender, address receiver, uint price, uint256 balance, uint gas);
	event Aborted();
	event TransferUpdated();
	event TicketReceived();

	function exchangeTicketForEther(address sender, address receiver, uint price) returns(bool sufficient){
		TicketTransfer(msg.sender, receiver, price, this.balance, msg.gas);

		return true;
	}

//	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
//		if (balances[msg.sender] < amount) {
//			return false;
//		}
//
//		balances[msg.sender] -= amount;
//		balances[receiver] += amount;
//		CoinTransfer(msg.sender, receiver, amount);
//
//		return true;
//	}

	function updateTicketPrice(uint newPrice) {
		price = newPrice;
		TicketPriceUpdated(price); //update
	}

	function highestBid() constant
		returns (uint winningBid)
	{

	}

	/// Abort the purchase and reclaim the ether.
	/// Can only be called by the seller before
	/// the contract is locked.
	function abort() {}
}
