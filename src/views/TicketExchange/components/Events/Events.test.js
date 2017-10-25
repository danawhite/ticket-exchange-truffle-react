import React from 'react';
import renderer from 'react-test-renderer';

import EventsContainer from './index';

it('renders correctly', () => {

    const event = {
        img: 'image'
    };

    const tree = renderer.create(
        <EventsContainer/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('should render modal when tickets is selected', () => {
    expect(false).toEqual(true)
});