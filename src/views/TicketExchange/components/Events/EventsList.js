import React, {Component} from 'react';
import EventCard from './components/EventCard/index';

export default class EventsList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderEvent = (event, index) => {
        const { handleOpenModal, accounts } = this.props;
        return (
            <EventCard key={index}
                       event={event}
                       account={accounts[index]}
                       onOpenModal={handleOpenModal}
            />
        )
    };

    render() {
        const { events } = this.props;
        return (
            <div style={{display: 'flex', flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start'}}>
                {events.map((event, index) => this.renderEvent(event, index))}
            </div>
        )
    }
}
