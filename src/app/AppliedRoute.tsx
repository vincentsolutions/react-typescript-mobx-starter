import * as React from 'react';
import { Route } from 'react-router-dom';

export interface IAppliedRouteProps {
    path: string;
    Component: React.ComponentType;
    exact?: boolean;
    childProps?: object;
}

const AppliedRoute: React.FunctionComponent<IAppliedRouteProps> = (props) => {
    const { path, exact = false, Component, childProps } = props;

    return (
        <Route exact={exact} path={path} render={props => <Component {...childProps} />} />
    )
};

export default AppliedRoute;