import React from 'react';
import PropTypes from 'prop-types';

const stadiumPic = 'http://www.bluemaize.net/im/arts-crafts-sewing/astro-turf-2.jpg'

const EventListItem = ({event, onItemClick}) => (
    <div style={{display: 'flex', backgroundColor: '#101820' , margin: 10, borderRadius: 8, padding: 5, justifyContent: 'space-between', flexDirection: 'column'}}>
        <div>
            <div style={{flex: 1, color: 'snow', fontSize: 16, padding: 10, fontWeight: 'bold', textTransform: 'uppercase'}}>Ravens vs {event.opponent}</div>
            <div style={{display: 'flex', flex: 1, height: 140, padding: 10, backgroundImage: `url(${stadiumPic})`, justifyContent: 'space-between'}}>
                <img style={styles.eventImage}
                     src={event.ravensSrc}/>
                <img style={styles.eventImage}
                     src={event.opponentImage}/>
            </div>
            <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#241772', height: 50}}
                 onClick={() => onItemClick(event.opponent)}>
                <div style={{textTransform: 'uppercase', color: 'snow', fontWeight: 'bold'}}>Buy Tickets</div>
            </div>
        </div>
    </div>
);

const styles = {
    eventImage: {
        height: 180,
    }
};

EventListItem.propTypes = {
    opponent: PropTypes.string
};

EventListItem.defaultProps = {
    opponent: 'Event Title'
};

export default EventListItem;


