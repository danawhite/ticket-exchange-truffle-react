import React from 'react';

const styles = {
    img: {
        borderRadius: 40
    }
};

const EventCard = (props) => {
    const {
        event,
        onOpenModal,
        account
    } = props;

    return (
        <div style={{flex: 1, margin: 10, flexDirection: 'column', justifyContent: 'center'}}
             onClick={() => onOpenModal(event, account)}>
            <img style={styles.img}
                 src={`src/assets/images/chapelle/${event.img}`} height={80} width={80}/>
            <h6 style={{
                textAlign: 'center',
                color: account
                && account.balance.account > 0
                    ? 'green' : 'black'
            }}>{account && account.balance.account}</h6>
        </div>
    )
};

export default EventCard;
