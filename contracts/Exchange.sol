pragma solidity ^0.4.13;

import './zeppelin/ownership/Ownable.sol';
import './MetaCoin.sol';
//import './Ticket.sol';

// users exchange tickets for ether
contract Exchange is Ownable {
    mapping (address => uint) public numTickets;
//    mapping (address => Ticket) public tickets;
    event TicketTransfer(address sender, address receiver, uint quantity);

    struct Ticket {
        bytes32 name;
        uint price;
        address owner;
    }

    Ticket[] public tickets;

    function Exchange() {
        numTickets[msg.sender] = 100;
    }

    function exchangeEtherForTickets(address receiver, uint quantity) onlyOwner returns(bool sufficient) {

        require(numTickets[msg.sender] >= quantity);

        numTickets[receiver] += quantity;

        TicketTransfer(msg.sender, receiver, quantity);

        return true;
    }
}
