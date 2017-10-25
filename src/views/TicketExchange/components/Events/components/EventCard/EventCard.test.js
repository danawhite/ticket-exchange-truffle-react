import React from 'react';
import renderer from 'react-test-renderer';

import EventCard from './index';

it('renders correctly', () => {

    const event = {
        img: 'image'
    };

    const tree = renderer.create(
        <EventCard event={event}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});