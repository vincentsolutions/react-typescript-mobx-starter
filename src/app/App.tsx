import * as React from 'react';
import './App.less';
import logo from './static/logo.svg';
import {RouteComponentProps, withRouter} from "react-router";

export interface IAppProps extends RouteComponentProps {

}

class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default withRouter(App);
