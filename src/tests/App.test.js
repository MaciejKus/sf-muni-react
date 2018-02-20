import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../store';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const StoreInstance = Store();
  // avoid real api calls
  const fetchSpy = jest.spyOn(global, 'fetch')
          .mockImplementation(() => Promise.resolve({
            status: 200,
            ok: true,
            statusText: 'ok',
            headers: {
              'Content-type': 'application/json'
            },
            json: () => {
              return {
                data: {
                  features: []
                }
              }
            }
          }));

  ReactDOM.render(
    <Provider store={StoreInstance}>
      <App />
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
