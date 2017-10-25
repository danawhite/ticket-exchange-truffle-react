import React from 'react';
import renderer from 'react-test-renderer';

import Dashboard from './Dashboard';

it('should render correctly', () => {
    const authData = {
        name: 'Dana'
    };

    const tree = renderer.create(
        <Dashboard authData={authData}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});