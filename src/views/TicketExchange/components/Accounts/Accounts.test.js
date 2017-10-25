import React from 'react';
import renderer from 'react-test-renderer';

import Accounts from './index';

it('renders correctly', () => {

    const event = {
        img: 'image'
    };

    const tree = renderer.create(
        <Accounts/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});