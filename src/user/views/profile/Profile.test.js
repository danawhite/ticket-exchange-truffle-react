import React from 'react';
import renderer from 'react-test-renderer';
// import Provider from 'react-redux';
import Profile from './';

const fakeStore = {
    item: 'One'
};

it('should render properly', () => {
    const tree = renderer.create(
        <Provider store={fakeStore}>
            <Home/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});