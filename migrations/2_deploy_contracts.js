var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var ConvertLib = artifacts.require('./ConvertLib.sol');
var Authentication = artifacts.require("./Authentication.sol");
var MetaCoin = artifacts.require('./MetaCoin.sol');
var Tickets = artifacts.require("./Ticket.sol");
var Exchange = artifacts.require("./Exchange.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.link(Killable, [Authentication, MetaCoin, Tickets, Exchange]);
  deployer.deploy(Authentication);
  deployer.deploy(MetaCoin);
  deployer.deploy(Tickets);
  deployer.deploy(Exchange);
};
