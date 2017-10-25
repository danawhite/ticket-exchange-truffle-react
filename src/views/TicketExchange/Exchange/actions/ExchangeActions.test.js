import actions from './ExchangeActions';

describe('exchange actions', () => {
    it('should create an action to update selected ticket', () => {
        const event = 'some event';
        const expectedAction = {
            type: 'UPDATE_SELECTED_EVENT',
            event
        };

        expect(actions.updateSelectedEvent(event)).toEqual(expectedAction)
    })
});