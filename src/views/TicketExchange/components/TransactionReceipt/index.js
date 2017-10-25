import React from 'react';

import { connect } from 'react-redux';

const TransactionReceipt = (props) => (
    <div>Transaction Receipt</div>
);

const mapStateToProps = state => ({
    transactions: state.events.transactions
});

const mapDispatchToProps = dispatch => {

};

export default connect()(TransactionReceipt);
