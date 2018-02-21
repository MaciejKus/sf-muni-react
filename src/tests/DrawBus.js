import React from 'react';
import DrawBus from '../components/DrawBus';
import renderer from 'react-test-renderer';

describe('DrawBus', () => {
  let props;

  beforeEach(() => {
    props = {
      color: '343434',
      id: '3443',
      buses: [
      {
        lon:-122.419,
        lat: 37.775,
        id: '3434j'
      },
      {
        lon:-122.429,
        lat: 37.785,
        id: '3434j'
      },
      ],
    };
  })

  test('Matches snapshot', () => {
    const component = renderer.create(
      <DrawBus
       {...props}
      />    
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    props.color = '555555';
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
