import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import { Router } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "mobx-react";
import itemStore from './app/data/stores/ItemStore';
import 'bootstrap/dist/css/bootstrap.css';
import './index.less';
import {createBrowserHistory} from "history";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
      <Provider itemStore={itemStore}>
          <App />
      </Provider>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
