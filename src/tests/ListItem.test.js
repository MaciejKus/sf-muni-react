import React from 'react';
import ListItem from '../components/ListItem';
import renderer from 'react-test-renderer';

describe('ListItem', () => {
  let props;

  beforeEach(() => {
    props = {
      isActive: false,
      handleAddRoute: () => {},
      handleRemoveRoute: () => {},
      tag: '3',
      title: '3 bus line',
    };
  })

  test('Matches snapshot', () => {
    const component = renderer.create(
      <ListItem
       {...props}
      />    
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    props.isActive = true;
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
