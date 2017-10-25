import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './Accounts.scss'

class Accounts extends Component {
    constructor(props) {
        super(props);
    }

    updateCurrentAccount = (account) => {
        const { handleAccountSelect } = this.props;
        handleAccountSelect(account);
    };

    getTicketsForBalance = (balance) => {
        return balance/2;
    };

    render() {
        //replace with list items
        const { accounts } = this.props;
        return (
            <table>
                <thead>
                <tr>
                    <td>Account Number</td>
                    <td>Coins</td>
                    <td>Tickets</td>
                </tr>
                </thead>
                <tbody>
                {accounts && accounts.map(this.renderAccount)}
                </tbody>
            </table>
        )
    }

    renderAccount = ({account, balance}) => {
        return (
            <tr key={account} onClick={() => this.updateCurrentAccount(account)}>
                <td>{account}</td>
                <td>{balance}</td>
                <td>{this.getTicketsForBalance(balance)}</td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Accounts)
