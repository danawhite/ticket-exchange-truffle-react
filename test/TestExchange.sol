pragma solidity ^0.4.13;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Exchange.sol";

contract TestTicketExchange {

    function testItChangesOwnership() {
        Exchange exchange = Exchange(DeployedAddresses.Exchanges());

        //exchange.changeOwnership()

    }
}
