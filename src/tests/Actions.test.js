import * as actions from '../actions/';

describe('actions', () => {
  it('should create action to remove route', () => {
    const route = 'm';
    const expectedAction = {
      type: REMOVE_ROUTE,
      route,
    }

    expect(actions.removeRoute(route)).toEqual(expectedAction);
  })
  it('should create action to add route', () => {
    const route = 'm';
    const expectedAction = {
      type: ADD_ROUTE,
      route,
    }

    expect(actions.removeRoute(route)).toEqual(expectedAction);
  })
}
