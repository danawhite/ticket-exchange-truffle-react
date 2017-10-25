import React, { Component } from 'react';
import { connect } from 'react-redux';

class Transactions extends Component {
   render() {
       const { transactions } = this.props;

       return (
           <div style={{padding: 10}}>
               {transactions && transactions.map((tx, idx) => (
                    <div key={idx} style={{margin: 10, padding: 20, backgroundColor: '#d0b240', borderRadius: 10, color: 'snow'}}>
                        <div>Block Number: <strong>{tx.receipt.blockNumber}</strong></div>
                        <div>Transaction Hash: <strong>{tx.receipt.transactionHash}</strong></div>
                        <div>Sender: <strong>{tx.logs[0].args.sender}</strong></div>
                        <div>Receiver: <strong>{tx.logs[0].args.receiver}</strong></div>
                        <div>Price: <strong>${tx.logs[0].args.quantity.c}</strong></div>
                    </div>
                   )
               )}
           </div>
       )
   }
};

const mapStateToProps = state => ({
    transactions: state.events.transactions
});

const mapDispatchToProps = dispatch => ({}, dispatch);

export default connect(
    mapStateToProps,
    null)(Transactions)