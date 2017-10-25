var TicketExchange = artifacts.require('./TicketExchange.sol');

contract('TicketExchange', function() {
   it('transfers ownership of ticket', function() {
       const ticket = {};
       const addressFrom = '0x01';
       const addressTo = '0x02';
       return TicketExchange.deployed().then(function(instance) {
           return instance.exchangeTicket(ticket, addressFrom, addressTo)

           assert.equal(addressFrom, '0x01', 'Wrong address');
       })
   })
});