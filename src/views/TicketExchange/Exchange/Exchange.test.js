import React from 'react';
import renderer from 'react-test-renderer';

import Exchange from './index';

it('should render correctly', () => {
    const tree = renderer.create(
        <Exchange/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});