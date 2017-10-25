import React from 'react';
import renderer from 'react-test-renderer';

import TicketExchange from './index';

it('should render correctly', () => {
    const tree = renderer.create(
        <TicketExchange/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});