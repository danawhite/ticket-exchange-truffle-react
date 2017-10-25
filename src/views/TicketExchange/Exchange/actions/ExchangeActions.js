const types = {
    UPDATE_SELECTED_EVENT: 'UPDATE_SELECTED_EVENT'
};

const ExchangeActions = {
    updateSelectedEvent: (event) => {
        return {
            type: types.UPDATE_SELECTED_EVENT,
            event
        }
    }
};

export default ExchangeActions;